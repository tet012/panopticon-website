// types/globalTypes.ts

export interface Token {
  tokenId: number;
  id: number;
  image: string;
  traits?: Record<string, string>;
  attributes?: Array<{ trait_type: string; value: string }>;
}

export interface CollectionProps {
  collectionId: string;
}

export interface Collection {
  name: string;
  image: string;
  link: string;
  description: string;
  year: string;
}
