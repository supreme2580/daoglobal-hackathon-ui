import { Address, useQuery } from "wagmi";

const fetchDaoboxMembers = async () => {
  const response = await fetch("/api/daobox-members");
  if (!response.ok) throw new Error("Failed to fetch data from daobox-members API");
  const result = (await response.json()).data.owners;

  return result;
};

export const useDaoboxMembers = () => {
  return useQuery<Address[]>(["daobox-members"], fetchDaoboxMembers);
};
