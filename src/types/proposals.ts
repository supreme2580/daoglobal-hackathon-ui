import { VoteValues } from "@daobox/use-aragon";
import { z } from "zod";

export const ProposalDetailSchema = z.object({
  title: z.string().min(1, { message: "Title must be provided" }),
  // description: z
  //   .string()
  //   .min(0, { message: "Please enter a description" })
  //   .optional(),
  summary: z.string().min(10, { message: "Provide a summary of proposal" }),
  resources: z
    .object({
      name: z.string().optional(),
      link: z.string().url().optional(),
    })
    .array()
    .min(0)
    .optional(),
});

export const ProposalVotingSchema = z
  .object({
    vote_type: z.string(),
    creator_vote: z.string(),
    end_date: z.date(),
    voteDuration: z
      .number()
      .min(1000, { message: "Vote duration is too small" }),
  })
  .refine(
    ({ voteDuration, end_date }) => {
      const end = new Date(end_date).getTime();
      const now = new Date().getTime();

      return end - now > voteDuration * 1000;
    },
    {
      message: "End date must be more than 24 hours",
    }
  );

export type CreateProposalDetail = z.infer<typeof ProposalDetailSchema>;
export type CreateProposalVoting = z.infer<typeof ProposalVotingSchema>;

export const defaultProposalDetailsValue = (_?: CreateProposalDetail) => {
  const data: CreateProposalDetail = {
    title: "",
    summary: "",
    // description: "",
    resources: [
      {
        name: "",
        link: "",
      },
    ],
  };

  return data;
};

export enum VotingTypes {
  Token_Voting = "Token_Voting",
  Optimistic_Proposal = "Optimistic_Proposal",
}
