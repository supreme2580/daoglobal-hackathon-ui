import { z } from "zod";

export enum VotingTypes {
  Token_Voting = "Token_Voting",
  Optimistic_Proposal = "Optimistic_Proposal",
}

export const ProposalDetailSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title must be provided" })
    .min(1, { message: "Title provided is too short" }),
  // description: z
  //   .string()
  //   .min(0, { message: "Please enter a description" })
  //   .optional(),
  summary: z
    .string()
    .nonempty({ message: "Title must be provided" })
    .min(10, { message: "Proposal description is too short." }),
  resources: z
    .object({
      id: z.number().min(1).optional().or(z.literal(undefined)),
      name: z.string().min(0).optional().or(z.literal("")),
      link: z.string().min(0).url().optional().or(z.literal("")),
    })
    // .refine(({ name, link }) => !!name && !!link, {
    //   message: "Must provide corresponding link for name",
    // })
    .array()
    .min(0)
    .optional(),
});

export const ProposalVotingSchema = z
  .object({
    vote_type: z
      .enum([VotingTypes.Optimistic_Proposal, VotingTypes.Token_Voting, "null"])
      .refine((vote) => !!vote && vote !== "null", { message: "Invalid voting type" }),
    creator_vote: z.enum(["1", "2", "3", "null"]).optional(),
    start_date: z.string().optional(),
    end_date: z.string().nonempty({ message: "End date must be provided" }),
    voteDuration: z.number().min(1000, { message: "Vote duration is too small" }),
  })
  .refine(
    ({ voteDuration, end_date }) => {
      const end = new Date(end_date).getTime();
      const now = new Date().getTime();

      return end - now > voteDuration * 1000;
    },
    ({ voteDuration }) => {
      const duration = Math.round(voteDuration / (24 * 60 * 60));
      return {
        message: `Minimum voting duration not met. Minimum is ${duration} ${
          duration > 1 ? "days" : "day"
        }`,
        path: ["end_date"],
      };
    }
  );

export type CreateProposalDetail = z.infer<typeof ProposalDetailSchema>;
export type CreateProposalVoting = z.infer<typeof ProposalVotingSchema>;

export const defaultProposalDetailsValue = (options?: CreateProposalDetail) => {
  const data: CreateProposalDetail = {
    title: "",
    summary: "",
    resources: [],
  };

  if (options) {
    data["title"] = options.title;
    data["summary"] = options.summary;
    data["resources"] = options.resources;
  }

  return data;
};

export const defaultProposalVotingValues = (
  options?: CreateProposalVoting,
  minDuration?: number
) => {
  const data: CreateProposalVoting = {
    vote_type: "null",
    creator_vote: "null" as unknown as undefined,
    end_date: new Date().toDateString(),
    start_date: new Date().toDateString(),
    voteDuration: minDuration ?? 86400,
  };

  if (options) {
    data["vote_type"] = options.vote_type;
    data["creator_vote"] = options.creator_vote;
    data["end_date"] = options.end_date.toString();
  }

  return data;
};
