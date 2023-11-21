import React, { useState } from "react";
import { useGetTokenUri } from "../../../web3/panopticon/use-get-token-uri";
import TokenOwnerDisplay, { NFTOwnerDetails } from "./NFTOwnerDetails";
import TokenActivity from "../TokenActivity";
import Link from "next/link";

interface TokenPageProps {
  tokenId: bigint;
}

const TokenUri: React.FC<TokenPageProps> = ({ tokenId }) => {
  const [ownerAddress, setOwnerAddress] = useState("");

  const contractAddress = "0xa1a657de1f522f15a7336942145fa3c5432dd44e";
  const openseaUrl = `https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}`;
  const onChainCheckerUrl = `https://onchainchecker.xyz/collection/ethereum/${contractAddress}/${tokenId}`;
  const etherscanUrl = `https://etherscan.io/nft/${contractAddress}/${tokenId}`;

  const handleAddressLoaded = (address: string) => {
    setOwnerAddress(address);
  };

  const { tokenData, error, loading } = useGetTokenUri(tokenId);

  if (loading) return <div>Loading...</div>;
  if (error || !tokenData) return <div>Unable to fetch token data.</div>;
  const animationHtml = decodeDataUri(tokenData.animation_url);

  return (
    <div className="flex w-full 8">
      {/* <img src={tokenData.image} alt={tokenData.name} /> */}
      <div className="w-2/3 h-full flex">
        <iframe
          srcDoc={animationHtml}
          style={{
            width: "100%",
            height: "100%",
            minHeight: "90vh",
            border: "none",
          }}
          title="Animation"
        />
      </div>

      <div className="flex flex-col self-start justify-center gap-4 min-h:full max-md:w-full p-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-7xl ">{tokenData.name}</h1>
          <Link href={`https://etherscan.io/address/${ownerAddress}`}>
            <div className="flex items-center justify-center gap-2 align-center border rounded-xl p-4">
              <p>Owned by</p>
              <NFTOwnerDetails
                tokenId={tokenId}
                onAddressLoaded={handleAddressLoaded}
              />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2 ">
          {tokenData.attributes.map(
            (
              attr: {
                trait_type:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | React.PromiseLikeOfReactNode
                  | null
                  | undefined;
                value:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | React.PromiseLikeOfReactNode
                  | null
                  | undefined;
              },
              index: React.Key | null | undefined,
            ) => (
              <div
                className="flex flex-col p-4 border border-neutral-300 hover:border-neutral-400 rounded-xl"
                key={index}
              >
                <span className="self-center attribute-name text-neutral-500">
                  {attr.trait_type}
                </span>{" "}
                <span className="self-center attribute-value">
                  {attr.value}
                </span>
              </div>
            ),
          )}
        </div>

        <div id="links" className="flex gap-2 rounded-lg align-end">
          <Link
            className="w-full flex align-center items-middle justify-center px-2 py-4 border rounded-lg hover:bg-neutral-200"
            href={openseaUrl}
          >
            <img
              src="/img/icons/opensea-logo.svg"
              width="20px"
              height="20px"
              alt="Opensea"
            ></img>
          </Link>
          <Link
            className="w-full flex align-center items-middle justify-center px-2 py-4 border rounded-lg hover:bg-neutral-200"
            href={onChainCheckerUrl}
          >
            <img
              height="20px"
              src="/img/icons/onchainchecker-logo.png"
              width="20px"
              alt="On Chain Checker"
            ></img>
          </Link>
          <Link
            className="w-full flex align-center items-middle justify-center px-2 py-4 border rounded-lg hover:bg-neutral-200"
            href={etherscanUrl}
          >
            <img
              src="/img/icons/etherscan-logo-circle-light.svg "
              width="20px"
              height="20px"
              alt="Etherscan"
            ></img>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TokenUri;

function decodeDataUri(dataUri: string): string {
  if (dataUri.startsWith("data:text/html;base64,")) {
    const base64Content = dataUri.split(",")[1];
    let decodedHtml = atob(base64Content);

    const additionalCss = `
        <style>
          body { background-color: #e5e5e5 !important; 
            display: flex;
            align-items: center;}
          html { transform: scale(0.9) !important; }
          canvas { 
            box-shadow: #bcbcbc 0px 20px 20px -20px; 
            border-radius: 16px; 

          }
        </style>
      `;

    decodedHtml = decodedHtml.replace(/<head>/, `<head>${additionalCss}`);

    return decodedHtml;
  }
  return "";
}
