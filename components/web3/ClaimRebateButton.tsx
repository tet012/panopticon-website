import React from "react";
import useCallClaimRefund from "../../web3/dutch-auction/use-call-claim-refund";
import dynamic from "next/dynamic";

const ClaimRebateButton = () => {
  // Use the hook to get the necessary functions and state
  const { writeClaimRefund, hashCallClaimRefund, errorMessage } =
    useCallClaimRefund();

  // Handle the button click
  const handleClick = () => {
    writeClaimRefund();
  };

  const CurrentRebate = dynamic(() => import("./CurrentRebate"), {
    ssr: true,
  });

  return (
    <div className="flex gap-2 w-full h-auto p-2 overflow-hidden bg-gradient-to-r from-red-400 to-violet-500 animate-gradient-xy rounded-2xl">
      <button
        className="hover:transition hover:ease-in w-full flex justify-center align-center gap-2 rounded-xl p-4 mint_button bg-neutral-800 whiteShadow drop-shadow-lg  text-neutral-100"
        onClick={handleClick}
      >
        Claim Rebate <CurrentRebate />
        (after auction ends)
      </button>
    </div>
  );
};

export default ClaimRebateButton;
