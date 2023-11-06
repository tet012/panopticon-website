import React from "react";
import useCallClaimRefund from "../../web3/dutch-auction/use-call-claim-refund";

const ClaimRefundButton = () => {
  // Use the hook to get the necessary functions and state
  const { writeClaimRefund, hashCallClaimRefund, errorMessage } =
    useCallClaimRefund();

  // Handle the button click
  const handleClick = () => {
    writeClaimRefund();
  };

  return (
    <div>
      <button onClick={handleClick}>Claim Refund</button>
      {hashCallClaimRefund && <p>Transaction Hash: {hashCallClaimRefund}</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
};

export default ClaimRefundButton;
