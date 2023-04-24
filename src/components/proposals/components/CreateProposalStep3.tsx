import { PrimaryButton, SelectInput, TextInput } from "@components/inputs";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { SpecificDatePicker } from "./SpecificDatePicker";
import {
  VoteValues,
  useFetchVotingSettings,
  useNewProposal,
} from "@daobox/use-aragon";
import { type CreateProposalDetail, type CreateProposalVoting } from "types";
import { votingPluginAddress } from "@constants/daoConfig";
import { useRouter } from "next/router";

interface Props {
  proposal: CreateProposalDetail;
  voting: CreateProposalVoting;
  onComplete?: (actions?: unknown) => void;
  onCancel?: () => void;
}

type LoadingStatuses = "loading" | "success" | "error" | "idle";
export const CreateProposalsActionStep: React.FC<Props> = ({
  onComplete,
  proposal,
  voting,
  onCancel,
}) => {
  const [submitMode, setMode] = useState<LoadingStatuses>("idle");
  const { mutate } = useNewProposal({
    pluginAddress: votingPluginAddress,
    title: proposal.title,
    summary: proposal.summary,
    description: "",
    resources: proposal.resources?.length
      ? proposal.resources?.map(({ name, link }) => ({
          name: name ?? "",
          url: link ?? "",
        }))
      : [],
    endDate: new Date(voting.end_date),
    creatorVote: Number(voting.creator_vote),
    onSuccess: (_, variables, context) => {
      console.log("Successful");
      setMode("success");
      onComplete?.(context);
    },
    onError: () => setMode("error"),
  });

  const handleCreateProposal = () => {
    setMode("loading");
    mutate();
  };

  return (
    <div className="flex w-full flex-col gap-10">
      <div>
        <h2>If option &ldquo;Yes&rdquo; wins</h2>

        <div className="border-neutral mt-4 flex w-full flex-col items-center justify-center gap-4 rounded-lg border-2 p-8">
          <h2 className="text-xl font-bold">Add Action</h2>
          <p className="max-w-md text-secondary">
            This action will execute if the vote passes. A common automatic
            action is transferring funds to a guild or person if their proposal
            passes a vote.
          </p>

          <PrimaryButton
            type="button"
            startIcon={<PlusIcon width={20} height={20} />}
          >
            Add Action
          </PrimaryButton>
        </div>
      </div>
      <div className="mt-6 flex w-full items-center justify-end gap-4">
        <PrimaryButton
          className="btn-ghost"
          type="reset"
          onClick={() => onCancel?.()}
        >
          Back
        </PrimaryButton>

        {submitMode === "loading" ? (
          <button className="loading btn-square btn"></button>
        ) : (
          <PrimaryButton
            type="button"
            onClick={() => handleCreateProposal()}
            className="text-white"
          >
            Submit
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};
