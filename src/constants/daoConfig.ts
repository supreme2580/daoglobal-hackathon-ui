import { BN } from "@lib/numbers";
import { ethers } from "ethers";
import { type Address } from "wagmi";
import { Mailchain } from "@mailchain/sdk";

export const daoAddressOrEns: Address = "0xe2e445489b0356D3087efF7e79DB7Ff3f16c4fEA";
export const lensVotingAddress: Address = "0xbf8de4316e2778e26b12dad8906467b23bb9a293";
export const opVotingAddress: Address = "0xb2efef40aa7c99a8a872bb2c1904968d5adfc8eb";
export const creationTx = "0x7b8ffa68a60b90ceccb2eeefac365b1793a66dcae2d9f1af96c595190cdf9916";

export const lensPluginAddress = "0xbf8de4316e2778e26b12dad8906467b23bb9a293";
export const adminPluginAddress = "0xb2efef40aa7c99a8a872bb2c1904968d5adfc8eb";

export const DaoBoxFollowNft: Address = "0x03bD27B6FE4f0B3F2C2C9a4289cA2bfcE1DDE95c";
export const LensHub: Address = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d";

export const votingPluginAddress: Address = "0x65f2fb8361b9f35dcb9f29e620607f82e5abbf0e";

export const DaoBoxProfileId = BN(115969);

export const availableTokens = [
  {
    name: "Polygon Mainnet",
    symbol: "MATIC",
    decimal: 18,
    balance: 100,
    address: ethers.constants.AddressZero,
  },
];

export const mailchainSecretRecoveryPhrase =
  process.env.NEXT_MAILCHAIN_SECRET_PHRASE ??
  "improve cost term task fashion cradle base cook discover make armor edge magnet huge issue brown moment forum lake fitness people quit arctic urban";

export const mailchainSender = "bolajahmad@mailchain.com";
