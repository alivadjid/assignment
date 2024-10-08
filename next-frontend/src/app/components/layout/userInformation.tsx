import Image from 'next/image'
import { 
  Menu, MenuButton, MenuItem, MenuItems
 } from '@headlessui/react'
import Cookies from 'js-cookie'
import { navigate }from '../../actions'
import { useContext } from 'react';
import { StateContext } from '../../StateContext';

const UserInformation = ({userNavigation}: Readonly<{
  userNavigation: {
    name: string;
    href: string;
    url: string
  }[]
}>) => {
  const { removeUser, removeToken } = useContext(StateContext);

  function handlerClick(url: string) {
    if(url === 'signOut') {
      Cookies.remove('isAuthenticated')
      localStorage.removeItem('appState')
      removeUser()
      removeToken()
      return navigate('login')
    }
  }

  return (
    <Menu as="div" className="relative ml-3">
    <div>
      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <Image alt="" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="h-8 w-8 rounded-full" width={32} height={32} />
      </MenuButton>
    </div>
    <MenuItems
      transition
      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    >
      {userNavigation.map((item) => (
        <MenuItem key={item.name}>
          <a
            key={item.url}
            href={item.href}
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
            onClick={() => handlerClick(item.url)}
          >
            {item.name}
          </a>
        </MenuItem>
      ))}
    </MenuItems>
  </Menu>
  )
}

export default UserInformation