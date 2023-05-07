import React from "react";
import { ViewProposalsTab } from "./components/ViewProposalsTab";
import { PrimaryButton } from "@components/inputs";
import { useNewOpProposal } from "@hooks/op/write";
import { type Address } from "wagmi";
import { BigNumber } from "ethers";
import { PlusSmallIcon } from "@heroicons/react/24/outline";

export const OptimisticProposalsView: React.FC = () => {
  const { write } = useNewOpProposal({
    metadata: {
      title: "Test Proposal",
      description: "All proposals must pass to qualify for our awards",
    },
    actions: [
      {
        to: "0x47d80912400ef8f8224531EBEB1ce8f2ACf4b75a" as Address,
        value: BigNumber.from(1),
        data: "0x",
      },
    ],
  });
  return (
    <React.Fragment>
      <div className="flex h-full w-full flex-1 flex-col gap-10">
        <div>
          <div className="flex items-center justify-between rounded-lg bg-[#191B1E] px-4 py-8 text-white">
            <h1 className="text-4xl font-bold">Proposals</h1>

            <PrimaryButton
              onClick={() => write?.()}
              startIcon={<PlusSmallIcon width={25} height={25} />}
              className="text-white"
            >
              <span className="flex-1">New Proposal</span>
            </PrimaryButton>
          </div>
        </div>

        <ViewProposalsTab />
      </div>
    </React.Fragment>
  );
};
