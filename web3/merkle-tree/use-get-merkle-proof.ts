import { useEffect, useState } from "react";
import { getProof } from "./createMerkletree";

const emptyMerkleProof: `0x${string}`[] = [
  "0x0000000000000000000000000000000000000000000000000000000000000000",
];

const useGetMerkleProof = (addrress: `0x${string}`) => {
  const [proof, setProof] = useState<`0x${string}`[]>(emptyMerkleProof);

  useEffect(() => {
    const checkProof = getProof(addrress);

    if (checkProof) {
      setProof(checkProof);
    } else {
      setProof(emptyMerkleProof);
    }
  }, [addrress]);

  return { proof };
};

export default useGetMerkleProof;
