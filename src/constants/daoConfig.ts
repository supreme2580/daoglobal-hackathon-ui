import { BN } from "@lib/numbers";
import { ethers } from "ethers";
import { Address } from "wagmi";

export const daoAddressOrEns: Address = "0xe2e445489b0356D3087efF7e79DB7Ff3f16c4fEA";
export const lensVotingAddress: Address = "0xbf8de4316e2778e26b12dad8906467b23bb9a293";
export const opVotingAddress: Address = "0xb2efef40aa7c99a8a872bb2c1904968d5adfc8eb";
export const creationTx = "0x7b8ffa68a60b90ceccb2eeefac365b1793a66dcae2d9f1af96c595190cdf9916";

export const lensPluginAddress = "0x65f2fb8361b9f35dcb9f29e620607f82e5abbf0e";
export const adminPluginAddress = "0xc1b5edb884bb246ce4ea087aef8906460d6a866a";

// export const daoAddressOrEns: Address = "0xF98a51E2b27F9BE59576B2AeD6bfc3B57662311d";
export const votingPluginAddress: Address = "0x68922b5dbf3dca99a32188ccf2743cbcad2e625f";
export const DaoBoxFollowNft: Address = "0x03bD27B6FE4f0B3F2C2C9a4289cA2bfcE1DDE95c";
export const LensHub: Address = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d";

export const DaoBoxProfileId = BN(115969);

export const availableTokens = [
  {
    name: "Goerli",
    symbol: "ETH",
    decimal: 18,
    balance: 1000,
    address: ethers.constants.AddressZero,
  },
  {
    name: "Mumbai",
    symbol: "MATIC",
    decimal: 18,
    balance: 100,
    address: ethers.constants.AddressZero,
  },
];
