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
              "I really should create an engaging and charming page where I can share more about myself, my artistic journey, and my origins. Perhaps I'll even include a charming photo of my less-than-perfect face, right?"
            }
          </p>
          <p className="text-xl">
            {
              "I'll get around to doing that. But for the moment, I'm content knowing my art can stand on its own. There's ample time for us to become acquainted."
            }
          </p>
          <p className="text-xl">
            {
              "In case you're curious about some fundamental details: I have a fondness for pasta, adore my mother, and occasionally indulge in a bit too much drinking."
            }
          </p>
          <p className="text-xl">
            {
              "I'm fascinated by how the perceptions of others shape us and the powerful impact they can have on our lives. I've witnessed its effects repeatedly."
            }
          </p>
          <p className="text-xl">
            {
              "My artistic endeavors are a tribute to myself and a remembrance of my loved ones who departed too early, their potential unfulfilled."
            }
          </p>
          <p className="text-xl">
            {
              "This is the most genuine expression I've ever shared. Thank you for taking the time to read it."
            }
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
