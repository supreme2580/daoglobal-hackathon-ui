import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, useCallback } from "react";
import {
  useFetchDao,
  useFetchDaos,
  useFetchProposals,
  useFetchMembers,
  useFetchVotingSettings,
  useFetchProposal,
  ProposalStatus,
} from "@daobox/use-aragon";
import { capitalize } from "lodash";
import { daoAddressOrEns } from "@constants/daoConfig";
import { MockProposals, Proposal } from "@constants/mocks/MockProposals";
import { ProposalCard } from "./ProposalCard";

const TabStates = [
  ProposalStatus.PENDING,
  ProposalStatus.ACTIVE,
  ProposalStatus.SUCCEEDED,
  ProposalStatus.EXECUTED,
  ProposalStatus.DEFEATED,
];

export const ProposalsTab = () => {
  const proposals = useCallback((status: ProposalStatus | "All") => {
    if (status === "All") {
      return MockProposals;
    } else {
      const filteredProposals = MockProposals.filter(
        ({ status: pStat }) => status === pStat
      );
      return filteredProposals;
    }
  }, []);

  return (
    <Tab.Group>
      <Tab.List>
        {["All", ...TabStates].map((tab, tabIndex) => (
          <Tab as={Fragment} key={tab}>
            {({ selected }) => {
              return (
                <button
                  className={classNames(
                    "btn rounded-none border-0 bg-transparent px-4 py-1 text-neutral hover:bg-transparent focus:outline-none",
                    selected && "rounded-2 border-b-2 bg-white",
                    tabIndex > 0 && "ml-3"
                  )}
                >
                  {tab}
                </button>
              );
            }}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {["All", ...TabStates].map((tab) => (
          <Tab.Panel key={tab}>
            {proposals(tab as ProposalStatus | "All").map((proposal) => (
              <ProposalCard key={proposal.id} {...proposal} />
            ))}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
