import React, { useEffect, useState } from "react";
import useGetClaimableTokens from "../../web3/dutch-auction/use-get-claimable-token";
import useCallClaimTokens from "../../web3/dutch-auction/use-call-claim-tokens";
import useGetMerkleProof from "../../web3/merkle-tree/use-get-merkle-proof";
import { useAccount } from "wagmi";

const ClaimTokensButton = () => {
  const { address } = useAccount();
  const { proof } = useGetMerkleProof(address);
  const {
    claimableTokens,
    isErrorGetClaimableTokens,
    errorGetClaimableTokens,
  } = useGetClaimableTokens(address);

  const [amountToClaim, setAmountToClaim] = useState(0);

  const { writeClaimTokens, hashCallClaimTokens, errorMessageClaimTokens } =
    useCallClaimTokens(amountToClaim, proof);

  useEffect(() => {
    if (isErrorGetClaimableTokens) {
      console.error(errorGetClaimableTokens);
    }
    setAmountToClaim(claimableTokens);
  }, [isErrorGetClaimableTokens, errorGetClaimableTokens, claimableTokens]);

  const increment = () => {
    setAmountToClaim((prevAmount) =>
      prevAmount < claimableTokens ? prevAmount + 1 : prevAmount
    );
  };

  const decrement = () => {
    setAmountToClaim((prevAmount) =>
      prevAmount > 0 ? prevAmount - 1 : prevAmount
    );
  };

  const handleClick = async () => {
    try {
      await writeClaimTokens();
    } catch (error) {
      console.error("Error when claiming tokens:", error);
    }
  };

  return (
    <div>
      <button onClick={decrement} disabled={amountToClaim <= 0}>
        -
      </button>
      <span>{amountToClaim}</span>
      <button onClick={increment} disabled={amountToClaim >= claimableTokens}>
        +
      </button>
      <button onClick={handleClick} disabled={amountToClaim === 0}>
        Claim {amountToClaim} Tokens
      </button>
      {hashCallClaimTokens && <p>Transaction Hash: {hashCallClaimTokens}</p>}
      {errorMessageClaimTokens && <p>Error: {errorMessageClaimTokens}</p>}
    </div>
  );
};

export default ClaimTokensButton;
