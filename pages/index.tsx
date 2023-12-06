import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";

import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";

const Home: NextPage = () => {
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
      <div>Hi, my name is teto.</div>
      <Footer />
    </div>
  );
};

export default Home;
