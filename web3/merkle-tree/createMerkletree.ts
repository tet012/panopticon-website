type EthereumAddress = `0x${string}`;

export async function getProof(address: EthereumAddress) {
  try {
    const response = await fetch(
      `https://fp-api-eta.vercel.app/api/panopticon/discountList?address=${address}`
    );

    if (!response.ok) {
      console.error(`API call failed with status: ${response.status}`);
      return {
        hasDiscount: false,
        proof: [],
        message: "Address not in discount list",
      };
    }

    const data = await response.json();

    return {
      hasDiscount: data.hasDiscount,
      proof: data.merkleProof,
      message: data.message,
    };
  } catch (error) {
    console.error("Failed to fetch discount data:", error);
    return {
      hasDiscount: false,
      proof: [],
      message: "Error fetching discount data",
    };
  }
}
