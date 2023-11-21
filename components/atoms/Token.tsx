import React, { forwardRef } from "react";

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
        <img src={token.image} alt={`Token ${token.id}`} loading="lazy" />
      </div>
    );
  },
);

export default Token;
