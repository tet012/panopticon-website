import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import NavBar from "../../components/organisms/NavBar";
import Footer from "../../components/organisms/Footer";
import CollectionCard from "../../components/molecules/CollectionCard";

const Token: NextPage = () => {
  const router = useRouter();
  const { collectionId } = router.query;

  return (
    <div>
      <Head>
        <title>{collectionId}</title>
        <meta
          name="description"
          content="A generative art collection exploring our relationship with technology."
        />
        <meta property="og:title" content="Panopticon by Teto" />
        <meta
          property="og:description"
          content="A generative art collection exploring our relationship with technology."
        />
        <meta property="og:image" content="/img/web-img.jpg" />
      </Head>
      <NavBar />
      <div className="flex flex-col p-4 gap-8 max-w-5xl align-center items-center justify-center m-auto">
        <CollectionCard collectionId={"panopticon"} />
        <CollectionCard collectionId={"raeminiscence"} />
        <CollectionCard collectionId={"presence"} />
        <CollectionCard collectionId={"creepz"} />
        <CollectionCard collectionId={"founders"} />
      </div>

      <Footer />
    </div>
  );
};

export default Token;
