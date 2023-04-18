import { PrimaryButton, SelectInput } from "@components/inputs";
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
  onComplete?: () => void;
  onCancel?: () => void;
}

export const CreateProposalVoteOptionsStep: React.FC<Props> = ({
  onComplete,
  proposal,
  onCancel,
}) => {
  const router = useRouter();
  const [isEndTimeNow, setEndTime] = useState(true);
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
      voteDuration: data?.minDuration ?? 86400,
    },
    resolver: zodResolver(ProposalVotingSchema),
  });
  const { mutate } = useNewProposal({
    pluginAddress: votingPluginAddress,
    title: proposal.title,
    summary: proposal.summary,
    description: proposal.description,
    resources: proposal.resources?.length
      ? proposal.resources?.map(({ name, link }) => ({
          name: name ?? "",
          url: link ?? "",
        }))
      : [],
    endDate: watch("end_date"),
    creatorVote: Number(watch("creator_vote")),
    onSuccess: () => {
      router.back();
      onComplete?.();
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
        label="Options"
      >
        <option disabled value="null">
          Select an option
        </option>
        <option value={VotingTypes.Token_Voting}>Token Voting</option>
        <option value={VotingTypes.Optimistic_Proposal} disabled>
          Optimistic Voting
        </option>
      </SelectInput>

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
          <div className="form-control flex-1 rounded-lg border-2 border-accent p-2">
            <label className="label cursor-pointer">
              <span className="label-text">Specified date & time</span>
              <input
                type="radio"
                checked={!isEndTimeNow}
                onChange={() => setEndTime(false)}
                className="radio-accent radio checked:bg-blue-500"
                value="later"
              />
            </label>
          </div>

          {!isEndTimeNow && (
            <SpecificDatePicker
              onValueChange={(value: Date) => setValue("end_date", value)}
            />
          )}

          {errors.end_date?.message ? (
            <div className="label-alt-text text-error">
              {errors.end_date.message}
            </div>
          ) : null}
        </div>
      </div>

      <SelectInput
        name="creator_vote"
        hasError={errors.creator_vote?.message}
        register={register}
        label="Options"
      >
        <option disabled value="null">
          Select an option
        </option>
        <option value={VoteValues.YES}>Yes</option>
        <option value={VoteValues.NO}>No</option>
        <option value={VoteValues.ABSTAIN}>Abstain</option>
      </SelectInput>

      <div className="mt-6 flex w-full items-center justify-between">
        <PrimaryButton
          className="btn-outline"
          type="reset"
          onClick={() => onCancel?.()}
          startIcon={<ChevronLeftIcon width={20} height={20} />}
        >
          Back
        </PrimaryButton>

        <PrimaryButton
          type="submit"
          // disabled={!isValid}
          endIcon={<ChevronRightIcon width={20} height={20} />}
        >
          Next
        </PrimaryButton>
      </div>
    </form>
  );
};
