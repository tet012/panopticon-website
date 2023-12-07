import React from "react";
import { useRouter } from "next/router";
import Owner from "../atoms/Owner";
import CollectionBadge from "../molecules/CollectionBadge";
import TokenLinks from "../atoms/token/TokenLinks";
import TokenAttributes from "../atoms/token/TokenAttributes";
import TokenThumbnail from "../atoms/token/TokenThumbnail";
import RelatedTokens from "../molecules/RelatedTokens";
import TokenHtml from "../atoms/token/TokenHtml";
import useTokenData from "../../web3/use-token-data2";
import Divider from "../atoms/Divider";
import TokenName from "../atoms/token/TokenName";

interface TokenPageProps {
  tokenId: bigint;
  collectionId: string;
}

const TokenPage: React.FC<TokenPageProps> = ({ tokenId, collectionId }) => {
  const router = useRouter();

  const safeTokenId =
    tokenId <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(tokenId) : 0;

  const {
    tokenData: decodedData,
    loading,
    error,
  } = useTokenData(safeTokenId, collectionId);

  const handleAttributeClick = (traitType: string, value: string) => {
    router.push(
      `/collection/${collectionId}/?filter=${traitType}&value=${encodeURIComponent(
        value,
      )}`,
    );
  };

  const shouldDisplayAttributes = ["panopticon", "creepz"].includes(
    collectionId.toLowerCase(),
  );

  return (
    <div>
      <div className="flex flex-col justify-center align-center self-center items-center p-16 max-md:p-2 gap-4 max-md:w-full ">
        <div className="max-w-4xl flex flex-col gap-2 max-md:p-0 p-4 align-center justify-center gap-8 items-center">
          <div
            id="info"
            className="flex w-full gap-2 justify-between max-md:flex-col max-md:gap-4 "
          >
            <div className="flex justify-center items-center align-center gap-2 ">
              <div className="flex items-center  align-center gap-2 max-md:w-full max-md:justify-center">
                <TokenName
                  tokenId={Number(tokenId)}
                  collectionId={collectionId}
                />
              </div>
              <p className="text-neutral-400/50">from</p>
              <CollectionBadge collectionId={collectionId} />
            </div>
            <Owner collectionId={collectionId} tokenId={tokenId} />
          </div>

          <Divider />

          <div className="border border-neutral-200 rounded-xl self-center w-fit overflow-hidden">
            {collectionId.toLowerCase() === "panopticon" ? (
              <TokenHtml tokenId={tokenId} collectionId={collectionId} />
            ) : (
              <TokenThumbnail
                id={Number(tokenId)}
                collectionId={collectionId}
              />
            )}
          </div>

          <Divider />

          <div className="w-full max-w-2xl flex flex-col gap-8">
            {shouldDisplayAttributes && (
              <TokenAttributes
                collectionId={collectionId}
                tokenId={Number(tokenId)}
                onAttributeClick={handleAttributeClick}
              />
            )}
            <div className="self-center">
              <TokenLinks tokenId={tokenId} collectionId={collectionId} />
            </div>
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
