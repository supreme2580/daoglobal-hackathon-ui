import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";
import { getWindow } from "@lib/window";

export const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: getWindow()?.location.pathname == "/" },
  { name: "Members", href: "/members", icon: UsersIcon, current: getWindow()?.location.pathname == "/members" },
  { name: "Treasury", href: "/treasury", icon: FolderIcon, current: getWindow()?.location.pathname == "/treasury" },
  { name: "Proposals", href: "/proposals", icon: QueueListIcon, current: getWindow()?.location.pathname == "/proposals" },
  { name: "Voting", href: "/voting", icon: CalendarIcon, current: getWindow()?.location.pathname == "/voting" },
  { name: "Feed", href: "/feed", icon: DocumentDuplicateIcon, current: getWindow()?.location.pathname == "/feed" },
];