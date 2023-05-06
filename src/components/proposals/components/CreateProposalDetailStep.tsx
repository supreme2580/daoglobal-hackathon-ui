/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { PrimaryButton, TextArea, TextInput } from "@components/inputs";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
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

export const CreateProposalDetailsStep: React.FC<Props> = ({ onComplete, proposal, onCancel }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultProposalDetailsValue(proposal),
    resolver: zodResolver(ProposalDetailSchema),
    reValidateMode: "onBlur",
  });

  const addResourcetoForm = () => {
    const resources = watch("resources");
    const id = (resources?.length ?? 0) + 1;
    const new_resources = resources?.length
      ? [...resources, { name: "", link: "", id }]
      : [{ name: "", link: "", id }];
    setValue("resources", new_resources);
  };

  const removeResourceFromForm = (index: number) => {
    const resources = watch("resources");
    const new_resources = resources?.filter(({ id }) => id !== index);
    setValue("resources", new_resources);
  };

  const onSubmit = (values: CreateProposalDetail) => {
    console.log({ values });
    onComplete(values);
  };

  return (
    <form className="flex w-full flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
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
          <p className="text-sm text-primary">Share external Resources here</p>
        </div>

        {watch("resources")?.length
          ? watch("resources")?.map(({ id }, index) => (
              <div key={id} className="mt-5 flex items-end justify-stretch gap-5">
                <TextInput
                  name={`resources[${index}].name`}
                  placeholder="Type here"
                  register={register}
                  label="Name / Description"
                  hasError={errors.resources?.[index]?.message ?? ""}
                />
                <TextInput
                  label="Link"
                  placeholder="Type here"
                  name={`resources[${index}].link`}
                  register={register}
                  hasError={errors.resources?.[index]?.message ?? ""}
                  type="url"
                />
                <button
                  onClick={() => removeResourceFromForm(id!)}
                  type="button"
                  className="btn-ghost btn-square btn text-error"
                >
                  <XMarkIcon width={24} height={24} />
                </button>
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
        <PrimaryButton className="btn-ghost" type="reset" onClick={() => onCancel?.()}>
          Cancel
        </PrimaryButton>

        <PrimaryButton type="submit" className="text-white">
          Continue
        </PrimaryButton>
      </div>
    </form>
  );
};
