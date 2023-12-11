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
import NavBar from "./NavBar";
import Footer from "./Footer";

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
    collectionId,
  );

  return (
    <div className="max-md:p-2 p-4 flex flex-col gap-2">
      <div
        id="cont"
        className="bg-neutral-50 max-md:min-h-fit flex flex-col max-md:p-0 align-center gap-2"
      >
        <NavBar />
        <div
          id="img"
          className="flex border items-center justify-center align-center grow w-full rounded-2xl self-center overflow-hidden bg-neutral-200 max-md:p-2 py-32"
        >
          {collectionId.toLowerCase() === "panopticon" ? (
            <TokenHtml tokenId={tokenId} collectionId={collectionId} />
          ) : (
            <TokenThumbnail id={Number(tokenId)} collectionId={collectionId} />
          )}
        </div>
        <div
          id="info"
          className="flex w-full gap-2 justify-stretch max-md:flex-col "
        >
          <div className="flex grow bg-neutral-200 rounded-xl items-center gap-2 p-2 pl-4 max-md:justify-between">
            <TokenName tokenId={Number(tokenId)} collectionId={collectionId} />
            <p className="text-neutral-400">from</p>
            <CollectionBadge collectionId={collectionId} />
          </div>

          <div className="flex bg-neutral-200 rounded-xl items-center gap-2 p-2">
            <Owner collectionId={collectionId} tokenId={tokenId} />
          </div>

          <div className="flex bg-neutral-200 rounded-xl items-center gap-2 p-2 max-md:justify-end">
            <TokenLinks tokenId={tokenId} collectionId={collectionId} />
          </div>
        </div>
      </div>
      {shouldDisplayAttributes && (
        <div className="bg-neutral-200 p-4 max-md:p-2 rounded-xl">
          <TokenAttributes
            collectionId={collectionId}
            tokenId={Number(tokenId)}
            onAttributeClick={handleAttributeClick}
          />
        </div>
      )}
      <div className="rounded-xl">
        <div className="shadow-xl bg-gradient-to-t from-neutral-100 to-neutral-200 p-4 max-md:p-2 rounded-xl ">
          <RelatedTokens collectionId={collectionId} tokenId={tokenId} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TokenPage;
