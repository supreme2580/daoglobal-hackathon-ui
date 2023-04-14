import {
    CalendarIcon,
    HomeIcon,
    UsersIcon,
    NewspaperIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export const daoAddressOrEns = "0x6f07aa7af27e0e06a08a1a17e04c4b0eb11300ab";

export const navigation = [
    {
        id: "1",
        name: "Dashboard",
        href: "/",
        icon: HomeIcon
    },
    {
        id: "2",
        name: "Members",
        href: "/members",
        icon: UsersIcon
    },
    {
        id: "3",
        name: "Treasury",
        href: "/treasury",
        icon: CurrencyDollarIcon
    },
    {
        id: "4",
        name: "Voting",
        href: "/voting",
        icon: CalendarIcon
    },
    {
        id: "5",
        name: "Feed",
        href: "/feed",
        icon: NewspaperIcon
    }
]
