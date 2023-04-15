import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import logo from "@images/logos/daobox.png";
import { classNames } from "@utils/classNames";
import { navigation } from "@constants/navigation";
import Link from "next/link";

export function Sidebar() {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-secondary px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <Image
          src={logo}
          alt="DAOBox Logo"
          width={300}
          className="block h-8 w-auto"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation().map((item, index) => (
                <li key={item.name + `${index}`}>
                  <Link
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-daoboxg text-black"
                        : "text-white hover:bg-daoboxg hover:text-black",
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-black"
                          : "text-white group-hover:text-black",
                        "h-6 w-6 shrink-0"
                      )}
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
              href="#"
              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white hover:bg-daoboxg hover:text-white"
            >
              <Cog6ToothIcon
                className="h-6 w-6 shrink-0 text-white group-hover:text-white"
                aria-hidden="true"
              />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
