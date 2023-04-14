import {
  ProposalStatus,
  TokenType,
  TokenVotingProposal,
  TokenVotingProposalListItem,
} from "@daobox/use-aragon";

export type Proposal = Omit<
  TokenVotingProposalListItem,
  "totalVotingWeight" | "votes" | "settings" | "result"
>;

export const MockProposals: Proposal[] = [
  {
    id: "0x12345...",
    dao: {
      address: "0x1234567890123456789012345678901234567890",
      name: "Cool DAO",
    },
    creatorAddress: "0x1234567890123456789012345678901234567890",
    metadata: {
      title: "Test Proposal",
      summary: "Test Proposal Summary",
    },
    startDate: new Date(new Date().getTime() - 240000),
    endDate: new Date(),
    status: ProposalStatus.EXECUTED,
    token: {
      address: "0x1234567890123456789012345678901234567890",
      name: "The Token",
      symbol: "TOK",
      type: TokenType.ERC20,
      decimals: 18,
    },
  },
  {
    id: "0x12345...",
    dao: {
      address: "0x1234567890123456789012345678901234567890",
      name: "Cool DAO",
    },
    creatorAddress: "0x1234567890123456789012345678901234567890",
    metadata: {
      title: "Test Proposal 2",
      summary: "Test Proposal Summary 2",
    },
    startDate: new Date(new Date().getTime() - 210000),
    endDate: new Date(),
    status: ProposalStatus.PENDING,
    token: {
      address: "0x1234567890123456789012345678901234567890",
      type: TokenType.ERC20,
      name: "The Token",
      symbol: "TOK",
      decimals: 18,
    },
  },
];
