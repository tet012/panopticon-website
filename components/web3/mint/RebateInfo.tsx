import React from "react";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";
import { useGetUserData } from "../../../web3/dutch-auction/use-get-user-data";

const CurrentPrice = dynamic(() => import("./CurrentPrice"), {
  ssr: false,
});

const NftBuy = dynamic(() => import("./AmountNftBought"), {
  ssr: false,
});

const OldPrice = dynamic(() => import("./OldPrice"), {
  ssr: false,
});

const CurrentRebate = dynamic(() => import("./CurrentRebate"), {
  ssr: false,
});

const NFTsMintable = dynamic(() => import("./ClaimableTokens"), {
  ssr: false,
});

const RebateInfo: React.FC = () => {
  const { isConnected, address } = useAccount();
  const effectiveAddress =
    address || "0x0000000000000000000000000000000000000000";
  const userData = useGetUserData(effectiveAddress);

  if (!isConnected) {
    return null;
  }

  return (
    <div
      id="rebate-info"
      className="max-md:flex-col flex w-full justify-between gap-2"
    >
      <div className="w-full grow p-4 border bg-neutral-200/20 border-neutral-300 rounded-xl">
        <p>You have bought</p>
        <div className="font-semibold flex gap-1">
          <NftBuy /> <p>for</p> <OldPrice />
        </div>
      </div>
      <div className="w-full grow p-4 border bg-neutral-200/20 border-neutral-300 rounded-xl">
        <p>Current Price is</p>
        <div className="flex gap-2">
          <CurrentPrice />
        </div>
      </div>
      <div className="w-full grow p-4 border bg-neutral-200/20 border-neutral-300 rounded-xl">
        <p>Pending Rebate</p>
        <CurrentRebate />
      </div>
      <div className="w-full grow p-4 border bg-neutral-200/20 border-neutral-300 rounded-xl">
        <p>Buy more with rebate</p>

        <div className="flex">
          <NFTsMintable />
        </div>
      </div>
    </div>
  );
};

export default RebateInfo;
