import React, { useState } from "react";
import { useContractRead, useEnsName, useEnsAvatar } from "wagmi";
import { abi } from "../../../web3/panopticon/panopticon-abi";

interface NFTOwnerDetailsProps {
  tokenId: bigint;
  onAddressLoaded?: (address: string) => void;
}

export const NFTOwnerDetails: React.FC<NFTOwnerDetailsProps> = ({
  tokenId,
  onAddressLoaded,
}) => {
  const [ownerAddress, setOwnerAddress] = useState<string | undefined>();

  const { owner } = useGetOwnerOf(tokenId);
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
    <div>
      {ownerAddress ? (
        <div className="flex gap-1 bg-neutral-200/50 rounded-full p-1 pr-2 ">
          {ensAvatar ? (
            <img
              src={ensAvatar}
              alt="ENS Avatar"
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                boxShadow: "#F4AAB9 0px 0px 16px",
              }}
            />
          ) : (
            <div className="placeholder-avatar shadow-lg" />
          )}
          <p className="transition tracking-wider">
            {ensName || truncateAddress(ownerAddress)}
          </p>
        </div>
      ) : (
        <p>Loading owner details...</p>
      )}
    </div>
  );
};

const useGetOwnerOf = (tokenId: bigint) => {
  const { data, isError, isLoading } = useContractRead({
    address: process.env
      .NEXT_PUBLIC_PANOPTICON_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "ownerOf",
    args: [tokenId],
  });

  return {
    owner: data as string | undefined,
    error: isError,
    loading: isLoading,
  };
};

export default NFTOwnerDetails;
