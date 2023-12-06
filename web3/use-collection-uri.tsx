import useCreepzUri from "./creepz/use-creepz-uri";
import useGetImageUri from "./panopticon/use-get-image-uri";
import useRaeminiscenceUri from "./raeminiscence/use-raeminiscence-uri";
import usePresenceUri from "./presence/use-presence-uri";
import useFoundersUri from "./founders/use-founders-uri";

const useCollectionUri = (
  id: string | number | bigint | boolean,
  collectionId: string,
) => {
  if (collectionId === "panopticon") {
    if (typeof id === "number" || typeof id === "string") {
      const { imageUri, loading, error } = useGetImageUri(BigInt(id));
      return { tokenData: { image: imageUri }, loading, error };
    } else {
      return { tokenData: null, loading: false, error: "Invalid ID" };
    }
  } else if (collectionId === "creepz") {
    const numericId = Number(id);
    if (!isNaN(numericId)) {
      return useCreepzUri(BigInt(numericId));
    } else {
      return { tokenData: null, loading: false, error: "Invalid ID" };
    }
  } else if (collectionId === "raeminiscence") {
    return useRaeminiscenceUri(BigInt(id));
  } else if (collectionId === "presence") {
    return usePresenceUri(BigInt(id));
  } else if (collectionId === "founders") {
    return useFoundersUri(BigInt(id));
  } else if (collectionId === "loopz") {
    return useFoundersUri(BigInt(id));
  }
  return { tokenData: null, loading: false, error: "Invalid collection ID" };
};

export default useCollectionUri;
