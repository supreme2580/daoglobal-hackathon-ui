import {
  PrimaryButton,
  SelectInput,
  TextArea,
  TextInput,
} from "@components/inputs";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";

interface Props {
  onComplete: () => void;
  onCancel?: () => void;
}

export const CreateProposalVoteOptionsStep: React.FC<Props> = ({
  onComplete,
  onCancel,
}) => {
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      end_date: "now",
      vote_type: "null",
      start_time: "now",
    },
  });

  const [endDate, startDate] = watch(["end_date", "start_time"]) as string[];

  const onSubmit = (values: unknown) => {
    console.log({ values });
    onComplete();
  };

  console.log({ endDate: watch("end_date"), startDate });

  return (
    <form
      className="flex w-full flex-col gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <SelectInput name="vote_type" register={register} label="Options">
        <option disabled value="null">
          Select an option
        </option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="Abstain">Abstain</option>
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
            <div>
              <div>Minutes</div>
              <div>Hours</div>
              <div>Days</div>
            </div>
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

        <div className="mt-5  grid grid-cols-2  items-center justify-stretch gap-5">
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
            <div className="col-span-2 flex items-center justify-evenly gap-3 rounded-lg border-2 border-accent p-5">
              <div className="flex-1 rounded-lg border-2 border-accent p-3">
                <label className="label">
                  <span className="label-text">Minutes</span>
                </label>
                <div className="flex  items-center justify-evenly gap-2">
                  <button type="button">
                    <PlusSmallIcon width={16} height={16} />
                  </button>
                  <div className="form-control w-full max-w-xs">
                    <input
                      type="text"
                      placeholder="0"
                      className="input w-full max-w-xs"
                    />
                  </div>
                  <button type="button">
                    <MinusSmallIcon width={16} height={16} />
                  </button>
                </div>
              </div>
              <div className="flex-1 rounded-lg  border-2 border-accent p-3">
                <label className="label">
                  <span className="label-text">Hours</span>
                </label>
                <div className="flex items-center justify-evenly gap-2">
                  <button type="button">
                    <PlusSmallIcon width={16} height={16} />
                  </button>
                  <div className="form-control w-full max-w-xs">
                    <input
                      type="text"
                      placeholder="0"
                      className="input input w-full max-w-xs"
                    />
                  </div>
                  <button type="button">
                    <MinusSmallIcon width={16} height={16} />
                  </button>
                </div>
              </div>
              <div className="flex-1 rounded-lg border-2 border-accent p-3">
                <label className="label">
                  <span className="label-text">Days</span>
                </label>
                <div className="flex items-center justify-evenly gap-2">
                  <button type="button">
                    <PlusSmallIcon width={16} height={16} />
                  </button>
                  <div className="form-control w-full max-w-xs">
                    <input
                      type="text"
                      placeholder="0"
                      className="input input w-full max-w-xs"
                    />
                  </div>
                  <button type="button">
                    <MinusSmallIcon width={16} height={16} />
                  </button>
                </div>
              </div>
            </div>
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
          endIcon={<ChevronRightIcon width={20} height={20} />}
        >
          Next
        </PrimaryButton>
      </div>
    </form>
  );
};
