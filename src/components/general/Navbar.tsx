'use client'
import { useState } from 'react';
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import logo from '../../assets/profile/logoLais.png'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-primary fixed w-full z-10">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
          <div className="flex lg:flex-1">
            <a href='/#banner' className="-m-1.5 p-1.5 cursor-pointer">
              <span className="sr-only">Lais logo</span>
              <img src={logo} className="h-16" />
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            >
              <span className="sr-only">Abrir menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <PopoverGroup className="hidden lg:flex lg:gap-x-12 items-center">

            <a href='/#examplesOfFaith' className="cursor-pointer text-md font-light text-gray-100 hover:text-pale-peach transition-colors">
              ddd
            </a>
            <a href='/#miracles' className="cursor-pointer text-md font-light text-gray-100 hover:text-pale-peach transition-colors">
              ggg
            </a>
            <a href='/#linesAndSky' className="cursor-pointer text-md font-light text-gray-100 hover:text-pale-peach transition-colors">
              tttt
            </a>
          </PopoverGroup>
        </nav>

        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-light-sage px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-secondary/10">
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-pale-peach focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                <span className="sr-only">Fechar menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a
                    href='/#faithExamples'
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-light text-secondary text-gray-100 hover:text-pale-peach cursor-pointer transition-colors"
                  >
                    ggg
                  </a>
                  <a
                    href='/#miracles'
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-light text-secondary text-gray-100 hover:text-pale-peach cursor-pointer transition-colors"
                  >
                    ggg
                  </a>
                  <a
                    href='/#linesAndSky'
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-light text-secondary text-gray-100 hover:text-pale-peach cursor-pointer transition-colors"
                  >
                    ggg
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      <div className="h-24" />
    </>
  );
}