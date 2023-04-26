/* eslint-disable @typescript-eslint/no-misused-promises */
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { ProposalsTab } from "./components/ProposalsTab";
import { PrimaryButton } from "@components/inputs";
import React from "react";
import { useRouter } from "next/router";
import { useFetchMembers } from "@daobox/use-aragon";
import { votingPluginAddress } from "@constants/daoConfig";
import { CreateProposalsView } from "./CreateProposalsView";

export const ProposalsView: React.FC = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <div className="flex h-full w-full flex-1 flex-col gap-10">
        <div>
          <div className="flex items-center justify-between rounded-lg bg-black px-4 py-8 text-white">
            <h1 className="text-4xl font-bold">Proposals</h1>

            <CreateProposalsView />
          </div>
        </div>

        <ProposalsTab />
      </div>
    </React.Fragment>
  );
};
