import Link from "next/link";
import Messages from "./messages";
import AuthLayout from "@/components/authLayout";

export default function Login() {
  return (
    <AuthLayout>
      <form
        className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground [&>input]:outline-none"
        action="/auth/sign-in"
        method="post"
      >
        <h1 className="text-xl font-bold">Log In</h1>
        <input
          className="rounded-md px-4 py-2 border"
          id="email"
          name="email"
          placeholder="email"
          pattern=".+@.+\.com"
          required
        />
        <input
          className="rounded-md px-4 py-2 border"
          id="password"
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <div className="space-y-4">
          <div className="flex">
            <p className="text-sm pr-1">New to Tabata Timer?</p>
            <Link href="/signup" className="text-blue-500 text-sm">
              Sign up
            </Link>
          </div>
          <div className="flex">
            <p className="text-sm pr-1">Forgot your</p>
            <Link
              href="/forgotpassword"
              className="text-blue-500 text-sm hover:underline"
            >
              password
            </Link>
            <p className="text-sm pr-1">?</p>
          </div>
        </div>
        <button className="bg-gray-500 rounded px-4 py-2 text-white mb-2 hover:bg-gray-500 font-bold">
          Sign In
        </button>
        <Messages />
      </form>
    </AuthLayout>
  );
}
