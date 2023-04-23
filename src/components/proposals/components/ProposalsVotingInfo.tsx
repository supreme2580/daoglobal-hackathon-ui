import {
  VoteValues,
  useFetchProposal,
  useVoteOnProposal,
} from "@daobox/use-aragon";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { truncateAddress } from "@utils/addresses";
import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
  Cell,
  Tooltip,
} from "recharts";

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
  const [proposedVote, setProposedVote] = useState<VoteValues>(VoteValues.YES);
  const { mutate } = useVoteOnProposal({
    proposalId,
    vote: proposedVote,
  });
  const { data: proposal, isLoading } = useFetchProposal({
    proposalId,
  });
  const [showCount, setShowCount] = useState(5);

  const calculateVotePercentage = (
    now: number,
    end: string | Date,
    start: string | Date
  ) => {
    const endTime = new Date(end).getTime();
    const startTime = new Date(start).getTime();

    const percentage = ((now - startTime) * 100) / endTime;
    return Math.round(percentage);
  };

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

  const chartData = useMemo(
    () => [
      {
        name: "Yes",
        value: Number(proposal?.result.yes.toString()) || 7,
        color: "#02AB76",
      },
      {
        name: "Abstain",
        value: Number(proposal?.result.abstain.toString()) || 2,
        color: "#D7FFF2",
      },
      {
        name: "No",
        value: Number(proposal?.result.no.toString()) || 10,
        color: "#59E9AB",
      },
    ],
    [proposal]
  );

  useEffect(() => {
    mutate();
  }, [proposedVote]);

  return (
    <div className="p-10">
      <div className="flex w-full items-stretch justify-start gap-3">
        <div className="border-neutral flex flex-1 flex-col rounded-lg border-2 p-4">
          <h2 className="text-lg font-bold">{proposal?.metadata.title}</h2>

          <p>
            {proposal?.metadata.summary}{" "}
            <button className="font-bold">Read more</button>
          </p>

          <div className="flex flex-1 flex-col justify-evenly">
            <div className="mt-8 flex items-end gap-2">
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
                <button
                  key={id}
                  className={classNames(
                    "btn ",
                    proposedVote === id ? "" : "btn-outline"
                  )}
                  onClick={() => setProposedVote(id)}
                >
                  {value}
                </button>
              ))}
            </div>

            <div className="mt-4 w-full">
              <progress
                className="progress progress-accent w-full"
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
        <div className="border-neutral rounded-lg border-2 p-4">
          <h2 className="text-lg font-bold">Vote Summary</h2>

          <div className="mt-3 h-full w-full min-w-fit">
            <ResponsiveContainer width={300} height={215}>
              <PieChart margin={{ top: 50 }}>
                <Legend
                  wrapperStyle={{ top: 0 }}
                  formatter={(value, { color }) => (
                    <span style={{ color: "black" }}>{value}</span>
                  )}
                  align="left"
                />
                <Pie
                  data={chartData}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-4 flex w-full items-stretch justify-start gap-3">
        <div className="border-neutral flex-1 rounded-lg border-2 p-4">
          <h2 className="text-lg font-bold">
            {proposal?.votes.length ?? 0} Voters
          </h2>

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
                          <td>
                            {
                              VoteOptions.find(({ id }) => id === vote.vote)
                                ?.value
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {proposal.votes.length > 5 && (
                  <button className="text-md btn-ghost btn flex items-center gap-3 text-accent">
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
        <div className="border-neutral flex-1 rounded-lg border-2 p-4">
          <h2 className="text-lg font-bold">Voting Info</h2>

          <div className="mt-4">
            <p className="flex justify-between text-black">
              <span className="font-bold text-gray-500">Start Date</span>

              <span>
                {dayjs(proposal?.startDate).format("YYYY/MM/DD HH:mm A")}
              </span>
            </p>
            <p className="mt-2 flex justify-between text-black">
              <span className="font-bold text-gray-500">End Date</span>

              <span>
                {dayjs(proposal?.endDate).format("YYYY/MM/DD HH:mm A")}
              </span>
            </p>
          </div>
          <div className="divider"></div>
          <h2 className="text-lg font-bold">Rule of Decision</h2>

          <div className="mt-4 flex flex-col gap-2">
            <p className="flex justify-between text-black">
              <span className="font-bold text-gray-500">Options</span>

              <span>Approve</span>
            </p>
            <p className="flex justify-between text-black">
              <span className="font-bold text-gray-500">Minimum Approval</span>

              <span>{(proposal?.settings.minParticipation ?? 0) * 100}%</span>
            </p>
            <p className="flex justify-between text-black">
              <span className="font-bold text-gray-500">Strategy</span>

              <span>Token Weighted</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
