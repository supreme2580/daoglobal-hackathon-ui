import { DaoBoxFollowNft } from "@constants/daoConfig";
import { Network, Alchemy } from "alchemy-sdk";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const alchemy = new Alchemy({
    // apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    network: Network.MATIC_MAINNET,
  });
  const data = await alchemy.nft.getOwnersForContract(DaoBoxFollowNft);
  // console.log("data", data);
  res.status(200).json({ data });
};

export default handler;
