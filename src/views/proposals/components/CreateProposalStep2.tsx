import { PrimaryButton, SelectInput } from "@components/inputs";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { SpecificDatePicker } from "./SpecificDatePicker";
import { VoteValues, useNewProposal } from "@daobox/use-aragon";
import { ProposalVotingSchema, type CreateProposalDetail } from "types";
import { zodResolver } from "@hookform/resolvers/zod";
import { votingPluginAddress } from "@constants/daoConfig";

interface Props {
  proposal: CreateProposalDetail;
  onComplete?: () => void;
  onCancel?: () => void;
}

function convertTupletoDate(data: number[]): Date {
  if (data.length !== 3) {
    return new Date();
  }
  return new Date(
    data
      .map((time, index) =>
        index === 0
          ? time * 60
          : index === 1
          ? time * 60 * 60
          : time * 24 * 60 * 60
      )
      .reduce((acc, curr) => acc + curr, 0)
  );
}

export const CreateProposalVoteOptionsStep: React.FC<Props> = ({
  onComplete,
  proposal,
  onCancel,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      end_date: "now",
      vote_type: undefined,
      start_time: "now",
      specifiedEndDate: [0, 0, 0],
      specifiedStartDate: [0, 0, 0],
    },
    resolver: zodResolver(ProposalVotingSchema),
  });
  const { mutate } = useNewProposal({
    pluginAddress: votingPluginAddress,
    title: proposal.title,
    summary: proposal.summary,
    description: proposal.description,
    resources:
      proposal.resources?.map(({ name, link }) => ({ name, url: link })) ?? [],
    endDate: watch("end_date")
      ? new Date()
      : convertTupletoDate(watch("specifiedEndDate")),
    startDate:
      watch("start_time") === "now"
        ? new Date()
        : convertTupletoDate(watch("specifiedStartDate")),
    creatorVote: watch("vote_type"),
  });

  const onSubmit = (values: unknown) => {
    console.log({ values });
    mutate?.();
    onComplete?.();
  };
  console.log({ voteType: watch("vote_type") });

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
        <option value={VoteValues.YES}>Yes</option>
        <option value={VoteValues.NO}>No</option>
        <option value={VoteValues.ABSTAIN}>Abstain</option>
      </SelectInput>

      <div className="w-full">
        <div>
          <h3 className="text-xl font-bold">Start time</h3>
          <p className="text-sm text-secondary">
            Define when a proposal should be active to receive approvals. If now
            is selected, the proposal is immediately active after publishing.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 items-center justify-stretch gap-5">
          <div className="form-control col-span-1 rounded-lg border-2 border-accent p-2">
            <label className="label cursor-pointer">
              <span className="label-text">Now</span>
              <input
                type="radio"
                {...register("start_time")}
                className="radio-accent radio checked:bg-red-500"
                value="now"
              />
            </label>
          </div>
          <div className="form-control col-span-1  flex-1 rounded-lg border-2 border-accent p-2">
            <label className="label cursor-pointer">
              <span className="label-text">Specified date & time</span>
              <input
                type="radio"
                {...register("start_time")}
                className="radio-accent radio checked:bg-blue-500"
                value="later"
              />
            </label>
          </div>

          {watch("start_time") === "later" && (
            <SpecificDatePicker
              onValueChange={(value: [number, number, number]) =>
                setValue("specifiedStartDate", value)
              }
            />
          )}
        </div>
      </div>

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
                {...register("end_date")}
                className="radio-accent radio checked:bg-red-500"
                value="now"
              />
            </label>
          </div>
          <div className="form-control flex-1 rounded-lg border-2 border-accent p-2">
            <label className="label cursor-pointer">
              <span className="label-text">Specified date & time</span>
              <input
                type="radio"
                {...register("end_date")}
                className="radio-accent radio checked:bg-blue-500"
                value="later"
              />
            </label>
          </div>

          {watch("end_date") === "later" && (
            <SpecificDatePicker
              onValueChange={(value: [number, number, number]) =>
                setValue("specifiedEndDate", value)
              }
            />
          )}
        </div>
      </div>

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
