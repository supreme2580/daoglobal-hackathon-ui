import { useRouter } from "next/router";

const ProposalsByID = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>Proposal ID: {id}</div>;
};

export default ProposalsByID;
