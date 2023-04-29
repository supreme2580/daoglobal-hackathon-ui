import { useQuery } from "wagmi";

const fetchDaoboxMembers = async () => {
  const response = await fetch("/api/daobox-members");
  if (!response.ok) throw new Error("Failed to fetch data from daobox-members API");
  return await response.json();
};

export const useDaoboxMembers = () => {
  return useQuery(["daobox-members"], fetchDaoboxMembers);
};
