import { BN, useOpProposal, useOpProposals } from "@hooks/op/read";
import { useNewOpProposal } from "@hooks/op/write";

import { type NextPage } from "next";
import Head from "next/head";
import { Address } from "wagmi";

const Proposals: NextPage = () => {
  const { proposals } = useOpProposals({
    perPage: 10,
  });
  const { proposal } = useOpProposal(1);
  console.log({ proposal });
  console.log({ proposals });

  const { write } = useNewOpProposal({
    metadata: {
      title: "Test",
      description: "Test",
    },
    actions: [
      {
        to: "0x47d80912400ef8f8224531EBEB1ce8f2ACf4b75a" as Address,
        value: BN(1),
        data: "0x",
      },
    ],
  });

  return (
    <>
      <Head>
        <title>DAOGlobal Proposals UI</title>
        <meta name="description" content="DAOBox DAO Proposals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {proposals[0] &&
        proposals[0].map((proposal, index) => <ProposalCard key={index} proposal={proposal} />)}
    </>
  );
};

export default Proposals;

function ProposalCard({ proposal }: any) {
  return (
    <div className="card mb-2 p-2">
      <h5 className="card-title">Proposal ID: {proposal.proposalId}</h5>
      <p>Dispute Status: {proposal.disputeStatus}</p>
      <p>Status: {proposal.status}</p>
      <p>Execution From Time: {proposal.executionFromTime?.toString()}</p>
      <p>Paused At Time: {proposal.pausedAtTime?.toString()}</p>
      <p>Dispute ID: {proposal.disputeId?.toString()}</p>
      <p>Proposer: {proposal?.proposer}</p>
      {proposal?.metadata && <p>{JSON.stringify(proposal.metadata, null, 2)}</p>}
      {/* <p>Metadata: {proposal?.metadata}</p> */}
    </div>
  );
}
