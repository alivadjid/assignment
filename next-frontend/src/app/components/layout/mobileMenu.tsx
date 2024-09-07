import {
  DisclosureButton, 
 } from '@headlessui/react'

const MobileMenu = ({userNavigation, user}: Readonly<{
  userNavigation: {
    name: string;
    href: string;
  }[],
  user: {
    username: string
  }
}>) => {
  return (
    <div className="border-t border-gray-700 pb-3 pt-4">
      <div className="flex items-center px-5">
        <div className="flex-shrink-0">
          <img alt="" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="h-10 w-10 rounded-full" />
        </div>
        <div className="ml-3">
          <div className="text-base font-medium leading-none text-white">{user.username}</div>
        </div>
        <button
          type="button"
          className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          {/* <BellIcon aria-hidden="true" className="h-6 w-6" /> */}
        </button>
      </div>
      <div className="mt-3 space-y-1 px-2">
        {userNavigation.map((item) => (
          <DisclosureButton
            key={item.name}
            as="a"
            href={item.href}
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            {item.name}
          </DisclosureButton>
        ))}
      </div>
    </div>
  )
}
export default MobileMenu