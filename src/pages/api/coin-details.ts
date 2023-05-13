import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query: { symbol} } = req
    const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}&convert=USD&CMC_PRO_API_KEY=${process.env.NEXT_PUBLIC_COINMARKETCAP_API_KEY}`)
    const data = await response.json()
    res.status(200).json(data);
};

export default handler;