"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import clsx from "clsx";
import BackButton from "@/components/backButton";
import { useCredentialsStore } from "@/auth/store/credentialsStore";
import { Spinner } from "@/components/spinner";

const Signup = () => {
  const [view, setView] = useState("");
  const {
    email,
    password,
    confirmPassword,
    modifyField,
    passwordValidated,
    passwordsValidated,
  } = useCredentialsStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    modifyField(name, value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordsValidated()) return;

    const formData = new FormData();
    formData.append("email", e.currentTarget.email.value);
    formData.append("password", e.currentTarget.password.value);

    setView("loading");
    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) setView("success");
    // Add failure
  };

  switch (view) {
    case "loading":
      return <Spinner />;
    case "success":
      return (
        <div className="w-[300px] h-[200px] flex justify-center items-center">
          Success! Please confirm your email address using the email we've sent
          you
        </div>
      );
    default:
      return (
        <>
          <BackButton />
          <h1 className="text-xl font-bold mt-4 mb-4">Sign up</h1>
          <p className="mb-4">
            By continuing, you agree to our User Agreement and acknowledge that
            you understand the Privacy Policy.
          </p>
          <form
            className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground [&_input]:outline-none"
            onSubmit={handleSubmit}
          >
            <input
              className="rounded-md px-4 py-2 border"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="email"
              pattern=".+@.+\..+"
              required
            />
            <div>
              <input
                className={clsx(
                  "w-full rounded-md px-4 py-2 border",
                  passwordValidated()
                    ? "focus:border-green-500"
                    : "focus:border-red-500"
                )}
                id="password"
                type="password"
                value={password}
                onChange={handleChange}
                name="password"
                placeholder="password"
                required
              />
              <p className="text-xs text-gray-600">
                Minimum 8 characters in length
              </p>
            </div>
            <div>
              <input
                className={clsx(
                  "w-full rounded-md px-4 py-2 border",
                  passwordsValidated()
                    ? "focus:border-green-500"
                    : "focus:border-red-500"
                )}
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                placeholder="confirm password"
                required
              />
              <p className="text-xs text-gray-600">
                Minimum 8 characters in length
              </p>
            </div>
            <button className="bg-gray-500 rounded px-4 py-2 text-white mb-2 hover:bg-gray-500 font-bold">
              Sign up
            </button>
          </form>
        </>
      );
  }
};
//  );

export default Signup;
