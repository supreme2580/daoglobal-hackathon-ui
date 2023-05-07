import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { truncateAddress } from "@utils/addresses";
import { useRef } from "react";
import TransactionModalCard from "./TransactionModalCard";
import Button from "@components/buttons/Button";

export default function TransactionModal() {
  const ref = useRef<HTMLLabelElement>(null);
  return (
    <>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-middle">
        <div className="modal-box bg-base-100">
          <div className="flex w-full items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Transaction Detail</h3>
            </div>
            <button onClick={() => ref.current?.click()}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-2.5 py-4">
            <div className="flex w-full items-center justify-between">
              <div>
                <div>
                  <p>From</p>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="border-border focus:ring-border w-full max-w-xs rounded-lg 
                                    border focus:border focus:border-black focus:ring-0"
                    value={truncateAddress("0x5C04F69c9603A808BF4157Ef959F1Ed1e16c0F73")}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <div>
                  <p>To</p>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="border-border focus:ring-border w-full max-w-xs rounded-lg 
                                    border focus:border focus:border-black focus:ring-0"
                    value={truncateAddress("0x5C04F69c9603A808BF4157Ef959F1Ed1e16c0F73")}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="">
              <TransactionModalCard />
            </div>
            <div>
              <Button
                text="View on blocker explorer"
                icon={
                  <>
                    <PlusIcon className="text-neutral h-6 w-6" />
                  </>
                }
                clickFunction={() => {
                  console.log("clicked");
                }}
              />
            </div>
          </div>
        </div>
        <label htmlFor="my-modal-6" className="btn hidden" ref={ref}>
          Yay!
        </label>
      </div>
    </>
  );
}
