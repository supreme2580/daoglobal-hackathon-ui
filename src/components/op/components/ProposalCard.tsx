import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { truncateAddress } from "@utils/addresses";
import { upperCase } from "lodash";
import { type TokenVotingProposalListItem } from "@aragon/sdk-client";
import { useRouter } from "next/router";
import { ProposalDetails } from "types";
import { TabStates } from "@components/op/components/ViewProposalsTab";

dayjs.extend(relativeTime);

type Props = ProposalDetails;

export const ProposalCard: React.FC<Props> = ({ status, ...proposal }) => {
  const router = useRouter();
  const metadata = proposal.metadata as unknown as Record<string, string>;
  return (
    <div className="border-neutral card col-span-1 w-full scale-95 rounded-lg bg-secondary shadow-xl transition hover:scale-100">
      <div
        className="card-body cursor-pointer"
        onClick={() => router.push(`/ops/${proposal.proposalId}`)}
      >
        <div className="card-actions justify-between">
          <div className="flex flex-1 items-center justify-start gap-2 text-sm font-medium">
            <div className="placeholder avatar">
              <div className="w-8 rounded-full bg-success text-neutral-content">
                <span className="text-xs">
                  {truncateAddress(proposal.proposer.substring(0, 2))}
                </span>
              </div>
            </div>
            <p className="text-md">
              <strong>{truncateAddress(proposal.proposer, 8, 6)}</strong>
            </p>
          </div>

          <span className="badge badge-md rounded-xl bg-secondary text-primary">
            {TabStates.find(({ id }) => id === status)?.title}
          </span>
        </div>
        <h2 className="card-title mt-5 text-primary">{metadata.title}</h2>
        <p>{metadata.description}</p>
      </div>
    </div>
  );
};
