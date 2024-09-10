'use client'
import Image from "next/image"
import authApi from '@/api/authApi'
import { navigate }from '../actions'
import Link from 'next/link'
import { useState } from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const passwordRequirements = [
  { label: 'At least one lowercase letter (s)', checked: false },
  { label: 'At least one uppercase letter (P)', checked: false },
  { label: 'At least one digit (0)', checked: false },
  { label: 'At least one special character (@, !)', checked: false },
  { label: 'Minimum length of 8 characters', checked: false },
];
type ValidationError = {error: {error: string, message: string[]}}
function isError(apiError: unknown): apiError is ValidationError {
  return apiError !== null && typeof apiError === 'object' 
    && 'error' in apiError && apiError.error instanceof Object
    && 'message' in apiError.error
}


const LoginPage = () => {
  const [ showPassword, setShowPassword ] = useState(false)
  const [apiError, setApiError] = useState<string[]>([])


  async function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    if (!(event.target instanceof HTMLElement)) return;
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const jsonData = Object.fromEntries(formData)
    const createUserResult = await authApi.register(jsonData)
    console.log('created', createUserResult)
    if (isError(createUserResult)) {
      console.log('seERro', createUserResult.error.message)
      setApiError(createUserResult.error.message)
      console.log('apiError', apiError)
    } else {
      navigate('login')
    }
  }


  return <>
    <ToastContainer />
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {showPassword}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
          width={100}
          height={100}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 p-2 pr-16 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                className="absolute right-2 top-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Confirm password
            </label>
            <div className="mt-2 relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                className="block w-full rounded-md border-0 p-2 pr-16 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                className="absolute right-2 top-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="mt-2">
            <h2 className="text-sm font-medium leading-6 text-gray-900">Password Requirements:</h2>
            <ul className="list-disc pl-4 text-sm text-gray-600">
              {passwordRequirements.map((requirement, index) => (
                <li key={index} className={requirement.checked ? 'text-green-600' : 'text-gray-600'}>
                  {requirement.label}
                </li>
              ))}
            </ul>
          </div>
          {apiError?.length > 0 && (
            <div className="mt-2 bg-red-100 border-l-4 border-red-500 p-4">
              {Array.isArray(apiError) ? apiError.map((error, index) => (
                <p key={index} className="text-sm text-red-700">{error}</p>
              )) : <p className="text-sm text-red-700">{apiError}</p>}
            </div>
          )}

          <div>
            <button
              type="submit"
              name="signIn"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>

            <Link href="/login" className="flex justify-center mb-2">Sign in</Link>
          </div>
        </form>
      </div>
      {/* {JSON.stringify(user)} */}
    </div>
  </>
}
export default LoginPage