import { ConnectButton } from "@rainbow-me/rainbowkit";
import { SwitchTheme } from "./SwitchTheme";
import {
  Bars3Icon,
} from "@heroicons/react/24/outline";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileSideBar";
import { useRecoilState } from "recoil";
import { navigation } from "atom/atoms";

export function AppShell({ children }: { children: React.ReactNode }) {

  const [open, setOpen] = useRecoilState(navigation);

  return (
    <>
      <div>

        {/* Mobile menu button */}
        <MobileMenu />

        {/* Static sidebar for desktop */}
        <DesktopMenu />

        {/* Header */}
        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-black bg-white px-4 shadow-sm
           dark:bg-black sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-white lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex items-center  gap-x-4 lg:gap-x-2">
                <SwitchTheme />

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* RainbowKit Injector */}
                <ConnectButton />
              </div>
            </div>
          </div>

          <main className="py-10 bg-gray min-h-[calc(100vh-65px)]">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
