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
    <div id="header" className="justify-between items-center flex z-20 mt-8">
      <Link href="/">
        <h4 style={{ fontWeight: 400, letterSpacing: 1.2 }}>teto</h4>
      </Link>

      <div className="flex gap-4">
        {process.env.NEXT_PUBLIC_STARTED === "true" && (
          <ConnectButton showBalance={false} />
        )}
      </div>
    </div>
  );
};

export default NavBar;
