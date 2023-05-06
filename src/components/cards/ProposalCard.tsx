import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { truncateAddress } from "@utils/addresses";
import { upperCase } from "lodash";
import { type TokenVotingProposalListItem } from "@aragon/sdk-client";
import { useRouter } from "next/router";

dayjs.extend(relativeTime);

type Props = TokenVotingProposalListItem;

export const ProposalCard: React.FC<Props> = ({ status, ...proposal }) => {
  const router = useRouter();
  return (
    <div className="border-neutral card col-span-1 w-full scale-95 rounded-lg bg-secondary shadow-xl transition hover:scale-100">
      <div
        className="card-body cursor-pointer"
        onClick={() => router.push(`/proposals/${proposal.id}`)}
      >
        <div className="card-actions justify-between">
          <div className="flex flex-1 items-center justify-start gap-2 text-sm font-medium">
            <div className="placeholder avatar">
              <div className="w-8 rounded-full bg-success text-neutral-content">
                <span className="text-xs">
                  {upperCase(proposal.dao.name.substring(0, 2))}
                </span>
              </div>
            </div>
            <p className="text-md">
              {proposal.dao.name} by{" "}
              <strong>{truncateAddress(proposal.dao.address, 8, 6)}</strong>
            </p>
          </div>

          <span className="badge badge-md bg-secondary text-primary rounded-xl">{status}</span>
        </div>
        <h2 className="card-title mt-5 text-primary">{proposal.metadata.title}</h2>
        <p>{proposal.metadata.summary}</p>
      </div>
    </div>
  );
};
