import { BN, useOpProposal, useOpProposals } from "@hooks/op/read";
import { useChallengeProposal, useNewOpProposal } from "@hooks/op/write";
import { useCancelProposal } from "@hooks/op/write/useCancelProposal";
import { useExecuteProposal } from "@hooks/op/write/useExecuteProposal";

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
      <button className="btn" onClick={() => write?.()}>
        New OP Proposal
      </button>

      {proposals[0] &&
        proposals[0].map((proposal, index) => <ProposalCard key={index} proposal={proposal} />)}
    </>
  );
};

export default Proposals;

function ProposalCard({ proposal }: any) {
  const { write: cancelProposal } = useCancelProposal(proposal.proposalId);
  const { write: challangeProposal } = useChallengeProposal(proposal.proposalId);

  const { write: executeProposal } = useExecuteProposal(proposal.proposalId);
  const handleExecute = () => {
    console.log(`execute ID: ${proposal.proposalId}`);
    executeProposal?.();
  };
  const handleCancel = () => {
    console.log(`cancel ID: ${proposal.proposalId}`);
    cancelProposal?.();
  };

  const handleChallange = () => {
    console.log(`challange ID: ${proposal.proposalId}`);
    challangeProposal?.();
  };

  return (
    <div className="card mb-2 bg-base-300 p-6 shadow-xl">
      <h5 className="card-title">Proposal ID: {proposal.proposalId}</h5>
      <p>Dispute Status: {proposal.disputeStatus}</p>
      <p>Status: {proposal.status}</p>
      <p>Execution From Time: {proposal.executionFromTime?.toString()}</p>
      <p>Paused At Time: {proposal.pausedAtTime?.toString()}</p>
      <p>Dispute ID: {proposal.disputeId?.toString()}</p>
      <p>Proposer: {proposal?.proposer}</p>
      {proposal?.metadata && <p>{JSON.stringify(proposal.metadata, null, 2)}</p>}
      <div className="flex w-full justify-center space-x-4 p-2">
        <button className="btn-primary btn" onClick={() => handleExecute()}>
          execute
        </button>
        <button className="btn-primary btn" onClick={() => handleCancel()}>
          cancel
        </button>
        <button className="btn-primary btn" onClick={() => handleChallange()}>
          challange
        </button>
      </div>
    </div>
  );
}
