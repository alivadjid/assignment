'use client'
import { Disclosure, 
  DisclosureButton, 
  DisclosurePanel, 
 } from '@headlessui/react'
import {  
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useContext } from 'react';
import { StateContext } from '../StateContext';
import LoginButton from './layout/loginButton'
import UserInformation from './layout/userInformation'
import MobileMenu from './layout/mobileMenu'
import { usePathname } from 'next/navigation'

const LayoutWrapper = ({children}:Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = useContext(StateContext);
  const mounted = useRef(false)
  const pathname = usePathname()

  useEffect(() => {
    if(!mounted.current) {
      mounted.current = true
      setNavigation((navigation) => {
        return navigation.map((item) => {
          item.current = item.href === pathname
          return item
        })
      })

    }
  }, [pathname])

  const [navigation, setNavigation] = useState([
    { name: 'Main', href: '/', current: false },
    { name: 'Dashboard', href: '/dashboard', current: false },
  ])

  const [userNavigation] = useState([
    { name: 'Sign out', href: '#', url: 'signOut' },
  ])
 
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }
  
  return <>
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image
                  alt="Your Company"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-8"
                  width={32}
                  height={32}
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {user.username ? navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </a>
                  )) : 
                  <a
                    key={navigation[0].name}
                    href={navigation[0].href}
                    aria-current={navigation[0].current ? 'page' : undefined}
                    className={classNames(
                      navigation[0].current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {navigation[0].name}
                  </a>
                  }
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                { user.username ? <UserInformation userNavigation={userNavigation} /> : <LoginButton />}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {user.username ? navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>)) 
                :
                <DisclosureButton as="a" href={navigation[0].href} aria-current={navigation[0].current ? 'page' : undefined} className={classNames(
                  navigation[0].current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}>
                  {navigation[0].name}
                </DisclosureButton>
            }
            </div>
            <MobileMenu userNavigation={userNavigation} user={user}/>
          </DisclosurePanel>
      </Disclosure>
      
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>

    
  </>
}

export default LayoutWrapper