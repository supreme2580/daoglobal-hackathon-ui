import React, { useState } from "react";
import {
  CreateProposalDetailsStep,
  CreateProposalVoteOptionsStep,
} from "./components";
import { type CreateProposalDetail } from "types";

export const CreateProposalsView = () => {
  const [currentStep, setStep] = useState<1 | 2>(1);
  const [proposalsDetail, setDetail] = useState<CreateProposalDetail>();

  const proceedToStep2 = (value: CreateProposalDetail) => {
    setDetail(value);
    setStep(2);
  };

  return (
    <React.Fragment>
      <div className="flex h-full w-full max-w-5xl flex-1 flex-col gap-10 px-20">
        <div>
          <h1 className="text-4xl font-bold">Create Proposals</h1>
          <h4>
            Provide the information voters will need to make their decision
            here.
          </h4>
        </div>

        <div>
          <p>Step {currentStep}/2</p>
          <progress
            className="progress progress-primary h-4 w-full"
            value={Math.round(100 * (currentStep / 2))}
            max="100"
          ></progress>
        </div>

        <div className="w-full rounded-lg border-2 border-accent px-16 py-10 shadow-lg">
          {currentStep === 1 && (
            <CreateProposalDetailsStep
              proposal={proposalsDetail}
              onComplete={proceedToStep2}
            />
          )}

          {currentStep === 2 && (
            <CreateProposalVoteOptionsStep
              proposal={proposalsDetail!}
              onCancel={() => setStep(1)}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
