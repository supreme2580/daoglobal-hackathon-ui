import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  { name: "Members", href: "/members", icon: UsersIcon, current: false },
  { name: "Treasury", href: "/treasury", icon: FolderIcon, current: false },
  {
    name: "Proposals",
    href: "/proposals",
    icon: QueueListIcon,
    current: false,
  },
  { name: "Voting", href: "/voting", icon: CalendarIcon, current: false },
  { name: "Feed", href: "/feed", icon: DocumentDuplicateIcon, current: false },
];
