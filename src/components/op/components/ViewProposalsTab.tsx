import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, useCallback } from "react";
import { useFetchProposals, ProposalStatus, SortDirection } from "@daobox/use-aragon";
import { daoAddressOrEns } from "@constants/daoConfig";
import { useOpProposals } from "@hooks/op/read";
import { OPProposalStatus, ProposalDetails } from "types";
import { useCancelProposal } from "@hooks/op/write/useCancelProposal";
import { useChallengeProposal } from "@hooks/op/write";
import { useExecuteProposal } from "@hooks/op/write/useExecuteProposal";
import { ProposalCard } from "./ProposalCard";

export const TabStates = [
  { id: OPProposalStatus.Active, title: "Active" },
  { id: OPProposalStatus.Cancelled, title: "Cancelled" },
  { id: OPProposalStatus.Executed, title: "Executed" },
  { id: OPProposalStatus.Paused, title: "Paused" },
  { id: OPProposalStatus.RuledAllowed, title: "Ruled Allowed" },
  { id: OPProposalStatus.RuledRejected, title: "Ruled Rejected" },
];

export const ViewProposalsTab = () => {
  const page = 1;
  const { proposals: propoData } = useOpProposals({
    perPage: 10,
  });
  console.log({ propoData });

  const proposals = useCallback(
    (status: OPProposalStatus | 0) => {
      if (propoData?.[0]?.length) {
        if (status === 0) {
          return propoData[0];
        } else {
          const details = propoData[0] as ProposalDetails[];
          const filteredProposals = details.filter(({ status: pStat }) => status === pStat);
          return filteredProposals;
        }
      }
    },
    [propoData]
  );

  return (
    <Tab.Group>
      <Tab.List className="col-span-1">
        {[{ id: 0, title: "All" }, ...TabStates].map((tab, tabIndex) => (
          <Tab as={Fragment} key={tab.id}>
            {({ selected }) => {
              return (
                <button
                  className={classNames(
                    `btn rounded-none border-0 bg-transparent px-4 py-1 ${
                      selected ? "font-bold text-primary" : "font-normal text-primary"
                    } hover:border-success hover:bg-transparent focus:outline-none`,
                    selected && "border-b-2 border-primary",
                    tabIndex > 0 && "ml-3"
                  )}
                >
                  {tab.title}
                </button>
              );
            }}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {[{ id: 0, title: "All" }, ...TabStates].map((tab) => {
          const filteredProposals = proposals(tab.id as OPProposalStatus | 0);

          return (
            <Tab.Panel key={tab.id} className="grid grid-cols-2 gap-4">
              {filteredProposals?.length ? (
                filteredProposals.map((proposal) => (
                  <ProposalCard key={proposal?.proposalId ?? 0} {...proposal!} />
                ))
              ) : (
                <p key={tab.id}>No {tab.id === 0 ? "" : tab.title} Proposals</p>
              )}
            </Tab.Panel>
          );
        })}
      </Tab.Panels>
    </Tab.Group>
  );
};
