import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { Fragment } from "react";
import {
  useFetchDao,
  useFetchDaos,
  useFetchProposals,
  useFetchMembers,
  useFetchVotingSettings,
  useFetchProposal,
} from "@daobox/use-aragon";
import { capitalize } from "lodash";
import { daoAddressOrEns } from "@constants/daoConfig";

const TabStates = [
  "all",
  "pending",
  "active",
  "succeeded",
  "executed",
  "defeated",
];

export const ProposalsTab = () => {
  const { data, error, isLoading } = useFetchProposal({
    proposalId: "0xc41e25d5e7cf5457b635d94c2262f914bb9d36e8_0x5",
  });

  console.log({ data, error, isLoading });
  return (
    <Tab.Group>
      <Tab.List>
        {TabStates.map((tab, tabIndex) => (
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
        {TabStates.map((tab) => (
          <Tab.Panel key={tab}>{capitalize(`${tab}`)} proposals</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
