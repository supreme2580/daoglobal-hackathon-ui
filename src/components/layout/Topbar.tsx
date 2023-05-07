import { Bars3Icon } from "@heroicons/react/24/outline";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { SwitchTheme } from "@components/buttons";

interface TopbarProps {
  setSidebarOpen: (open: boolean) => void;
}

export function Topbar(props: TopbarProps) {
  const { setSidebarOpen } = props;
  const { openConnectModal } = useConnectModal();
  return (
    <div className="sticky top-0 z-40 flex h-20 shrink-0 items-center gap-x-4 bg-base-100/70 px-4 shadow-sm backdrop-blur-md sm:gap-x-6 sm:px-6 lg:px-8 ">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-primary lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-2.5">
          <SwitchTheme />

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

          {/* RainbowKit Injector */}
          {openConnectModal ? (
            <button
              className="remove-text-transform btn-success btn-xs btn-md btn w-full text-white sm:w-auto"
              onClick={openConnectModal}
            >
              Connect Wallet
            </button>
          ) : (
            <ConnectButton />
          )}
        </div>
      </div>
    </div>
  );
}
