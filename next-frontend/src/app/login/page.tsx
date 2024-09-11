'use client'
import Image from "next/image"
import { useContext, useState } from 'react';
import { StateContext } from '@/app/StateContext';
import authApi from '@/api/authApi'
import { navigate }from '@/app/actions'
import { isApiError }from '@/app/helpers'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "@/app/components/loader";

const LoginPage = () => {
  const { saveUser, saveToken } = useContext(StateContext);
  const [ showPassword, setShowPassword ] = useState(false)
  const [apiError, setApiError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    if (!(event.target instanceof HTMLElement)) return;
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.currentTarget)
    const jsonData = Object.fromEntries(formData)

    const loginResult = await authApi.login(jsonData)

    if (typeof loginResult === 'object' && loginResult.accessToken) {
      saveToken(loginResult.accessToken)
      const userData = await authApi.getUser(loginResult.accessToken)
      saveUser(userData)
      toast.success('Login successful', {
        position: "bottom-center"
      })
      navigate('dashboard')
    } else {
      setIsLoading(false)
      const error = isApiError(loginResult) ? loginResult.error : ''
      setApiError(error)
      toast.error(`${error}`, {
        position: "bottom-center"
      })
    }
  }

  return <>
    <ToastContainer />
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
          width={100}
          height={100}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account {isLoading}
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

          {apiError && (
            <div className="mt-2 bg-red-100 border-l-4 border-red-500 p-4">
              <p className="text-sm text-red-700">{apiError}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              name="signIn"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isLoading}
            >
            {
              isLoading ? <Loader /> : 'Sign in'
            }
            </button>

            <Link href="/register" className="flex justify-center mt-2">Sign up</Link>
          </div>
        </form>
      </div>
      {/* {JSON.stringify(user)} */}
    </div>
  </>
}
export default LoginPage