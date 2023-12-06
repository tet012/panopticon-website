import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { panopticonAbi } from "../web3/panopticon/panopticon-abi";
import { motion } from "framer-motion";
import Head from "next/head";

import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";
import TextSection from "../components/TextSection";
import JumboTxt from "../components/JumboTxt";
import ImageGrid from "../components/ImageGrid";
import SingleImage from "../components/SingleImage";
import { generateEtherscanLinkForAddress } from "../utils/etherscan";

const MintingUI = dynamic(() => import("../components/web3/mint/MintingUI"), {
  ssr: false,
});

const RebateInfo = dynamic(() => import("../components/web3/mint/RebateInfo"), {
  ssr: false,
});

import {
  fadeInSmooth,
  AnimContDyna,
  fadeInLinear,
} from "../components/animations";

const contractConfig = {
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
  panopticonAbi,
} as const;

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Panopticon by Teto</title>
        <meta
          name="description"
          content="A generative art collection exploring our relationship with technology."
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
        className="flex flex-col w-full min-h-screen bg-neutral-50"
      >
        <div
          id="hero"
          className="flex flex-col self-center w-full bg-neutral-50 max-w-7xl"
        >
          <NavBar />
          <div
            id="mainCont"
            className="flex flex-col items-center self-center gap-8 max-md:w-full bg-neutral-50"
          >
            <JumboTxt />
            <motion.div
              variants={AnimContDyna}
              initial="hidden"
              animate="show"
              className="flex gap-2 max-md:flex-col w-full justify-center"
            >
              <motion.img
                variants={fadeInSmooth}
                className="shadow-2xl self-center bg-red-300 w-1/2"
                src="img/panopticon/1.jpg"
                height="100%"
              ></motion.img>
            </motion.div>

            <div id="contract" className="flex flex-col w-full gap-2 wrapper">
              <motion.div
                className="flex justify-between w-full gap-2 space-between max-md:flex-col"
                variants={AnimContDyna}
                initial="hidden"
                animate="show"
              >
                <Link
                  href={generateEtherscanLinkForAddress(
                    process.env.NEXT_PUBLIC_PANOPTICON_CONTRACT_ADDRESS,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col justify-between w-full p-4 border grow space-between bg-neutral-200/20 border-neutral-300 rounded-xl hover:border-neutral-400 hover:bg-blue-100 hover:shadow-lg hover:transition hover:ease-in"
                >
                  <motion.div variants={fadeInSmooth}>
                    <motion.p variants={fadeInSmooth}>NFT Contract</motion.p>
                    <motion.pre className="truncate" variants={fadeInSmooth}>
                      {process.env.NEXT_PUBLIC_PANOPTICON_CONTRACT_ADDRESS}
                    </motion.pre>
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            <div className="wrapper w-full flex flex-col gap-[15ch]">
              <motion.div
                variants={AnimContDyna}
                initial="hidden"
                animate="show"
              >
                <motion.p
                  variants={fadeInSmooth}
                  className="p-8 mt-16 font-serif text-2xl italic text-center rounded bg-neutral-300/30"
                >
                  &quot;Innovation has become the blood of our society and
                  virtuality is our new reality.&quot;
                </motion.p>
              </motion.div>

              <div
                id="arg1"
                className="flex justify-between gap-32 max-md:gap-4 max-md:flex-col"
              >
                <motion.div
                  variants={AnimContDyna}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col w-full gap-8 max-md:w-auto"
                >
                  <TextSection
                    title="Origin"
                    text={
                      "Started in 2022, Panopticon is Teto's genesis long form collection, a digital artist with over a decade of experience as an art director for the music industry and a web developer. After numerous collections exploring the recurring theme of perception in the digital age, Teto delved deeper into the human-screen relationship with this collection."
                    }
                    textVariants={fadeInLinear}
                  />
                </motion.div>

                <motion.div
                  variants={AnimContDyna}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col w-full gap-8 max-md:w-auto"
                >
                  <ImageGrid
                    images={[
                      "img/panopticon/4.jpg",
                      "img/panopticon/5.jpg",
                      "img/panopticon/6.jpg",
                      "img/panopticon/7.jpg",
                    ]}
                    imgVariants={fadeInLinear}
                  />
                </motion.div>
              </div>

              <div
                id="arg2"
                className="flex justify-between gap-32 max-md:gap-4 max-md:flex-col max-md:flex-col-reverse"
              >
                <motion.div
                  variants={AnimContDyna}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col w-full gap-8 max-md:w-auto"
                >
                  <SingleImage
                    src="img/panopticon/8.jpg"
                    imgVariants={fadeInLinear}
                  />
                </motion.div>

                <motion.div
                  variants={AnimContDyna}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col w-full gap-8 max-md:w-auto"
                >
                  <TextSection
                    title="Inspiration"
                    text={
                      "Drawing inspiration from science fiction luminaries like Ray Bradbury, Alain Damasio, George Orwell, Aldous Huxley, and Isaac Asimov, Panopticon reflects the genre's core concepts: technology will deeply transform humanity and the way humans behave with each others. Virtuality will overshadow the real world and people will mostly interact with avatars or robots. Innovation - if not mastered - will create even more social fracture instead of bringing people together. Visually the collection is widely inspired by anime culture, from Paprika and Full Metal Alchemist to Akira and Evangelion, the bright colors, shapes and movement defined the global direction of Panopticon. Straying from either techno-solutionism or techno-doom, Teto navigates a middle ground, mitigating and balancing these extremes in a vibrant, dynamic, and impactful manner."
                    }
                    textVariants={fadeInLinear}
                  />
                </motion.div>
              </div>

              <div
                id="arg3"
                className="flex justify-between gap-32 max-md:gap-4 max-md:flex-col"
              >
                <motion.div
                  variants={AnimContDyna}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col w-full gap-8 max-md:w-auto"
                >
                  <motion.h4 variants={fadeInLinear}>Definition</motion.h4>
                  <motion.p className="italic" variants={fadeInLinear}>
                    When I started working on this collection back in October
                    2022 it began as it always do: with an instinct, an idea
                    that stick to your guts. Even tho I have ve been a web
                    developer for quite some years now, I never been really
                    fluent in Javascript, so when I decided to throw my tablet
                    and my pencil to grab p5.js, it was quite a jump. This year
                    been the most profitable year of my life artistically-wise:
                    I grew as an artist, as a human and my field of view
                    expanded.
                    <motion.span
                      variants={fadeInLinear}
                      style={{
                        marginTop: "1rem",
                        whiteSpace: "nowrap",
                        float: "right",
                      }}
                    >
                      - teto
                    </motion.span>
                  </motion.p>
                </motion.div>

                <motion.div
                  variants={AnimContDyna}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col w-full gap-8 max-md:w-auto"
                >
                  <ImageGrid
                    images={[
                      "img/panopticon/9.jpg",
                      "img/panopticon/10.jpg",
                      "img/panopticon/11.jpg",
                      "img/panopticon/12.jpg",
                    ]}
                    imgVariants={fadeInLinear}
                  />
                </motion.div>
              </div>

              <div id="authors" className="flex flex-col gap-2">
                <p className="text-center"> About the authors</p>

                <div className="flex gap-2 max-md:flex-col">
                  <Link href="https://twitter.com/tetonotsorry">
                    <motion.div
                      variants={AnimContDyna}
                      initial="hidden"
                      viewport={{ once: true }}
                      whileInView="show"
                      className="flex w-full gap-4 p-8 rounded bg-neutral-100"
                    >
                      <motion.img
                        alt=""
                        variants={fadeInSmooth}
                        viewport={{ once: true }}
                        className="w-20 h-20 border-2 rounded-full border-neutral-800"
                        src="/img/profiles/teto.jpg"
                      ></motion.img>
                      <TextSection
                        title="Teto, artist"
                        text={
                          "Mixed-media artist, natively digital, I've been creating art with computer for the past 20 years."
                        }
                        textVariants={"fadeInSmooth"}
                      />
                    </motion.div>
                  </Link>
                  <Link href="https://twitter.com/tokenfox1">
                    <motion.div
                      variants={AnimContDyna}
                      initial="hidden"
                      viewport={{ once: true }}
                      whileInView="show"
                      className="flex w-full gap-4 p-8 rounded bg-neutral-100"
                    >
                      <motion.img
                        alt=""
                        variants={fadeInSmooth}
                        viewport={{ once: true }}
                        className="w-20 h-20 border-2 rounded-full border-neutral-800"
                        src="/img/profiles/fox.jpg"
                      ></motion.img>

                      <TextSection
                        title="TokenFox, contract Magician"
                        text={
                          "Creator of onchainchecker.xyz. Curator and collector of on-chain NFTs. Solidity programmer."
                        }
                        textVariants={"fadeInSmooth"}
                      />
                    </motion.div>
                  </Link>
                </div>
              </div>
              <motion.div
                id="faq"
                variants={AnimContDyna}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col gap-2"
              >
                <motion.div
                  variants={fadeInSmooth}
                  id="faq1"
                  className="flex flex-col gap-2 p-8 rounded bg-neutral-100"
                >
                  <h4>Is Panopticon On-Chain?</h4>
                  <p>
                    Yes. Panopticon is stored and generated on-chain. The
                    thumbnails are not stored on-chain.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInSmooth}
                  id="faq1"
                  viewport={{ once: true }}
                  className="flex flex-col gap-2 p-8 rounded bg-neutral-100"
                >
                  <h4>Where and when is the auction?</h4>
                  <p>
                    The 60-minute Dutch auction will take place on this website
                    on the 14th of November at 10 am PST / 01 pm EST / 6 pm
                    CEST. The auction will have no time extension, which will be
                    closed forever when it reaches the 60-minute mark.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInSmooth}
                  id="faq2"
                  viewport={{ once: true }}
                  className="flex flex-col gap-2 p-8 rounded bg-neutral-100"
                >
                  <h4>How much does it cost to mint one?</h4>
                  <p>
                    The Dutch auction will have a starting price of 0.2 ETH,
                    going down to 0.05 ETH during the 60-minute Dutch auction.
                    If the whole collection mints out before 60 minutes, the
                    final price will be equal to the last sale&apos;s price. You
                    don&apos;t have to worry about paying a higher price, as
                    buyers will be entitled to a rebate if the price they paid
                    is higher than the final price. Allowlisted wallets will
                    also be eligible for a discount.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInSmooth}
                  id="faq3"
                  viewport={{ once: true }}
                  className="flex flex-col gap-2 p-8 rounded bg-neutral-100"
                >
                  <h4>What is the collection size?</h4>
                  <p>
                    A total of 600 NFTs will be available for mint. If less than
                    600 NFTs are sold during the 60-minute Dutch auction, the
                    supply will be reduced to the number of NFTs minted.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInSmooth}
                  id="faq3"
                  viewport={{ once: true }}
                  className="flex flex-col gap-2 p-8 rounded bg-neutral-100"
                >
                  <h4>On which chain?</h4>
                  <p>Panopticon will be launched on the Ethereum Mainnet.</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
