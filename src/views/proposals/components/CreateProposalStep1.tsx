import { PrimaryButton, TextArea, TextInput } from "@components/inputs";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  onComplete: () => void;
  onCancel?: () => void;
}

export const CreateProposalDetailsStep: React.FC<Props> = ({
  onComplete,
  onCancel,
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (values: unknown) => {
    console.log({ values });
    onComplete();
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
        placeholder="Give your proposal a title"
      />
      <TextArea
        label="Description"
        name="description"
        register={register}
        placeholder="Describe your proposal in 2 - 3 sentences. This will appear in the proposal overview"
      />
      <TextArea
        name="body"
        label="Body"
        register={register}
        placeholder="Write the body of your proposal here"
      />

      <div className="w-full">
        <div>
          <h3 className="text-xl font-bold">Resources</h3>
          <p className="text-sm text-secondary">
            Share external Resources here
          </p>
        </div>

        <div className="mt-5 flex items-center justify-stretch gap-5">
          <TextInput
            name="resources[0].name"
            placeholder="Type here"
            register={register}
            label="Name / Description"
          />
          <TextInput
            label="Link"
            placeholder="Type here"
            name="resources[0].link"
            register={register}
            type="url"
          />
        </div>

        <PrimaryButton
          className="mt-5"
          type="button"
          startIcon={<PlusIcon width={24} height={24} />}
        >
          Add Resources
        </PrimaryButton>
      </div>

      <div className="mt-6 flex w-full items-center justify-between">
        <PrimaryButton
          className="btn-outline"
          type="reset"
          onClick={() => onCancel?.()}
          startIcon={<XMarkIcon width={20} height={20} />}
        >
          Cancel
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
