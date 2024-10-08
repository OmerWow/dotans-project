"use client";

import { LogUserIn } from "@/app/actions";
import { useActionState } from "react";

export default function SignInPage() {
  const [error, action, isPending] = useActionState(LogUserIn, "");

  return (
    <div className="flex flex-col justify-center flex-1 h-screen px-6 py-12 place-items-center lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src="https://todogod.com/wp-content/uploads/2023/05/%D7%A1%D7%95%D7%A4%D7%A8-%D7%9E%D7%94%D7%9C%D7%91-%D7%97%D7%91%D7%93.png.webp" alt="" />
        <h2 className="-mt-10 text-2xl font-bold tracking-tight text-center text-gray-900 leading-9">
          התחבר לחשבונך
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action={action}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900 leading-6"
            >
              כתובת אימייל
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900 leading-6"
            >
              סיסמא
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex flex-col place-items-center space-y-4">
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:text-gray-50"
            >
              {isPending ? "מתחבר..." : "התחבר"}
            </button>
            <div className="min-h-6">
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
