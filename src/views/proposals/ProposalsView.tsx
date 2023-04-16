/* eslint-disable @typescript-eslint/no-misused-promises */
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { ProposalsTab } from "./components/ProposalsTab";
import { PrimaryButton } from "@components/inputs";
import React from "react";
import { useRouter } from "next/router";

export const ProposalsView: React.FC = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <div className="flex h-full w-full flex-1 flex-col gap-10">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Proposals</h1>

            <PrimaryButton
              onClick={() => router.push("/proposals/create")}
              startIcon={<PlusSmallIcon width={25} height={25} />}
            >
              <span className="flex-1">New Proposal</span>
            </PrimaryButton>
          </div>
        </div>

        <ProposalsTab />
      </div>
    </React.Fragment>
  );
};
