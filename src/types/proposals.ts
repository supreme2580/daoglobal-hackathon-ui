import { VoteValues } from "@daobox/use-aragon";
import { z } from "zod";

export const ProposalDetailSchema = z.object({
  title: z.string().min(1, { message: "Title must be provided" }),
  description: z.string().min(10, { message: "Please enter a description" }),
  summary: z.string().min(10, { message: "Provide a summary of proposal" }),
  resources: z
    .object({
      name: z.string().nonempty({ message: "Provide resource name" }),
      link: z.string().url().nonempty({ message: "Provide resource URL" }),
    })
    .array()
    .optional(),
});

export const ProposalVotingSchema = z.object({
  vote_type: z.string(),
  start_time: z.string().refine((value) => ["now", "later"].includes(value), {
    message: "Invalid option provided",
  }),
  end_date: z.string().refine((value) => ["now", "later"].includes(value), {
    message: "Invalid option provided",
  }),
  specifiedEndDate: z.number().array().min(3).max(3).optional(),
  specifiedStartDate: z.number().array().min(3).max(3).optional(),
});

export type CreateProposalDetail = z.infer<typeof ProposalDetailSchema>;
export type CreateProposalVoting = z.infer<typeof ProposalVotingSchema>;

export const defaultProposalDetailsValue = (_?: CreateProposalDetail) => {
  const data: CreateProposalDetail = {
    title: "",
    summary: "",
    description: "",
    resources: [{ name: "", link: "" }],
  };

  return data;
};
