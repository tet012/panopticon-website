import { useEffect, useState } from "react";
import { getProof } from "./createMerkletree";

const emptyMerkleProof: `0x${string}`[] = [
  "0x0000000000000000000000000000000000000000000000000000000000000000",
];

const useGetMerkleProof = (address: `0x${string}`) => {
  const [proof, setProof] = useState<`0x${string}`[]>(emptyMerkleProof);

  useEffect(() => {
    getProof(address)
      .then(({ hasDiscount, message, proof }) => {
        if (Array.isArray(proof)) {
          setProof(proof);
        } else {
          setProof([]);
        }
      })
      .catch(err => {
        console.error('error: ', err);
      });
  }, [address]);

  return { proof };
};

export default useGetMerkleProof;
