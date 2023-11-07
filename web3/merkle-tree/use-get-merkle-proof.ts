import { useEffect, useState } from "react";
import { getProof } from "./createMerkletree";

const emptyMerkleProof: `0x${string}`[] = [
  "0x0000000000000000000000000000000000000000000000000000000000000000",
];

const useGetMerkleProof = (address: `0x${string}`) => {
  const [proof, setProof] = useState<`0x${string}`[]>(emptyMerkleProof);

  useEffect(() => {
    const checkProof = getProof(address);

    // Ensure that checkProof is always an array before calling setProof
    if (Array.isArray(checkProof)) {
      setProof(checkProof);
    } else {
      // If checkProof is not an array (e.g., a string), wrap it in an array
      // Assuming here that "0x0fig" is a typo or incorrect value
      // If "0x0fig" is a valid proof, replace `[]` with `["0x0fig"]`
      setProof([]);
    }
  }, [address]);

  return { proof };
};

export default useGetMerkleProof;
