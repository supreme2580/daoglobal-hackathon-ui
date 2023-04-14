/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrimaryButton } from "@components/inputs";
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useState } from "react";

export const CreateProposalsView = () => {
  const [currentStep, setStep] = useState<1 | 2 | 3>(1);
  return (
    <React.Fragment>
      <div className="flex h-full w-full flex-1 flex-col gap-10">
        <div>
          <h1 className="text-4xl font-bold">Create Proposals</h1>
          <h4>
            Provide the information voters will need to make their decision
            here.
          </h4>
        </div>

        <div>
          <progress
            className="progress progress-primary h-4 w-full"
            value={Math.round(100 * (currentStep / 3))}
            max="100"
          ></progress>
        </div>
      </div>
    </React.Fragment>
  );
};
