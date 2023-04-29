import { DaoBoxFollowNft, LensHub } from "@constants/index";
import LensHubABI from "abi/LensHubABI";
import FollowABI from "../../abi/LensFollowABI";

export const settingsFollowNFT = {
  address: DaoBoxFollowNft,
  abi: FollowABI,
};

export const settingsLensHub = {
  address: LensHub,
  abi: LensHubABI,
};
