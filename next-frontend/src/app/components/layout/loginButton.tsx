const LoginButton = () => {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }
  return (
  <a href="/login" className={classNames( true ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
    'rounded-md px-3 py-2 text-sm font-medium',
  )}
   >
    Login
  </a>)
}

export default LoginButton