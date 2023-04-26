import { Tab } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";
import { ProposalVotingInfo } from "./components";

type Props = {
  pid?: string;
};

const TabStates = ["Voting", "Assets", "Transactions"];

export const ProposalsByIDView: React.FC<Props> = ({ pid }) => {
  if (!pid) {
    return null;
  }
  return (
    <div className="w-full flex-1">
      <Tab.Group>
        <Tab.List className="col-span-1">
          {TabStates.map((tab, tabIndex) => (
            <Tab as={Fragment} key={tab}>
              {({ selected }) => {
                return (
                  <button
                    disabled={tab !== "Voting"}
                    className={classNames(
                      `btn rounded-none border-0 bg-transparent px-4 py-1 ${
                        selected
                          ? "font-bold text-primary"
                          : "font-normal text-secondary"
                      } hover:border-success hover:bg-transparent focus:outline-none disabled:bg-transparent`,
                      selected && "rounded-2 border-b-2 border-primary",
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
          <Tab.Panel>
            <ProposalVotingInfo proposalId={pid} />
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
