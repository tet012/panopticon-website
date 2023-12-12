import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import Link from "next/link";
import CollectionCard from "../../components/molecules/CollectionCard";
import RandomGallery from "../../components/organisms/RandomGallery";
import Divider from "../../components/atoms/Divider";

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
      <div className="flex flex-col gap-2 max-w-7xl m-auto">
        <div className="flex flex-col gap-4 bg-neutral-100 w-full p-4 rounded-lg">
          <div className="flex flex-col gap-1 font-sans">
            <p>
              Some of my work from 2021 to nowadays, all published on the
              Ethereum blockchain.
            </p>
            <p>
              Exploring various themes with recurring colors and obviously,
              <span className="ml-1 font-semibold ">
                <Link href="https://www.youtube.com/watch?v=M62sZC7ozPY">
                  the eyes chico.
                </Link>
              </span>
            </p>
          </div>
        </div>

        <div className="bg-neutral-100 p-4 rounded-lg flex flex-col gap-2">
          <p>This is a random selection of pieces.</p>
          <RandomGallery columnCount={4} />
        </div>
        <div className="bg-neutral-100 p-4 rounded-lg flex flex-col gap-2">
          <CollectionCard collectionId={"panopticon"} />
          <CollectionCard collectionId={"raeminiscence"} />
          <CollectionCard collectionId={"presence"} />
          <CollectionCard collectionId={"creepz"} />
          <CollectionCard collectionId={"founders"} />
        </div>
      </div>
    </div>
  );
};

export default Token;
