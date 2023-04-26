import { useState } from "react";
import {
  CalendarIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import { MobileNav } from "./MobileNav";
import { Topbar } from "./Topbar";
import { DesktopNav } from "./DesktopNav";
import { Viewport } from "./Viewport";

export const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  { name: "Members", href: "/members", icon: UsersIcon, current: false },
  { name: "Treasury", href: "/treasury", icon: FolderIcon, current: false },
  { name: "Voting", href: "/voting", icon: CalendarIcon, current: false },
  { name: "Feed", href: "/feed", icon: DocumentDuplicateIcon, current: false },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <MobileNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <DesktopNav />
        <div className="lg:pl-72">
          <Topbar setSidebarOpen={setSidebarOpen} />
          <Viewport>{children}</Viewport>
        </div>
      </div>
    </>
  );
}
