import React, { forwardRef } from "react";
import Image from "next/image"; // Importing Next.js Image component

type TokenProps = {
  id: number;
  image: string;
};

interface TokenComponentProps {
  token: TokenProps;
  onClick: (id: number) => void;
}

const Token = forwardRef<HTMLDivElement, TokenComponentProps>(
  ({ token, onClick }, ref) => {
    return (
      <div ref={ref} onClick={() => onClick(token.id)}>
        {/* Replaced <img> with Next.js <Image> component */}
        <Image
          src={token.image}
          alt={`Token ${token.id}`}
          width={200}
          height={200}
          layout="responsive"
        />
      </div>
    );
  },
);

Token.displayName = "Token"; // Assigning display name

export default Token;
