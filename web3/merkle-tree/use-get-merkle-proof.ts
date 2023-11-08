import { useEffect, useState } from "react";
import { getProof } from "./createMerkletree";

const emptyMerkleProof: `0x${string}`[] = [
  "0x0000000000000000000000000000000000000000000000000000000000000000",
];

const useGetMerkleProof = (address: `0x${string}`) => {
  const [proof, setProof] = useState<`0x${string}`[]>(emptyMerkleProof);

  useEffect(() => {
    const checkProof = getProof(address);

    if (Array.isArray(checkProof)) {
      setProof(checkProof);
    } else {
      setProof([]);
    }
  }, [address]);

  return { proof };
};

export default useGetMerkleProof;
