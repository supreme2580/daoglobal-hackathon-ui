import { Proposal } from "@constants/mocks/MockProposals";
import { ClockIcon } from "@heroicons/react/24/outline";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { truncateAddress } from "@utils/addresses";

dayjs.extend(relativeTime);

type Props = Proposal;

export const ProposalCard: React.FC<Props> = ({ status, ...proposal }) => {
  return (
    <div className="card col-span-2 w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-actions justify-between">
          <span className="badge badge-md">{status}</span>

          <div className="flex items-center justify-end gap-2 text-sm font-medium">
            <ClockIcon width={20} height={20} />
            <span className="inline-block whitespace-nowrap">
              {dayjs(proposal.startDate).toNow()}
            </span>
          </div>
        </div>
        <h2 className="card-title mt-5">{proposal.metadata.title}</h2>
        <p>{proposal.metadata.summary}</p>
        <div className="card-actions justify-start">
          <p className="text-xs">
            Published by{" "}
            <strong>{truncateAddress(proposal.dao.address)}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
