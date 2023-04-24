import { PrimaryButton, SelectInput, TextInput } from "@components/inputs";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
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
  proposal: CreateProposalDetail;
  onComplete?: (data?: any) => void;
  onCancel?: () => void;
}

export const CreateProposalVoteOptionsStep: React.FC<Props> = ({
  onComplete,
  proposal,
  onCancel,
}) => {
  const [isEndTimeNow, setEndTime] = useState(true);
  const [isStartTimeNow, setStartTime] = useState(true);
  const { data } = useFetchVotingSettings({
    pluginAddress: votingPluginAddress,
  });
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      vote_type: undefined,
      creator_vote: undefined,
      end_date: new Date(),
      start_time: "" as string | Date,
      voteDuration: data?.minDuration ?? 86400,
    },
    // resolver: zodResolver(ProposalVotingSchema),
  });
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
    endDate: watch("end_date"),
    creatorVote: Number(watch("creator_vote")),
    onSuccess: (_, variables, context) => {
      console.log("Successful");
      onComplete?.(context);
    },
  });

  const onSubmit = (values: unknown) => {
    console.log({ values });
    mutate?.();
  };

  return (
    <form
      className="flex w-full flex-col gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <SelectInput
        name="vote_type"
        hasError={errors.vote_type?.message}
        register={register}
        label="Vote Type"
      >
        <option disabled value="null">
          Select an option
        </option>
        <option value={VotingTypes.Token_Voting}>Token Voting</option>
        <option value={VotingTypes.Optimistic_Proposal} disabled>
          Optimistic Voting
        </option>
      </SelectInput>

      {/* <div className="w-full">
        <div>
          <h3 className="text-xl font-bold">Start Time</h3>
          <p className="text-sm text-secondary">
            Define when a proposal should be active to receive approvals. If now
            is selected, the proposal is immediately active after publishing.
          </p>
        </div>

        <div className="mt-5  grid grid-cols-2 items-stretch justify-stretch gap-5">
          <div className="form-control flex-1 rounded-lg border-2 border-accent p-2">
            <label className="label cursor-pointer">
              <span className="label-text">Now</span>
              <input
                type="radio"
                checked={isStartTimeNow}
                onChange={() => setStartTime(true)}
                className="radio-accent radio checked:bg-blue-500"
                value="now"
              />
            </label>
          </div>
          <div className="form-control flex-1 flex-col items-center justify-center rounded-lg border-2 border-accent p-2">
            <TextInput
              label=""
              type="datetime-local"
              register={register}
              className="border-none outline-none focus:shadow-transparent focus:outline-none"
              name="start_time"
              hasError={errors.start_time?.message}
              onBlur={() => setStartTime(false)}
              placeholder="Specified date & time"
            />
          </div>
        </div>
      </div> */}

      <div className="w-full">
        <div>
          <h3 className="text-xl font-bold">End date</h3>
          <p className="text-sm text-secondary">
            Define how long the voting should last in days, or add an exact date
            and time for it to conclude.
          </p>
        </div>

        <div className="mt-5  grid grid-cols-2 items-center justify-stretch gap-5">
          <div className="form-control flex-1 rounded-lg border-2 border-accent p-2">
            <label className="label cursor-pointer">
              <span className="label-text">Now</span>
              <input
                type="radio"
                checked={isEndTimeNow}
                onChange={() => setEndTime(true)}
                className="radio-accent radio checked:bg-blue-500"
                value="now"
              />
            </label>
          </div>
          <div className="form-control flex-1 flex-col items-center justify-center rounded-lg border-2 border-accent p-2">
            <TextInput
              label=""
              type="datetime-local"
              register={register}
              className="border-none shadow-transparent outline-none focus:shadow-transparent focus:outline-none"
              name="end_date"
              hasError={errors.end_date?.message}
              onBlur={() => setEndTime(false)}
              placeholder="Specified date & time"
            />
          </div>
        </div>
      </div>

      <SelectInput
        name="creator_vote"
        hasError={errors.creator_vote?.message}
        register={register}
        label="Creator's Vote"
      >
        <option disabled value="null">
          Select an option
        </option>
        <option value={VoteValues.YES}>Yes</option>
        <option value={VoteValues.NO}>No</option>
        <option value={VoteValues.ABSTAIN}>Abstain</option>
      </SelectInput>

      <div className="mt-6 flex w-full items-center justify-end gap-4">
        <PrimaryButton
          className="btn-ghost"
          type="reset"
          onClick={() => onCancel?.()}
        >
          Back
        </PrimaryButton>

        <PrimaryButton type="submit" className="text-white">
          Continue
        </PrimaryButton>
      </div>
    </form>
  );
};
