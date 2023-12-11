import React, { useState } from "react";
import { useContractRead, useEnsName, useEnsAvatar } from "wagmi";
import { panopticonAbi } from "../../web3/panopticon/panopticon-abi";
import { creepzAbi } from "../../web3/creepz/creepz-abi";
import { foundersAbi } from "../../web3/founders/foundersAbi";
import { raeminiscenceAbi } from "../../web3/raeminiscence/abi";
import { presenceAbi } from "../../web3/presence/presenceAbi";

import Link from "next/link";
import Image from "next/image";

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
    <div className="flex align-center max-md:justify-between justify-center gap-2 items-center max-md:w-full ">
      <p className="text-neutral-400 ">Owned by</p>
      <Link
        className="group flex h-full gap-2 items-center justify-center align-center group px-1 transition hover:shadow-lg border border-neutral-400 hover:border hover:border-neutral-900 rounded-xl pr-2 hover:bg-neutral-900 hover:text-neutral-50"
        href={`https://etherscan.io/address/${ownerAddress}`}
        passHref
      >
        {ownerAddress ? (
          <div className="flex gap-1 rounded-xl p-1 cursor-pointer transition align-center items-center">
            {ensAvatar ? (
              <Image
                src={ensAvatar}
                alt="ENS Avatar"
                width={16}
                height={16}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <div className="placeholder-avatar shadow-lg" />
            )}
            <p className="transition tracking-wider text-neutral-500 group-hover:text-neutral-50">
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
  let abi;
  switch (collectionId) {
    case "panopticon":
      abi = panopticonAbi;
      break;
    case "creepz":
      abi = creepzAbi;
      break;
    case "founders":
      abi = foundersAbi;
      break;
    case "raeminiscence":
      abi = raeminiscenceAbi;
      break;
    case "presence":
      abi = presenceAbi;
      break;
    default:
      throw new Error("Invalid collection ID");
  }
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
