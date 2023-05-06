import { PrimaryButton, SelectInput, TextInput } from "@components/inputs";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { VoteValues, useFetchVotingSettings, useNewProposal } from "@daobox/use-aragon";
import {
  ProposalVotingSchema,
  type CreateProposalDetail,
  VotingTypes,
  CreateProposalVoting,
  defaultProposalVotingValues,
} from "types";
import { zodResolver } from "@hookform/resolvers/zod";
import { lensVotingAddress } from "@constants/daoConfig";

interface Props {
  proposal?: CreateProposalDetail;
  onComplete?: (data: CreateProposalVoting) => void;
  onCancel?: () => void;
}

export const CreateProposalVoteOptionsStep: React.FC<Props> = ({ onComplete, onCancel }) => {
  const [isEndTimeNow, setEndTime] = useState(true);
  const { data } = useFetchVotingSettings({
    pluginAddress: lensVotingAddress,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultProposalVotingValues(undefined, data?.minDuration),
    resolver: zodResolver(ProposalVotingSchema),
  });

  const onSubmit = (values: CreateProposalVoting) => {
    console.log({ values });
    onComplete?.(values);
  };

  return (
    <form className="flex w-full flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
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

      <div className="w-full">
        <div>
          <h3 className="text-xl font-bold">End date</h3>
          <p className="text-sm text-secondary">
            Define how long the voting should last in days, or add an exact date and time for it to
            conclude.
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
        <PrimaryButton className="btn-ghost" type="reset" onClick={() => onCancel?.()}>
          Back
        </PrimaryButton>

        <PrimaryButton type="submit" className="text-white">
          Continue
        </PrimaryButton>
      </div>
    </form>
  );
};
