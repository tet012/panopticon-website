import React from "react";

const Footer = () => (
  <div className="flex h-fit bg-neutral-50 justify-center">
    <div className="flex justify-center self-center p-8 pt-16 max-md:pt-16 max-md:gap-8 gap-32 w-full mb-4 max-md:flex-col max-md:gap-4">
      <div id="name" className="flex flex-col gap-2">
        <p className="font-semibold">teto</p>
      </div>
      <div id="map" className="flex flex-col gap-2">
        <p className="font-semibold">Site Map</p>
        <a href="/" target="_blank" rel="noopener noreferrer">
          Home
        </a>
        <a href="/collection" target="_blank" rel="noopener noreferrer">
          Collections
        </a>
        <a
          href="https://teto.io/blog"
          target="_blank"
          rel="noopener noreferrer"
        >
          Blog
        </a>
        <a
          href="https://teto.io/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          About
        </a>
      </div>
      <div id="collecitons" className="flex flex-col gap-2">
        <p className="font-semibold">Collections</p>
        <a
          href="https://teto.io/collection/panopticon"
          target="_blank"
          rel="noopener noreferrer"
        >
          Panopticon
        </a>
        <a
          href="https://teto.io/collection/raeminiscence"
          target="_blank"
          rel="noopener noreferrer"
        >
          Raeminiscence
        </a>
        <a
          href="https://teto.io/collection/presence"
          target="_blank"
          rel="noopener noreferrer"
        >
          Presence
        </a>
        <a
          href="https://teto.io/collection/creepz"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Creepz
        </a>
        <a
          href="https://teto.io/collection/founders"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Founders
        </a>
      </div>
      <div id="socials" className="flex flex-col gap-2">
        <p className="font-semibold">Socials</p>
        <a
          href="https://twitter.com/tetonotsorry"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        <a
          href="https://instagram.com/tetonotsorry"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a
          href="mailto:hello@teto.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Email
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
