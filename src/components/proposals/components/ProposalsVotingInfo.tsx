import {
  ProposalStatus,
  VoteValues,
  useFetchProposal,
  useVoteOnProposal,
} from "@daobox/use-aragon";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { truncateAddress } from "@utils/addresses";
import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { capitalize, lowerCase } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { PieChart, Pie, Legend, Cell, Tooltip } from "recharts";
import { useAccount } from "wagmi";
import { ProposalChartSummary } from "../ProposalChart";

type Props = {
  proposalId: string;
};
dayjs.extend(relativeTime);

const VoteOptions = [
  { id: VoteValues.YES, value: "Yes" },
  { id: VoteValues.ABSTAIN, value: "Abstain" },
  { id: VoteValues.NO, value: "No" },
];

export const ProposalVotingInfo: React.FC<Props> = ({ proposalId }) => {
  const [proposedVote, setProposedVote] = useState<VoteValues | undefined>(undefined);
  const { address } = useAccount();
  const { mutate, isLoading: isVoting } = useVoteOnProposal({
    proposalId,
    vote: proposedVote!,
    onSuccess: () => toast("Voting Successful"),
    onError: (error) => {
      console.log({ error });
      toast.error(error.message);
    },
  });
  const { data: proposal, isLoading } = useFetchProposal({
    proposalId,
  });
  const [showCount, setShowCount] = useState(5);

  const calculateVotePercentage = (now: number, end: string | Date, start: string | Date) => {
    const endTime = new Date(end).getTime();
    const startTime = new Date(start).getTime();

    const percentage = ((now - startTime) * 100) / endTime;
    return Math.round(percentage);
  };

  const voteOfAddress = useMemo(() => {
    const vote_of_address = proposal?.votes.find(({ address: addr }) => {
      return lowerCase(addr) == lowerCase(address);
    });
    return vote_of_address?.vote;
  }, [proposal?.votes, address]);

  const [days, hours, minutes] = useMemo(() => {
    let timeLeft = Math.floor(dayjs(proposal?.endDate).diff(new Date()) / 1000);

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

  useEffect(() => {
    if (proposedVote) {
      mutate();
    }
  }, [proposedVote, mutate]);

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
          <h2 className="pb-2 text-lg font-bold">{proposal?.metadata.title}</h2>

          <p>{proposal?.metadata.summary} </p>

          <button className="mt-3 text-left font-bold">Read more</button>
          <div className="flex flex-1 flex-col justify-evenly">
            {proposal?.status === ProposalStatus.ACTIVE ? (
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
                {VoteOptions.map(({ id, value }) => (
                  <>
                    {isVoting && proposedVote === id ? (
                      <button className="loading btn-square btn" key={id}></button>
                    ) : (
                      <button
                        key={id}
                        className={classNames(
                          "btn",
                          voteOfAddress === id ? "btn-primary" : "btn-outline"
                        )}
                        onClick={() => setProposedVote(id)}
                      >
                        {value}
                      </button>
                    )}
                  </>
                ))}
              </div>
            ) : (
              <p className="badge rounded-md px-10 py-4 text-info" key="STATUS">
                Proposal {capitalize(proposal?.status)}
              </p>
            )}

            <div className="mt-4 w-full">
              <progress
                className="progress progress-success w-full"
                value={calculateVotePercentage(
                  new Date().getTime(),
                  proposal?.endDate ?? "",
                  proposal?.startDate ?? ""
                )}
                max="100"
              ></progress>
            </div>
          </div>
        </div>
        <ProposalChartSummary proposal={proposal!} />
      </div>

      <div className="mt-4 flex w-full items-stretch justify-start gap-3">
        <div className="flex-1 rounded-lg bg-secondary p-4">
          <h2 className="text-lg font-bold">{proposal?.votes.length ?? 0} Voters</h2>

          <div className="mt-4 w-full">
            {proposal?.votes.length ? (
              <>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Members</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proposal.votes.slice(0, showCount).map((vote, id) => (
                        <tr key={id} className="border-neutral border-t-2">
                          <td>{truncateAddress(vote.address)}</td>
                          <td>{VoteOptions.find(({ id }) => id === vote.vote)?.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {proposal.votes.length > 5 && (
                  <button
                    className="text-md btn-ghost btn flex items-center gap-3 text-accent"
                    onClick={() => setShowCount((prev) => (prev === 5 ? 10 : 5))}
                  >
                    Show {showCount === 5 ? "More" : "Less"}{" "}
                    <ChevronDownIcon width={20} height={20} />
                  </button>
                )}
              </>
            ) : (
              <p className="border-neutral border-t-2 p-1 text-center text-lg text-error">
                No votes recorded
              </p>
            )}
          </div>
        </div>
        <div className="flex-1 rounded-lg bg-secondary p-4">
          <h2 className="text-lg font-bold">Voting Info</h2>

          <div className="mt-4">
            <p className="flex justify-between text-black">
              <span className="font-bold text-gray-500">Start Date</span>

              <span className="text-primary">
                {dayjs(proposal?.startDate).format("YYYY/MM/DD HH:mm A")}
              </span>
            </p>
            <p className="mt-2 flex justify-between text-black">
              <span className="font-bold text-gray-500">End Date</span>

              <span className="text-primary">
                {dayjs(proposal?.endDate).format("YYYY/MM/DD HH:mm A")}
              </span>
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
              <span className="font-bold text-gray-500">Minimum Approval</span>

              <span className="text-primary">
                {Math.round((proposal?.settings.minParticipation ?? 0) * 100)}%
              </span>
            </p>
            <p className="flex justify-between text-black">
              <span className="font-bold text-gray-500">Strategy</span>

              <span className="text-primary">Token Weighted</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
