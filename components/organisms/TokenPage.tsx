import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import usePanopticonUri from "../../web3/panopticon/use-panopticon-uri";
import useCreepzUri from "../../web3/creepz/use-creepz-uri";
import useRaeminiscenceUri from "../../web3/raeminiscence/use-raeminiscence-uri";
import usePresenceUri from "../../web3/presence/use-presence-uri";
import useFoundersUri from "../../web3/founders/use-founders-uri";
import Owner from "../atoms/Owner";
import CollectionBadge from "../molecules/CollectionBadge";
import TokenLinks from "../atoms/TokenLinks";
import CollectionAttributes from "../molecules/CollectionAttributes";
import TokenThumbnail from "../atoms/TokenThumbnail";
import RelatedTokens from "../molecules/RelatedTokens";
import Divider from "../atoms/Divider";
import TokenHtml from "../atoms/TokenHtml";

interface TokenPageProps {
  tokenId: bigint;
  collectionId: string;
}

// Define a type for your token data
interface TokenData {
  name?: string;
  // Add other properties that you expect from token data
}

const TokenPage: React.FC<TokenPageProps> = ({ tokenId, collectionId }) => {
  const router = useRouter();
  const [decodedData, setDecodedData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetching data hooks
  const panopticonData = usePanopticonUri(tokenId);
  const creepzData = useCreepzUri(tokenId);
  const raeminiscenceData = useRaeminiscenceUri(tokenId);
  const presenceData = usePresenceUri(tokenId);
  const foundersData = useFoundersUri(tokenId);

  const [ownerAddress, setOwnerAddress] = useState("");

  const handleAddressLoaded = (address: string) => {
    setOwnerAddress(address);
  };

  const handleAttributeClick = (traitType: string, value: string) => {
    router.push(
      `/collection/${collectionId}/?filter=${traitType}&value=${encodeURIComponent(
        value,
      )}`,
    );
  };

  useEffect(() => {
    let data;
    switch (collectionId.toLowerCase()) {
      case "panopticon":
        data = panopticonData;
        break;
      case "creepz":
        data = creepzData;
        break;
      case "raeminiscence":
        data = raeminiscenceData;
        break;
      case "presence":
        data = presenceData;
        break;
      case "founders":
        data = foundersData;
        break;
      default:
        setLoading(false);
        return;
    }

    if (data.error) {
      setLoading(false);
    } else if (!data.loading && data.tokenData) {
      setDecodedData(data.tokenData);
      setLoading(false);
    }
  }, [
    collectionId,
    panopticonData,
    creepzData,
    raeminiscenceData,
    presenceData,
    foundersData,
  ]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="flex flex-col justify-center align-middle items-center p-16 max-md:p-2 gap-4 max-md:w-full">
        <div className="flex flex-col gap-8 max-md:p-0 p-4">
          <div
            id="info"
            className="flex justify-between max-md:flex-col max-md:gap-4"
          >
            <div className="flex flex-col">
              <div className="flex items-center align-center gap-2 max-md:w-full max-md:justify-center">
                {decodedData && (decodedData as { name: string }).name && (
                  <p>{(decodedData as { name: string }).name}</p>
                )}
              </div>
              <p className="text-neutral-400/50">from</p>
              <CollectionBadge collectionId={collectionId} />
            </div>
          </div>
          <Owner
            collectionId={collectionId}
            tokenId={tokenId}
            onAddressLoaded={(address) =>
              console.log("Address loaded:", address)
            }
          />
        </div>
        <Divider />
        <div className="border border-neutral-200 rounded-xl self-center w-full">
          {collectionId.toLowerCase() === "panopticon" ? (
            <TokenHtml tokenId={tokenId} collectionId={collectionId} />
          ) : (
            <TokenThumbnail id={Number(tokenId)} collectionId={collectionId} />
          )}
        </div>
        <Divider />
        <div className="w-full flex flex-col gap-8">
          <CollectionAttributes
            collectionId={collectionId}
            tokenData={decodedData}
            onAttributeClick={(traitType: any, value: any) =>
              console.log("Attribute clicked:", traitType, value)
            }
          />
          <div className="self-center">
            <TokenLinks tokenId={tokenId} collectionId={collectionId} />
          </div>
        </div>
      </div>
      <div className="bg-neutral-200/50 p-8 max-md:p-2 rounded-xl w-full">
        <RelatedTokens collectionId={collectionId} tokenId={tokenId} />
      </div>
    </div>
  );
};

export default TokenPage;
