import React from "react";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";

const CurrentPrice = dynamic(() => import("./CurrentPrice"), {
  ssr: false,
});

const NftBuy = dynamic(() => import("./NftBuy"), {
  ssr: false,
});

const OldPrice = dynamic(() => import("./OldPrice"), {
  ssr: false,
});

const CurrentRebate = dynamic(
  () => import("./CurrentRebate"),
  {
    ssr: false,
  }
);

const NFTsMintable = dynamic(() => import("./NFTsMintable"), {
  ssr: false,
});


const RebateInfo: React.FC = () => {
  const { isConnected } = useAccount();

  if(!isConnected) {
    return null;
  }

  return (
    <div
      id="rebate-info"
      className="wrapper max-md:flex-col flex w-full justify-between gap-2"
    >
      <div className="w-full grow p-4 border bg-neutral-200/20 border-neutral-300 rounded-xl hover:shadow-lg">
        <p>You have bought</p>
        <div className="font-semibold flex gap-2">
          <NftBuy /> <p>for</p> <OldPrice />
        </div>
      </div>
      <div className="w-full grow p-4 border bg-neutral-200/20 border-neutral-300 rounded-xl hover:shadow-lg">
        <p>Current Price is</p>
        <div className="flex gap-2">
          <CurrentPrice />
        </div>
      </div>
      <div className="w-full grow p-4 border bg-neutral-200/20 border-neutral-300 rounded-xl hover:shadow-lg">
        <p>Pending Rebate</p>
        <CurrentRebate />
      </div>
      <div className="w-full grow p-4 border bg-neutral-200/20 border-neutral-300 rounded-xl hover:shadow-lg">
        <p>Buy more with rebate</p>

        <div className="flex">
          <NFTsMintable />
        </div>
      </div>
    </div>
  );
};

export default RebateInfo;
