import React from "react";
import useTokenData from "../../web3/use-token-data";

interface TokenNameProps {
  tokenId: bigint;
  collectionId: string;
}

const TokenName: React.FC<TokenNameProps> = ({ tokenId, collectionId }) => {
  const tokenData = useTokenData(tokenId, collectionId);

  return (
    <h1 className="text-7xl max-md:text-6xl max-md:block hidden text-center pb-8">
      {tokenData ? (tokenData as any).name : "Loading..."}
    </h1>
  );
};

export default TokenName;
