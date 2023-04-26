/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { PrimaryButton, TextArea, TextInput } from "@components/inputs";
import {
  PlusIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  type CreateProposalDetail,
  defaultProposalDetailsValue,
  ProposalDetailSchema,
} from "types";

interface Props {
  onComplete: (value: CreateProposalDetail) => void;
  proposal?: CreateProposalDetail;
  onCancel?: () => void;
}

export const CreateProposalDetailsStep: React.FC<Props> = ({
  onComplete,
  proposal,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: defaultProposalDetailsValue(proposal),
    resolver: zodResolver(ProposalDetailSchema),
  });

  const addResourcetoForm = () => {
    const resources = watch("resources");
    const new_resources = resources?.length
      ? [...resources, { name: "", link: "" }]
      : [{ name: "", link: "" }];
    setValue("resources", new_resources);
  };

  const onSubmit = (values: CreateProposalDetail) => {
    console.log({ values });
    onComplete(values);
  };

  return (
    <form
      className="flex w-full flex-col gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="Title"
        name="title"
        register={register}
        hasError={errors.title?.message?.toString()}
        placeholder="Give your proposal a title"
      />
      <TextArea
        name="summary"
        label="Body"
        register={register}
        hasError={errors.summary?.message?.toString()}
        placeholder="Write the body of your proposal here"
      />

      <div className="w-full">
        <div>
          <h3 className="text-xl font-bold">Resources</h3>
          <p className="text-sm text-primary">
            Share external Resources here
          </p>
        </div>

        {watch("resources")?.length
          ? watch("resources")?.map((_, index) => (
              <div
                key={index}
                className="mt-5 flex items-center justify-stretch gap-5"
              >
                <TextInput
                  name={`resources[${index}].name`}
                  placeholder="Type here"
                  register={register}
                  label="Name / Description"
                  hasError={errors.resources?.[index]?.name?.message ?? ""}
                />
                <TextInput
                  label="Link"
                  placeholder="Type here"
                  name={`resources[${index}].link`}
                  register={register}
                  hasError={errors.resources?.[index]?.link?.message ?? ""}
                  type="url"
                />
              </div>
            ))
          : null}

        <PrimaryButton
          className="mt-5"
          type="button"
          onClick={() => addResourcetoForm()}
          startIcon={<PlusIcon width={24} height={24} />}
        >
          Add Resources
        </PrimaryButton>
      </div>

      <div className="mt-6 flex w-full items-center justify-end gap-4">
        <PrimaryButton
          className="btn-ghost"
          type="reset"
          onClick={() => onCancel?.()}
        >
          Cancel
        </PrimaryButton>

        <PrimaryButton type="submit" className="text-white" disabled={!isValid}>
          Continue
        </PrimaryButton>
      </div>
    </form>
  );
};
