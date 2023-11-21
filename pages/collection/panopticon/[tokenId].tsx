import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import TokenUriDisplay from "../../../components/web3/panopticon/TokenUriDisplay";
import DataComp from "../../../components/DataComp";
import TokenGallery from "../../../components/TokenGallery";

const Token: NextPage = () => {
  const router = useRouter();
  const { tokenId } = router.query;

  let tokenIdBigInt;
  if (typeof tokenId === "string" && /^\d+$/.test(tokenId)) {
    tokenIdBigInt = BigInt(tokenId);
  }

  return (
    <div>
      <Head>
        <title>Panopticon by Teto</title>
        <meta
          name="description"
          content="A generative art collection exploring our relationship with tehcnology."
        />
        <meta property="og:title" content="Panopticon by Teto" />
        <meta
          property="og:description"
          content="A generative art collection exploring our relationship with tehcnology."
        />
        <meta property="og:image" content="/img/web-img.jpg" />
      </Head>

      <div
        id="body"
        className="flex min-h-screen w-full flex-col bg-neutral-50"
      >
        <div className="w-full px-4">
          <NavBar />
        </div>

        <div id="tokeninfo" className="flex">
          <TokenUriDisplay tokenId={tokenIdBigInt} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Token;
