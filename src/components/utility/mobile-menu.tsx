import { Dispatch, Fragment, SetStateAction } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "lucide-react";

import ThemeSwitch from "@/components/utility/theme-switch";
import { type NavbarProps } from "@/layout/navbar";
import { classNames } from "@/utility/classNames";
import { siteMetadata } from "@/data/siteMetaData.mjs";

export interface MobileMenuProps extends NavbarProps {
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
}

export default function MobileMenu({
  openMenu,
  routes,
  setOpenMenu,
}: MobileMenuProps) {
  const pathName = usePathname();
  const router = useRouter();

  const handleClick = (href: string) => {
    setOpenMenu(false);
    router.push(href);
  };

  return (
    <Transition show={openMenu} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 md:hidden"
        onClose={setOpenMenu}
      >
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        {/* Panel */}
        <div className="fixed inset-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 -translate-y-full"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-full"
          >
            <Dialog.Panel className="flex h-full w-full flex-col bg-background">
              {/* Close button */}
              <div className="flex items-center justify-end px-6 pt-6">
                <button
                  onClick={() => setOpenMenu(false)}
                  aria-label="Close menu"
                  className="flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-zinc-200 backdrop-blur-md dark:ring-accent/50"
                >
                  <XIcon className="h-6 w-6 text-accent" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-1 flex-col items-center justify-center gap-6">
                {routes.map((link, i) => (
                  <button
                    key={i}
                    className="group relative py-2 text-3xl font-medium text-foreground"
                    onClick={() => handleClick(link.href)}
                  >
                    <span
                      className={classNames(
                        pathName === link.href ? "w-full" : "w-0",
                        "absolute -bottom-1 left-0 h-1 rounded-lg bg-accent transition-[width] duration-300 group-hover:w-full",
                      )}
                    ></span>
                    <span
                      className={classNames(
                        pathName === link.href
                          ? "text-accent"
                          : "text-foreground",
                      )}
                    >
                      {link.title}
                    </span>
                  </button>
                ))}
                <div className="mt-4">
                  <ThemeSwitch setClose={setOpenMenu} />
                </div>
              </div>

              {/* Footer */}
              <div className="pb-8 text-center text-sm text-muted-foreground">
                ©2026 {siteMetadata.siteName}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
