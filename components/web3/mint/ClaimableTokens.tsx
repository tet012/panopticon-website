import React from "react";
import useGetClaimableTokens from "../../../web3/dutch-auction/use-get-claimable-token";
import { useAccount } from "wagmi";

const NFTsMintable = () => {
  const { address } = useAccount();
  const effectiveAddress =
    address || "0x0000000000000000000000000000000000000000";
  const {
    claimableTokens,
    isErrorGetClaimableTokens,
    errorGetClaimableTokens,
  } = useGetClaimableTokens(effectiveAddress);

  return (
    <div>
      <p className="font-semibold">
        {!isErrorGetClaimableTokens && <>Up to {claimableTokens} NFTs</>}
        {isErrorGetClaimableTokens && (
          <>Error: {String(errorGetClaimableTokens)}</>
        )}
      </p>
    </div>
  );
};

export default NFTsMintable;
