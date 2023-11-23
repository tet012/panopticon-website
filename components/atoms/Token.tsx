import React, { useRef, forwardRef } from "react";
import Image from "next/image"; // Importing Next.js Image component

type TokenProps = {
  id: number;
  image: string;
};

type TokenComponentProps = {
  token: TokenProps;
  onClick: (id: number) => void;
};

const Token: React.FC<TokenComponentProps> = ({ token, onClick }) => {
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const handleLoadingComplete = () => {
    if (imageWrapperRef.current) {
      imageWrapperRef.current.style.background = "none";
    }
  };

  return (
    <div
      ref={imageWrapperRef}
      onClick={() => onClick(token.id)}
      className="image-wrapper"
    >
      <Image
        src={token.image}
        alt={`Token ${token.id}`}
        width={300}
        height={400}
        loading="lazy"
        onLoadingComplete={handleLoadingComplete}
      ></Image>
    </div>
  );
};

Token.displayName = "Token";

export default Token;
