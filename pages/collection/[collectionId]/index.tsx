import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import NavBar from "../../../components/organisms/NavBar";
import CollectionView from "../../../components/organisms/CollectionView";

const Token: NextPage = () => {
  const router = useRouter();
  const { collectionId } = router.query;

  const formattedTitle = collectionId
    ? toTitleCase((collectionId as string).replace(/-/g, " "))
    : "";

  return (
    <div>
      <Head>
        <title>Teto - {formattedTitle}</title>
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
      <div className="min-h-screen ">
        <CollectionView collectionId={collectionId as string} />
      </div>
    </div>
  );
};

export default Token;

const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
