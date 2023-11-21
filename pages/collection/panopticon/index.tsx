import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import NavBar from "../../../components/NavBar";
import TokenGallery from "../../../components/organisms/Collection";

const Token: NextPage = () => {
  const router = useRouter();

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
      <NavBar />
      <div className="min-h-screen">
        <TokenGallery />
      </div>
    </div>
  );
};

export default Token;
