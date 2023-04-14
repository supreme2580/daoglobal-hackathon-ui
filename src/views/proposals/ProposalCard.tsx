import { Proposal } from "@constants/mocks/MockProposals";
import { ClockIcon } from "@heroicons/react/24/outline";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

type Props = Proposal;

export const ProposalCard: React.FC<Props> = ({ status, ...proposal }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-actions justify-between">
          <span className="badge badge-md">{status}</span>

          <div className="flex items-center justify-end gap-2">
            <ClockIcon />
            <span>{dayjs(proposal.startDate).toNow()}</span>
          </div>
        </div>
        <h2 className="card-title">Card title!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn-primary btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
};
