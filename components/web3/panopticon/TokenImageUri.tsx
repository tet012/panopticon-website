import React, { useEffect, useState } from "react";
import { useGetImageUri } from "../../../web3/panopticon/use-get-image-uri";

interface TokenImageDisplayProps {
  tokenId: bigint;
}

const TokenImageDisplay: React.FC<TokenImageDisplayProps> = ({ tokenId }) => {
  const { imageUri, error, loading } = useGetImageUri(tokenId);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (imageUri) {
      const hasHttp =
        imageUri.startsWith("http://") || imageUri.startsWith("https://");
      let formattedUri = imageUri;

      if (hasHttp) {
        // Split the URL and insert 'www.'
        const parts = imageUri.split("//");
        formattedUri = parts[0] + "//www." + parts[1];
      } else {
        // If the URL doesn't start with http or https, prepend 'https://www.'
        formattedUri = "https://www." + imageUri;
      }

      setImageUrl(formattedUri);
    }
  }, [imageUri]);

  if (loading) return <div>Loading...</div>;
  if (error || !imageUrl) return <div>Unable to fetch image.</div>;

  return (
    <img
      src={imageUrl}
      alt={`Token ${tokenId}`}
      style={{ width: "100%", height: "auto" }}
    />
  );
};

export default TokenImageDisplay;
