import React from "react";

const Footer = () => (
  <div className="flex h-fit justify-center">
    <div className="flex justify-center self-center p-8 pt-16 max-md:pt-16 max-md:gap-8 gap-32 w-full mb-4 max-md:flex-col max-md:gap-4">
      <div id="map" className="flex flex-col gap-2">
        <a
          className="hover:text-neutral-900 text-neutral-500 transtition"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Home
        </a>
        <a
          className="hover:text-neutral-900 text-neutral-500 transtition"
          href="/collection"
          target="_blank"
          rel="noopener noreferrer"
        >
          Collections
        </a>
        <a
          className="hover:text-neutral-900 text-neutral-500 transtition"
          href="/blog"
          target="_blank"
          rel="noopener noreferrer"
        >
          Blog
        </a>
      </div>
      <div id="collecitons" className="flex flex-col gap-2">
        <a
          className="hover:text-neutral-900 text-neutral-500 transtition"
          href="/collection/panopticon"
          target="_blank"
          rel="noopener noreferrer"
        >
          Panopticon
        </a>
        <a
          className="hover:text-neutral-900 text-neutral-500 transtition"
          href="/collection/raeminiscence"
          target="_blank"
          rel="noopener noreferrer"
        >
          Raeminiscence
        </a>
        <a
          className="hover:text-neutral-900 text-neutral-500 transtition"
          href="/collection/presence"
          target="_blank"
          rel="noopener noreferrer"
        >
          Presence
        </a>
        <a
          className="hover:text-neutral-900 text-neutral-500 transtition"
          href="/collection/creepz"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Creepz
        </a>
        <a
          className="hover:text-neutral-900 text-neutral-500 transtition"
          href="/collection/founders"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Founders
        </a>
      </div>
      <div id="socials" className="flex flex-col gap-2">
        <a
          className="hover:text-neutral-900 text-neutral-500 transtition"
          href="https://twitter.com/tetonotsorry"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        <a
          className="hover:text-neutral-900 text-neutral-500 transtition"
          href="https://instagram.com/tetonotsorry"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a
          className="hover:text-neutral-900 text-neutral-500 transtition"
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
