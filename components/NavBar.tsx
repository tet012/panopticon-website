import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { abi } from "../contract-abi";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

const contractConfig = {
  address: "0x00edbf449d5bf37fb1ea0bfdb1dbee29b9a1aa8a",
  abi,
} as const;

const NavBar = () => {
  const [totalMinted, setTotalMinted] = useState(0);
  const { isConnected } = useAccount();
  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "testMint",
  });
  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractWriteConfig);
  const router = useRouter();
  const isMintPage = router.pathname === "/mint";

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // Or you can return a placeholder/shimmer for the navbar until it's ready
  }

  return (
    <div id="header" className="justify-between items-center flex z-20 mt-8">
      <Link href="/">
        <h4 style={{ fontWeight: 400, letterSpacing: 1.2 }}>Teto</h4>
      </Link>
      <div className="flex gap-4">
        {!isMintPage && (
          <Link href="/mint">
            {/* <button className="border rounded-md border-neutral-300 px-4 h-full bg-neutral-200 ">
            Go to mint page
          </button> */}
          </Link>
        )}
        <ConnectButton showBalance={false} />

        {/* {isMintPage && isConnected && (
          <button
            disabled={!mint || isMintLoading || isMintStarted}
            className="button"
            data-mint-loading={isMintLoading}
            data-mint-started={isMintStarted}
            onClick={() => mint?.()}
          >
            {isMintLoading && "Waiting for approval"}
            {isMintStarted && "Minting..."}
            {!isMintLoading && !isMintStarted && "Mint"}
          </button>
        )} */}
      </div>
    </div>
  );
};

export default NavBar;
