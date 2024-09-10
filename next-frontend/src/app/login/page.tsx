'use client'
import Image from "next/image"
import { useContext } from 'react';
import { StateContext } from '../StateContext';
import authApi from '@/api/authApi'
import { navigate }from '../actions'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = () => {
  const { user, saveUser, token, saveToken } = useContext(StateContext);
  console.log('user', user)
  // if (!user) {
  //   return <div>Please login</div>;
  // }


  async function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    if (!(event.target instanceof HTMLElement)) return;
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const jsonData = Object.fromEntries(formData)

    const loginData = await authApi.login(jsonData)

    if (typeof loginData === 'object' && loginData.accessToken) {
      saveToken(loginData.accessToken)
      const userData = await authApi.getUser(loginData.accessToken)
      saveUser(userData)
      toast.success('Login successful', {
        position: "bottom-center"
      })
      navigate('dashboard')
    } else {
      toast.error(`${loginData}`, {
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
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              name="signIn"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
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