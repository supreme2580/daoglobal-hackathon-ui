import { Web3Storage, File } from "web3.storage";
import { Buffer } from "buffer";
import { BytesLike, ethers } from "ethers";

export async function uploadToIPFS(text: string): Promise<string> {
  const accessToken = process.env.NEXT_PUBLIC_WEB_3_STORAGE_KEY;
  if (!accessToken) {
    throw new Error("NEXT_PUBLIC_WEB_3_STORAGE_KEY environment variable not set");
  }

  const client = new Web3Storage({ token: accessToken });
  const textBuffer = Buffer.from(text);
  const file = new File([textBuffer], "");
  return await client.put([file], { wrapWithDirectory: false });
}

export async function getJsonFromIPFS(cid: string): Promise<any> {
  const accessToken = process.env.NEXT_PUBLIC_WEB_3_STORAGE_KEY;
  if (!accessToken) {
    throw new Error("NEXT_PUBLIC_WEB_3_STORAGE_KEY environment variable not set");
  }

  const client = new Web3Storage({ token: accessToken });

  try {
    const data = await client.get(cid);
    // if (!data) {
    //   throw new Error(`Unable to find data for CID: ${cid}`);
    // }
    if (!data || !data.ok) {
      console.error(`Unable to find data for CID: ${cid}`);
      return "";
    }

    const files = await data?.files();
    // if (files.length === 0) {
    //   throw new Error(`No files found for CID: ${cid}`);
    // }

    const file = files[0];
    const fileContents = await file?.arrayBuffer();
    const jsonString = new TextDecoder().decode(fileContents);
    const json = JSON.parse(jsonString);

    return json;
  } catch (error) {
    console.error(`Error fetching JSON from IPFS: ${error}`);
    throw error;
  }
}

export const decode = async (metadata: BytesLike) => {
  const data = ethers.utils.toUtf8String(metadata);
  if (!data) {
    console.error("Unable to decode metadata", { metadata });
    return "";
  }
  const json = await getJsonFromIPFS(data);
  return json;
};
