import { Address, useQuery } from "wagmi";

interface ApiResponse {
  data: {
    owners: Address[];
  };
}
const fetchDaoboxMembers = async () => {
  const response = await fetch("/api/daobox-members");
  if (!response.ok) throw new Error("Failed to fetch data from daobox-members API");

  const jsonResult = (await response.json()) as ApiResponse;
  const result = jsonResult.data.owners;

  return result;
};

export const useDaoboxMembers = () => {
  return useQuery<Address[]>(["daobox-members"], fetchDaoboxMembers);
};
