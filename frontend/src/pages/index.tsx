import Head from "next/head";
import { api } from "@/lib/axios";
import { ProductTypes } from "@/@types/product";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";

interface HomeProps {
  products: ProductTypes[];
}

export default function Home({ products }: HomeProps) {
  const [inputUsernameValue, setInputUsernameValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");
  const route = useRouter();

  async function handleSubmitSignIn(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("/token-auth/", {
        username: inputUsernameValue,
        password: inputPasswordValue,
      });

      api.defaults.headers.common[
        "Authorization"
      ] = `Token ${response.data.token}`;

      setCookie(undefined, "@stockManager:token", response.data.token, {
        path: "/",
        maxAge: 24 * 60 * 30,
      });

      route.push("/dashboard");
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 400) {
        toast.error("Usuário com essas credencias não existe.");
      }
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <div className="w-full sm:max-w-md p-5 mx-auto">
        <h2 className="mb-12 text-center text-5xl font-extrabold">
          Welcome <br /> Stock Manager
        </h2>
        <form onSubmit={handleSubmitSignIn}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">
              Username
            </label>
            <input
              id="email"
              type="text"
              name="email"
              value={inputUsernameValue}
              onChange={(e) => setInputUsernameValue(e.target.value)}
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={inputPasswordValue}
              onChange={(e) => setInputPasswordValue(e.target.value)}
              className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm leading-5 text-gray-900"
              >
                {" "}
                Remember me{" "}
              </label>
            </div>
            <a href="#" className="text-sm">
              {" "}
              Forgot your password?{" "}
            </a>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
            >
              Sign In
            </button>
          </div>
          <div className="mt-6 text-center">
            <a href="#" className="underline">
              Sign up for an account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
