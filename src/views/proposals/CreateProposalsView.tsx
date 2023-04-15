/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrimaryButton } from "@components/inputs";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useState } from "react";

export const CreateProposalsView = () => {
  const [currentStep, setStep] = useState<1 | 2 | 3>(1);
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
          <p>Step {currentStep}3</p>
          <progress
            className="progress progress-primary h-4 w-full"
            value={Math.round(100 * (currentStep / 3))}
            max="100"
          ></progress>
        </div>

        <div className="flex w-full flex-col gap-10 rounded-lg border-2 border-accent px-16 py-10 shadow-lg">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Title</span>
            </label>
            <input
              type="text"
              placeholder="Give your proposal a title"
              className="input-bordered input-accent input w-full"
            />
            {false && (
              <label className="label">
                <span className="label-text-alt">Bottom Left label</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Description</span>
            </label>
            <textarea
              className="textarea-bordered textarea-accent textarea h-24"
              placeholder="Describe your proposal in 2 - 3 sentences. This will appear in the proposal overview"
            ></textarea>
            {false && (
              <label className="label">
                <span className="label-text-alt">Your bio</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Body</span>
            </label>
            <textarea
              className="textarea-bordered textarea-accent textarea h-24"
              placeholder="Write the body of your proposal here"
            ></textarea>
            {false && (
              <label className="label">
                <span className="label-text-alt">Your bio</span>
              </label>
            )}
          </div>

          <div className="w-full">
            <div>
              <h3 className="text-xl font-bold">Resources</h3>
              <p className="text-sm text-secondary">
                Share external Resources here
              </p>
            </div>

            <div className="mt-5 flex items-center justify-stretch gap-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">
                    Name / Description
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input-bordered input-accent input w-full"
                />
                {false && (
                  <label className="label">
                    <span className="label-text-alt">Bottom Left label</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Link</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input-bordered input-accent input w-full"
                />
                {false && (
                  <label className="label">
                    <span className="label-text-alt">Bottom Left label</span>
                  </label>
                )}
              </div>
            </div>

            <PrimaryButton
              className="mt-4"
              startIcon={<PlusIcon width={24} height={24} />}
            >
              Add Resources
            </PrimaryButton>
          </div>

          <div className="mt-6 flex w-full items-center justify-between">
            <PrimaryButton
              className="btn-outline"
              startIcon={<ChevronLeftIcon width={20} height={20} />}
            >
              Back
            </PrimaryButton>

            <PrimaryButton
              endIcon={<ChevronRightIcon width={20} height={20} />}
            >
              Next
            </PrimaryButton>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
