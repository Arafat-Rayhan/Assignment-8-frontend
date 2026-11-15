// "use client";
// import {signIn} from '@/app/lib/auth-client'
// import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";

// const SignIn = ()=>  {
//   const onSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const data: Record<string, string> = {};

//     // Convert FormData to plain object
//     formData.forEach((value, key) => {
//       data[key] = value.toString();

//     });
//     const { data:resdata, error } = await signIn.email({
//     email: data.email,  
//     password:data.password, 
// });
// console.log(resdata);
  
//   };

//   return (
//     <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
//       <TextField
//         isRequired
//         name="email"
//         type="email"
//         validate={(value) => {
//           if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
//             return "Please enter a valid email address";
//           }

//           return null;
//         }}
//       >
//         <Label>Email</Label>
//         <Input placeholder="john@example.com" />
//         <FieldError />
//       </TextField>

//       <TextField
//         isRequired
//         minLength={8}
//         name="password"
//         type="password"
//         validate={(value) => {
//           if (value.length < 8) {
//             return "Password must be at least 8 characters";
//           }
//           if (!/[A-Z]/.test(value)) {
//             return "Password must contain at least one uppercase letter";
//           }
//           if (!/[0-9]/.test(value)) {
//             return "Password must contain at least one number";
//           }

//           return null;
//         }}
//       >
//         <Label>Password</Label>
//         <Input placeholder="Enter your password" />
//         <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
//         <FieldError />
//       </TextField>

//       <div className="flex gap-2">
//         <Button type="submit">
//           Submit
//         </Button>
//         <Button type="reset" variant="secondary">
//           Reset
//         </Button>
//       </div>
//     </Form>
//   );
// }
// export default SignIn;


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/app/lib/auth-client";
import { FaGoogle, FaGithub } from "react-icons/fa";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

const SignIn = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // ইমেইল ও পাসওয়ার্ড দিয়ে লগইন
  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const formData = new FormData(e.currentTarget);

      const email = String(formData.get("email") || "");
      const password = String(formData.get("password") || "");

      const result = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        throw new Error(result.error.message || "Invalid email or password");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // Google
  const handleGoogle = async () => {
    try {
      setSocialLoading("google");
      await signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      setErrorMessage("Google sign in failed. Please try again.");
      setSocialLoading(null);
    }
  };

  // GitHub
  const handleGitHub = async () => {
    try {
      setSocialLoading("github");
      await signIn.social({ provider: "github", callbackURL: "/" });
    } catch {
      setErrorMessage("GitHub sign in failed. Please try again.");
      setSocialLoading(null);
    }
  };

  const busy = loading || socialLoading !== null;

  const socialBtn =
    "flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-3xl text-indigo-600 shadow-sm">
            ✦
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            Community Events
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Sign in to join events and manage your own.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white bg-white p-6 shadow-[0_20px_60px_-25px_rgba(30,41,59,0.2)] sm:p-8">
          {/* Social */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogle}
              disabled={busy}
              className={socialBtn}
            >
              <FaGoogle className="text-red-500" size={18} />
              {socialLoading === "google" ? "Redirecting..." : "Sign in with Google"}
            </button>

            <button
              type="button"
              onClick={handleGitHub}
              disabled={busy}
              className={socialBtn}
            >
              <FaGithub size={18} />
              {socialLoading === "github" ? "Redirecting..." : "Sign in with GitHub"}
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium text-slate-400">
              or sign in with email
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Form */}
          <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label>Email</Label>
              <Input placeholder="john@example.com" />
              <FieldError />
            </TextField>

            {/* Password */}
            <TextField isRequired name="password" type="password">
              <Label>Password</Label>
              <Input placeholder="Enter your password" />
              <FieldError />
            </TextField>

            {/* Error */}
            {errorMessage && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {errorMessage}
              </div>
            )}

            <Button
              type="submit"
              isDisabled={busy}
              className="w-full bg-indigo-600 font-bold text-white"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </Form>
        </div>

        {/* Sign up link */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignIn;