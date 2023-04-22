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
  SortDirection,
} from "@daobox/use-aragon";
import { capitalize } from "lodash";
import { daoAddressOrEns } from "@constants/daoConfig";
import { ProposalCard } from "./ProposalCard";

const TabStates = [
  ProposalStatus.PENDING,
  ProposalStatus.ACTIVE,
  ProposalStatus.SUCCEEDED,
  ProposalStatus.EXECUTED,
  ProposalStatus.DEFEATED,
];

export const ProposalsTab = () => {
  const { data, isLoading } = useFetchProposals({
    daoAddressOrEns,
    direction: SortDirection.DESC,
  });

  const proposals = useCallback(
    (status: ProposalStatus | "All") => {
      if (data) {
        if (status === "All") {
          return data;
        } else {
          const filteredProposals = data.filter(
            ({ status: pStat }) => status === pStat
          );
          return filteredProposals;
        }
      }
    },
    [data]
  );

  if (isLoading) {
    return (
      <div className="centered">
        <button className="loading btn-square btn"></button>
      </div>
    );
  }

  return (
    <Tab.Group>
      <Tab.List className="col-span-1">
        {["All", ...TabStates].map((tab, tabIndex) => (
          <Tab as={Fragment} key={tab}>
            {({ selected }) => {
              return (
                <button
                  className={classNames(
                    "btn rounded-none border-0 bg-transparent px-4 py-1 hover:border-success hover:bg-transparent focus:outline-none",
                    selected &&
                      "rounded-2 border-b-2 border-success text-success",
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
        {["All", ...TabStates].map((tab) => {
          const filteredProposals = proposals(tab as ProposalStatus | "All");

          return (
            <Tab.Panel key={tab} className="grid grid-cols-1 gap-4">
              {filteredProposals?.length ? (
                filteredProposals.map((proposal) => (
                  <ProposalCard key={proposal.id} {...proposal} />
                ))
              ) : (
                <p key={tab}>No {tab === "All" ? "" : tab} Proposals</p>
              )}
            </Tab.Panel>
          );
        })}
      </Tab.Panels>
    </Tab.Group>
  );
};
