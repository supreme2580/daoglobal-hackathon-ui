import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { ProposalsTab } from "./ProposalsTab";
import { PrimaryButton } from "@components/buttons";
import React from "react";

export const ProposalsView: React.FC = () => {
  return (
    <React.Fragment>
      <div className="flex h-full w-full flex-1 flex-col gap-20">
        <div className="card w-full border-2 bg-base-100 shadow-xl ">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold">Proposals</h1>

              <PrimaryButton
                startIcon={<PlusSmallIcon width={25} height={25} />}
              >
                <span className="flex-1">New Proposal</span>
              </PrimaryButton>
            </div>
          </div>
        </div>

        <ProposalsTab />
      </div>
    </React.Fragment>
  );
};
