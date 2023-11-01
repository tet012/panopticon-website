import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const Footer = () => (
  <div className="wrapper flex mt-32 p-8 w-full items-center space-around justify-between mb-4 max-md:flex-col max-md:gap-4">
      <div id="siteMap" className="flex gap-2">
        <Link href="https://twitter.com/tetonotsorry">Twitter</Link>
        <Link href="https://instagram.com/tetonotsorry">Instagram</Link>
      </div>
      <button className="button h-fit">Mint Panopticon</button>
  </div>
);

export default Footer;
