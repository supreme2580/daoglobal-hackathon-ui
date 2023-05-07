import { PrimaryButton } from "@components/inputs";
import { CheckIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useState } from "react";
import { useNewProposal } from "@daobox/use-aragon";
import { type CreateProposalDetail, type CreateProposalVoting } from "types";
import { availableTokens, lensVotingAddress, votingPluginAddress } from "@constants/daoConfig";
import { toast } from "react-toastify";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { TransferEncoderProps, transferEncoder } from "@lib/transferEncoder";
import { truncateAddress } from "@utils/addresses";
import { constants, ethers, utils } from "ethers";
import { useNewOpProposal } from "@hooks/op/write";

interface Props {
  proposal: CreateProposalDetail;
  voting: CreateProposalVoting;
  onComplete?: (actions?: unknown) => void;
  onCancel?: () => void;
}

export const CreateProposalsActionStep: React.FC<Props> = ({
  onComplete,
  proposal,
  voting,
  onCancel,
}) => {
  const [actions, setActions] = useState<
    (TransferEncoderProps & { id: number } & { selected?: (typeof availableTokens)[0] })[]
  >([]);
  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const { write, isLoading, error, status } = useNewOpProposal({
    metadata: {
      title: proposal.title,
      description: proposal.summary,
      resources: proposal?.resources || [],
      startDate: new Date().getTime() / 1000,
      endDate: new Date(voting.end_date).getTime() / 1000,
    },
    actions: transferEncoder(
      actions.map(
        ({ amount, to, selected }) =>
          ({ to, amount, token: selected?.address } as unknown as TransferEncoderProps)
      )
    ),
  });

  const closeNotifModal = () => {
    setProposalSubmitted(false);
    onComplete?.();
  };

  const removeAction = (id: number) => {
    setActions((prev) => prev.filter(({ id: ind }) => ind !== id));
  };
  const selectToken = (id: number, token: (typeof availableTokens)[0]) => {
    const newTokens = actions.map(({ id: ind, ...action }) =>
      ind === id
        ? {
            ...action,
            id: ind,
            selected: token,
          }
        : { ...action, id: ind }
    );
    setActions(newTokens);
  };

  const addAction = () => {
    const actions_length = actions.length;
    setActions((prev) => [
      ...prev,
      {
        amount: "",
        id: actions_length + 1,
        to: ethers.constants.AddressZero,
        token: ethers.constants.AddressZero,
        selected: undefined,
      },
    ]);
  };

  return (
    <div className="flex w-full flex-col gap-10">
      <div>
        <h2>If option &ldquo;Yes&rdquo; wins</h2>

        <div className="border-neutral mt-4 flex w-full flex-col items-center justify-center gap-5 rounded-lg border-2 p-8">
          <h2 className="text-xl font-bold">Add Action</h2>
          <p className="max-w-md text-center">
            This action will execute if the vote passes. A common automatic action is transferring
            funds to a guild or person if their proposal passes a vote.
          </p>

          {actions.length ? (
            <div className="flex flex-col items-stretch gap-4">
              {actions.map((action, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="flex w-full items-center justify-between">
                      <h3>Action {index + 1}</h3>

                      <button
                        className="btn-ghost btn-square btn text-error"
                        onClick={() => removeAction(action.id)}
                      >
                        <XMarkIcon width={20} height={20} />
                      </button>
                    </div>
                    <div className="flex items-center justify-start gap-3" key={action.id}>
                      <div className="flex-2 form-control w-full">
                        <label className="label">
                          <span className="label-text">Recipient</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Paste an address"
                          value={action.to === constants.AddressZero ? "" : action.to}
                          onChange={({ target }) =>
                            setActions((prev) =>
                              prev.map((act) =>
                                act.id === action.id
                                  ? {
                                      ...act,
                                      to: target.value,
                                    }
                                  : act
                              )
                            )
                          }
                          className="input-bordered input w-full"
                        />
                      </div>
                      <div className="form-control w-full min-w-[120px] flex-1">
                        <label className="label">
                          <span className="label-text">Amount</span>
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          value={action.amount.toString()}
                          onChange={({ target }) =>
                            setActions((prev) =>
                              prev.map((act) =>
                                act.id === action.id
                                  ? {
                                      ...act,
                                      amount: target.value,
                                    }
                                  : act
                              )
                            )
                          }
                          className="input-bordered input w-full"
                        />
                      </div>
                      <div className="form-control relative w-full min-w-[130px] flex-1">
                        <label className="label">
                          <span className="label-text">Token</span>
                        </label>
                        <Listbox
                          value={action.token}
                          onChange={(token) =>
                            selectToken(action.id, token as unknown as (typeof availableTokens)[0])
                          }
                        >
                          <Listbox.Button>
                            <span className="input-bordered input flex w-full items-center justify-start truncate text-sm">
                              {action.selected?.name ?? "Choose token"}
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full min-w-[200px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {availableTokens.map((token) => (
                                <Listbox.Option
                                  key={token.symbol}
                                  value={token}
                                  className={({ active }) =>
                                    `relative cursor-default select-none px-4 py-2 ${
                                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                                    }`
                                  }
                                  disabled={!token.balance}
                                >
                                  {({ selected }) => (
                                    <>
                                      <div
                                        className={`flex items-center justify-between truncate ${
                                          selected ? "font-medium" : "font-normal"
                                        }`}
                                      >
                                        <span>{token.name}</span>

                                        <span>
                                          {token.balance} {token.symbol}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </Listbox>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          ) : null}

          <PrimaryButton
            type="button"
            onClick={() => addAction()}
            startIcon={<PlusIcon width={20} height={20} />}
          >
            Add Action
          </PrimaryButton>
        </div>
      </div>
      <div className="mt-6 flex w-full items-center justify-end gap-4">
        <PrimaryButton className="btn-ghost" type="reset" onClick={() => onCancel?.()}>
          Back
        </PrimaryButton>

        {isLoading ? (
          <button className="loading btn">Submit</button>
        ) : (
          <PrimaryButton type="button" onClick={() => write?.()} className={"text-white"}>
            Submit
          </PrimaryButton>
        )}
      </div>

      <Dialog open={proposalSubmitted} onClose={() => closeNotifModal()} className="relative z-50">
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          aria-hidden="true"
        >
          <Dialog.Panel className="m relative flex max-h-full w-full max-w-2xl flex-col items-center justify-center overflow-auto rounded-lg bg-secondary p-10">
            <div>
              <CheckIcon width={40} height={40} stroke={!!error ? "red" : "green"} />
            </div>

            {status === "success" ? (
              <div className="mt-8 text-center">
                <p>Your Proposal is Submitted</p>
                <p className="mt-4">
                  You have successfully created a proposal. You can share this with your members and
                  let them give their decisions
                </p>
              </div>
            ) : (
              <div className="mt-8 text-center">
                <p>Proposal creation failed</p>
                <p className="mt-4">Proposal creation failed, please try again</p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-center gap-4">
              {!!error && (
                <PrimaryButton onClick={() => setProposalSubmitted(false)}>Cancel</PrimaryButton>
              )}
              <PrimaryButton onClick={() => closeNotifModal()}>Back home</PrimaryButton>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};
