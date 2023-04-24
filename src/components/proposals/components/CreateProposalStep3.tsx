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
import {
  ProposalVotingSchema,
  type CreateProposalDetail,
  VotingTypes,
} from "types";
import { zodResolver } from "@hookform/resolvers/zod";
import { votingPluginAddress } from "@constants/daoConfig";
import { useRouter } from "next/router";

interface Props {
  proposal?: CreateProposalDetail;
  votings?: any;
  onComplete?: (actions?: unknown) => void;
  onCancel?: () => void;
}

type LoadingStatuses = "loading" | "success" | "error" | "idle";
export const CreateProposalsActionStep: React.FC<Props> = ({
  onComplete,
  proposal,
  onCancel,
}) => {
  const [submitMode, setMode] = useState<LoadingStatuses>("idle");
  const router = useRouter();

  const onSubmit = (values: unknown) => {
    console.log({ values });
    onComplete?.();
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

        <PrimaryButton type="submit" className="text-white">
          Submit
        </PrimaryButton>
      </div>
    </div>
  );
};
