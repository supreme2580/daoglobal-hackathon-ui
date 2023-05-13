import { VoteValues, type TokenVotingProposal } from "@aragon/sdk-client";
import { useMemo } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

interface Props {
  proposal: TokenVotingProposal;
}

export const ProposalChartSummary: React.FC<Props> = ({ proposal }) => {
  const chartData = useMemo(() => {
    const voteCount = {
      [VoteValues.YES]: 0,
      [VoteValues.NO]: 0,
      [VoteValues.ABSTAIN]: 0,
    };

    if (proposal) {
      proposal.votes.forEach(({ vote }) => {
        voteCount[vote] = voteCount[vote] + 1;
      });
    }
    return [
      {
        name: "Yes",
        value: voteCount["2"],
        color: "#02AB76",
      },
      {
        name: "Abstain",
        value: voteCount["1"],
        color: "#D7FFF2",
      },
      {
        name: "No",
        value: voteCount["3"],
        color: "#59E9AB",
      },
    ];
  }, [proposal]);
  return (
    <div className="border-neutral rounded-lg border-2 p-4">
      <h2 className="text-lg font-bold">Vote Summary</h2>

      <div className="mt-3 h-full w-full min-w-fit">
        <PieChart width={300} height={215} margin={{ top: 50 }}>
          <Legend
            wrapperStyle={{ top: 0 }}
            formatter={(value, { color }) => <span style={{ color: "black" }}>{value}</span>}
            align="left"
          />
          <Pie data={chartData} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};
