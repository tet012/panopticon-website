import React, { useState, useEffect } from "react";
import { useContractRead, useEnsName, useEnsAvatar } from "wagmi";
import { panopticonAbi } from "../../web3/panopticon/panopticon-abi";
import { creepzAbi } from "../../web3/creepz/creepz-abi";
import { foundersAbi } from "../../web3/founders/foundersAbi";
import { presenceAbi } from "../../web3/presence/presenceAbi";
import { proxyAbi } from "../../web3/raeminiscence/proxyAbi";

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
  let contractAddress;
  let abi;
  switch (collectionId) {
    case "panopticon":
      contractAddress = process.env.NEXT_PUBLIC_PANOPTICON_CONTRACT_ADDRESS;
      abi = panopticonAbi;
      break;
    case "creepz":
      contractAddress = process.env.NEXT_PUBLIC_THE_CREEPZ_CONTRACT_ADDRESS;
      abi = creepzAbi;
      break;
    case "founders":
      contractAddress = process.env.NEXT_PUBLIC_FOUNDERS_CONTRACT_ADDRESS;
      abi = foundersAbi;
      break;
    case "raeminiscence":
      contractAddress = process.env.NEXT_PUBLIC_RAEMINISCENCE_CONTRACT_ADDRESS;
      abi = proxyAbi;
      break;
    case "presence":
      contractAddress = process.env.NEXT_PUBLIC_PRESENCE_CONTRACT_ADDRESS;
      abi = presenceAbi;
      break;
    default:
      throw new Error("Invalid collection ID");
  }

  const { data: owner } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: abi as readonly any[],
    functionName: "ownerOf",
    args: [tokenId.toString()],
  });

  const [ownerAddress, setOwnerAddress] = useState<string | undefined>();
  const ethereumAddress = owner as unknown as `0x${string}`;

  const { data: ensName } = useEnsName({ address: ethereumAddress });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName ?? undefined });

  useEffect(() => {
    if (owner) {
      setOwnerAddress(owner[0]); // Fix: Access the first element of the 'owner' array
      if (onAddressLoaded) {
        onAddressLoaded(owner[0]); // Fix: Access the first element of the 'owner' array
      }
    }
  }, [owner, onAddressLoaded]);

  const truncateAddress = (address: string) =>
    `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

  return (
    <div className="flex align-center max-md:justify-between justify-center gap-2 items-center max-md:w-full ">
      <p className="text-neutral-400 ">Owned by</p>
      {ownerAddress ? (
        <Link
          className="group flex h-full gap-2 items-center justify-center align-center group px-1 transition hover:shadow-lg border border-neutral-400 hover:border hover:border-neutral-900 rounded-xl pr-2 hover:bg-neutral-900 hover:text-neutral-50"
          href={`https://etherscan.io/address/${ownerAddress}`}
          passHref
        >
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
        </Link>
      ) : (
        <p>Loading owner details...</p>
      )}
    </div>
  );
};

export default Owner;
