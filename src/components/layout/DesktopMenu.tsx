import { navigation } from "@/constants";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "@/images/logos/daobox.png";

export default function DesktopMenu() {

    const [path, setPath] = useState("")
    useEffect(() => {
      if (typeof window != "undefined") {
        setPath(window.location.pathname)
      }
    }, [window.location.pathname])

    return(
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-black px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Image
                src={logo}
                alt="DAOBox Logo"
                width={300}
                className="hidden h-8 w-auto lg:block"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href}
                          className={`flex items-center gap-x-3 rounded-md p-2 font-semibold leading-6 
                          ${path == item.href ? "bg-daoboxg text-black" : "text-white hover:bg-daoboxg hover:text-black"}`}
                        >
                          <item.icon
                            className={`w-6 h-6 shrink-0 ${path == item.href ? "text-black" : "group-hover:text-white"}`}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <Link
                    href="/settings"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white hover:bg-daoboxg hover:text-black"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-white group-hover:text-black"
                      aria-hidden="true"
                    />
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
    )
}