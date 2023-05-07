import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";
import { getWindow } from "@lib/window";

export const navigation = () => {
  const data = [
    {
      name: "Dashboard",
      href: "/",
      icon: HomeIcon,
      current: getWindow()?.location.pathname == "/",
    },
    {
      name: "Members",
      href: "/members",
      icon: UsersIcon,
      current: getWindow()?.location.pathname == "/members",
    },
    {
      name: "Treasury",
      href: "/treasury",
      icon: FolderIcon,
      current: getWindow()?.location.pathname == "/treasury",
    },
    {
      name: "Lens Voting",
      href: "/lens-voting",
      icon: QueueListIcon,
      current: getWindow()?.location.pathname == "/lens-voting",
    },
    {
      name: "Proposals",
      href: "/ops",
      icon: QueueListIcon,
      current: getWindow()?.location.pathname == "/ops",
    },
  ];
  return data;
};
