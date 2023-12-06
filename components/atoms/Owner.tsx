import React, { useState } from "react";
import { useContractRead, useEnsName, useEnsAvatar } from "wagmi";
import { panopticonAbi } from "../../web3/panopticon/panopticon-abi";
import { creepzAbi } from "../../web3/creepz/creepz-abi";
import Link from "next/link";

interface OwnerProps {
  tokenId: bigint;
  collectionId: string;
  onAddressLoaded?: (address: string) => void;
}

export const Owner: React.FC<OwnerProps> = ({
  tokenId,
  collectionId,
  onAddressLoaded,
}) => {
  const contractAddress =
    collectionId === "panopticon"
      ? process.env.NEXT_PUBLIC_PANOPTICON_CONTRACT_ADDRESS
      : process.env.NEXT_PUBLIC_THE_CREEPZ_CONTRACT_ADDRESS; // Assuming you have this environment variable
  const { owner } = useGetOwnerOf(
    tokenId,
    contractAddress as `0x${string}`,
    collectionId,
  );

  const [ownerAddress, setOwnerAddress] = useState<string | undefined>();
  const ethereumAddress = owner as `0x${string}`;

  const { data: ensName } = useEnsName({ address: ethereumAddress });

  // Always call useEnsAvatar, but pass undefined if ensName is not available
  const { data: ensAvatar } = useEnsAvatar({ name: ensName ?? undefined });

  React.useEffect(() => {
    if (owner) {
      setOwnerAddress(owner);
      if (onAddressLoaded) {
        onAddressLoaded(owner);
      }
    }
  }, [owner, onAddressLoaded]);

  const truncateAddress = (address: string) => `${address.substring(0, 6)}...`;

  return (
    <div className="flex align-center justify-center gap-2 items-center max-md:w-full ">
      <p className="text-neutral-400/50 ">Owned by</p>
      <Link
        className="group flex items-center justify-between gap-4 align-center w-fit self-center border border-neutral-200 hover:border hover:border-neutral-900 transition rounded-xl pr-1"
        href={`https://etherscan.io/address/${ownerAddress}`}
        passHref
      >
        {ownerAddress ? (
          <div className="flex gap-1 rounded-xl p-1 cursor-pointer transition align-center items-center">
            {ensAvatar ? (
              <img
                src={ensAvatar}
                alt="ENS Avatar"
                style={{ width: "16px", height: "16px", borderRadius: "50%" }}
              />
            ) : (
              <div className="placeholder-avatar shadow-lg" />
            )}
            <p className="transition tracking-wider text-neutral-500">
              {ensName || truncateAddress(ownerAddress)}
            </p>
          </div>
        ) : (
          <p>Loading owner details...</p>
        )}
      </Link>
    </div>
  );
};

const useGetOwnerOf = (
  tokenId: bigint,
  contractAddress: `0x${string}`,
  collectionId: string,
) => {
  const abi = collectionId === "panopticon" ? panopticonAbi : creepzAbi; // Use the correct ABI based on collectionId

  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: abi as any, // Change the type to unknown[]
    functionName: "ownerOf",
    args: [tokenId],
  });

  return {
    owner: data as string | undefined,
    error: isError,
    loading: isLoading,
  };
};

export default Owner;
