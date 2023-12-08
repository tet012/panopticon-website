import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";

const About: NextPage = () => {
  return (
    <div>
      <Head>
        <title>About | Teto</title>
        <meta name="description" content="A age about teto." />
        <meta property="og:title" content="About | Teto" />
        <meta property="og:description" content="A age about teto." />
        <meta property="og:image" content="/img/web-img.jpg" />
      </Head>

      <NavBar />
      <div className="w-full flex flex-col min-h-screen justify-center align-center items-center">
        <div className="w-1/2 self-center flex flex-col gap-8 max-md:mt-0 max-md:w-full max-md:p-8 mt-[-10rem]">
          <p className="text-xl">
            {
              "I really should put a nice and cute page together where I tell you more about me, my journey as an artist, and how I got there. Maybe even throw a nice picture of my ugly face, huh?"
            }
          </p>
          <p className="text-xl">
            {
              "I'll eventually do that. But for now, I'm very happy that my art speaks for itself; we have plenty of time to get to know each other."
            }
          </p>
          <p className="text-xl">
            {
              "If you really need some basic information: I love pasta, my mom, and sometimes drinking a little too much."
            }
          </p>
          <p className="text-xl">
            {
              "I'm obsessed with the idea of other people's sight defining us and how it can make or break individuals. I've seen it many times."
            }
          </p>
          <p className="text-xl">
            {
              "I do this art stuff to honor myself and the memory of my people, a lot of whom passed away too soon, unfulfilled."
            }
          </p>
          <p className="text-xl">
            {
              "This is the realest shit I've ever written. Thank you for reading."
            }
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
