import { useOpProposal } from "@hooks/op/read";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BigNumber } from "ethers";
import { capitalize } from "lodash";
import React, { useMemo } from "react";
import { OPProposalStatus } from "types";
import { useAccount } from "wagmi";
import { TabStates } from "./ViewProposalsTab";
import { useCancelProposal } from "@hooks/op/write/useCancelProposal";
import { useChallengeProposal } from "@hooks/op/write";
import { useExecuteProposal } from "@hooks/op/write/useExecuteProposal";

type Props = {
  proposalId: string;
};
dayjs.extend(relativeTime);

export const OPProposalInfo: React.FC<Props> = ({ proposalId }) => {
  const { address } = useAccount();
  const { proposal, isLoading } = useOpProposal(BigNumber.from(proposalId));
  const { write: cancelProposal } = useCancelProposal(Number(proposalId));
  const { write: challangeProposal } = useChallengeProposal(Number(proposalId));
  const { write: executeProposal } = useExecuteProposal(Number(proposalId));
  const handleExecute = () => {
    executeProposal?.();
  };
  const handleCancel = () => {
    cancelProposal?.();
  };
  const handleChallange = () => {
    challangeProposal?.();
  };
  const [days, hours, minutes] = useMemo(() => {
    let timeLeft = Math.floor(dayjs(proposal?.pausedAtTime.toNumber()).diff(new Date()) / 1000);

    //convert to hours
    const days = timeLeft / (60 * 60 * 24);
    //get what's left
    timeLeft = timeLeft % (60 * 60 * 24);
    //convert to minutes
    const hours = timeLeft / (60 * 60);
    // get what's left
    timeLeft = timeLeft % (60 * 60);
    const minutes = timeLeft / 60;

    return [Math.floor(days), Math.floor(hours), Math.floor(minutes)];
  }, [proposal]);
  const metadata = proposal?.metadata as unknown as Record<string, string>;

  if (isLoading) {
    return (
      <div className="items center flex w-full justify-center pt-6">
        <button className="loading btn">Please wait</button>
      </div>
    );
  }

  return (
    <div className="p-10">
      {/* <ToastContainer /> */}
      <div className="flex w-full items-stretch justify-start gap-3">
        <div className="flex flex-1 flex-col rounded-lg bg-secondary p-4">
          <h2 className="pb-2 text-lg font-bold">
            <span className="test-lg font-bold">Title:</span> {metadata?.title}
          </h2>

          <p>Summary: {metadata?.description}</p>

          <button className="mt-3 text-left text-sm font-bold  italic">Read more</button>
          <div className="flex flex-1 flex-col justify-evenly">
            {proposal?.status === OPProposalStatus.Active ? (
              <div className="mt-8 flex items-end gap-2" key="NULL">
                <p className="flex flex-1 items-center gap-2 text-lg">
                  <span className="flex flex-col items-center text-sm">
                    <strong>{days}</strong>
                    Days
                  </span>
                  :
                  <span className="flex flex-col items-center text-sm">
                    <strong>{hours}</strong>
                    Hours
                  </span>
                  :
                  <span className="flex  flex-col items-center text-sm">
                    <strong>{minutes}</strong>
                    Minutes
                  </span>
                </p>
                <div className="flex w-full justify-center space-x-4 p-2">
                  <button className="btn-primary btn" onClick={() => handleExecute()}>
                    Execute
                  </button>
                  {address === proposal.proposer && (
                    <button className="btn-primary btn" onClick={() => handleCancel()}>
                      Cancel
                    </button>
                  )}
                  <button className="btn-primary btn" onClick={() => handleChallange()}>
                    Challenge
                  </button>
                </div>
              </div>
            ) : (
              <p className="badge mt-10 rounded-md px-10 py-4 text-info" key="STATUS">
                Proposal {capitalize(TabStates.find(({ id }) => id === proposal?.status)?.title)}
              </p>
            )}

            {/* <div className="mt-4 w-full">
              <progress
                className="progress progress-success w-full"
                value={calculateVotePercentage(
                  new Date().getTime(),
                  proposal?.endDate ?? "",
                  proposal?.startDate ?? ""
                )}
                max="100"
              ></progress>
            </div> */}
          </div>
        </div>
      </div>

      <div className="mt-4 flex w-full items-stretch justify-start gap-3">
        <div className="flex-1 rounded-lg bg-secondary p-4">
          <h2 className="text-lg font-bold">Voting Info</h2>

          <div className="mt-4">
            <p className="flex justify-between text-black">
              <span className="font-bold text-gray-500">Challenge deadline</span>

              <span className="text-primary">
                {dayjs(proposal?.pausedAtTime.toNumber()).format("YYYY/MM/DD HH:mm A")}
              </span>
            </p>
            <p className="mt-2 flex justify-between text-black">
              <span className="font-bold text-gray-500">Execution date</span>

              <span className="text-primary">
                {dayjs(proposal?.executionFromTime.toNumber()).format("YYYY/MM/DD HH:mm A")}
              </span>
            </p>
            <p className="mt-2 flex justify-between text-black">
              <span className="font-bold text-gray-500">Proposer address</span>

              <span className="text-primary">{proposal?.proposer}</span>
            </p>
          </div>
          <div className="divider"></div>
          <h2 className="text-lg font-bold">Rule of Decision</h2>

          <div className="mt-4 flex flex-col gap-2">
            <p className="flex justify-between text-black">
              <span className="font-bold text-gray-500">Options</span>

              <span className="text-primary">Approve</span>
            </p>
            <p className="flex justify-between text-black">
              <span className="font-bold text-gray-500">Strategy</span>

              <span className="text-primary">Optimistic Proposal</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
