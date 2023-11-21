import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { abi } from "../contract-abi";

const NavBar = () => {
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
    <div id="header" className="z-20 flex items-center justify-between p-4">
      <div className="align-center flex items-center justify-center gap-4">
        <Link href="/">
          <h4 style={{ fontWeight: 400, letterSpacing: 1.2 }}>teto</h4>
        </Link>

        <div className="flex gap-4 border-l border-neutral-500 pl-4">
          <p>Collections</p>
          <p>Blog</p>
        </div>
      </div>

      <div className="align-center flex items-center justify-center gap-16">
        {process.env.NEXT_PUBLIC_STARTED === "true" && (
          <ConnectButton accountStatus="avatar" showBalance={false} />
        )}
      </div>
    </div>
  );
};

export default NavBar;
