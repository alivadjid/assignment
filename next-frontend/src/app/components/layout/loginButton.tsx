import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const LoginButton = () => {
  const pathname = usePathname()
  const mounted = useRef(false)
  const [isLoginPage, setIsLoginPage] = useState(false)

  useEffect(() => {
    if(!mounted.current) {
      mounted.current = true
      if(pathname === '/login') {
        setIsLoginPage(true)
      }

    }
  }, [pathname])
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }
  return (
  <a href="/login" className={classNames( isLoginPage ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
    'rounded-md px-3 py-2 text-sm font-medium',
  )}
   >
    Login
  </a>)
}

export default LoginButton