import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import NavBar from "../../../components/organisms/NavBar";
import Footer from "../../../components/organisms/Footer";
import TokenPage from "../../../components/organisms/TokenPage";

const Token: NextPage = () => {
  const router = useRouter();
  const { tokenId, collectionId } = router.query;

  let tokenIdBigInt;
  if (typeof tokenId === "string" && /^\d+$/.test(tokenId)) {
    tokenIdBigInt = BigInt(tokenId);
  }

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const formattedTitle = collectionId
    ? toTitleCase((collectionId as string).replace(/-/g, " "))
    : "";

  return (
    <div>
      <Head>
        <title className="capitalize">
          Teto - {formattedTitle} #{tokenId}
        </title>
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

      <div id="body" className="flex w-full flex-col bg-neutral-50 ">
        <div id="tokeninfo" className="">
          {tokenIdBigInt !== undefined && (
            <TokenPage
              tokenId={tokenIdBigInt}
              collectionId={collectionId as string}
            />
          )}
        </div>
        {/* <div className="w-full">
          <Footer />
        </div> */}
      </div>
    </div>
  );
};

export default Token;
