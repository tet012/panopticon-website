import React, { useEffect, useState } from "react";
import useGetClaimableTokens from "../../web3/dutch-auction/use-get-claimable-token";
import useCallClaimTokens from "../../web3/dutch-auction/use-call-claim-tokens";
import { useAccount } from "wagmi";

const ClaimTokensButton = ({ merkleProof }) => {
  const { address } = useAccount();
  const {
    claimableTokens,
    isErrorGetClaimableTokens,
    errorGetClaimableTokens,
  } = useGetClaimableTokens(address);
  const [amountToClaim, setAmountToClaim] = useState(0);

  // Check if merkleProof is empty or not provided, and set it to an empty array if so
  const validMerkleProof =
    merkleProof && merkleProof.length > 0 ? merkleProof : [];

  const { writeClaimTokens, hashCallClaimTokens, errorMessageClaimTokens } =
    useCallClaimTokens(amountToClaim, validMerkleProof);

  useEffect(() => {
    if (isErrorGetClaimableTokens) {
      console.error(errorGetClaimableTokens);
    }
    // Initialize the amount to claim with the number of claimable tokens
    setAmountToClaim(claimableTokens);
  }, [isErrorGetClaimableTokens, errorGetClaimableTokens, claimableTokens]);

  // Handle incrementing the claim amount
  const increment = () => {
    if (amountToClaim < claimableTokens) {
      setAmountToClaim(amountToClaim + 1);
    }
  };

  // Handle decrementing the claim amount
  const decrement = () => {
    if (amountToClaim > 0) {
      setAmountToClaim(amountToClaim - 1);
    }
  };

  // Handle the button click
  const handleClick = () => {
    writeClaimTokens();
  };

  return (
    <div>
      <button onClick={decrement}>-</button>
      <button onClick={handleClick}>Claim {amountToClaim} Tokens</button>
      <button onClick={increment}>+</button>
      {hashCallClaimTokens && <p>Transaction Hash: {hashCallClaimTokens}</p>}
      {errorMessageClaimTokens && <p>Error: {errorMessageClaimTokens}</p>}
    </div>
  );
};

export default ClaimTokensButton;
