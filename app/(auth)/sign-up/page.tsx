
"use client";

import { useEffect, useState } from "react";
import { signUp, signIn } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

import {
  FaGoogle,
  FaGithub,
  FaUserCircle,
  FaPlusCircle,
  FaCheckCircle,
} from "react-icons/fa";

import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

const SignUp = () => {
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Image Preview
  {/* Social Login */}
  useEffect(() => {
  return () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };
}, [preview]);

  // Image Upload Function
  const handleImageUpload = async () => {
    if (!image) return undefined;

    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("YOUR_BACKEND_UPLOAD_URL", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Image upload failed");
    }

    return data.imageUrl;
  };

  // Registration Function
  const onSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const formData = new FormData(e.currentTarget);

      const name = String(formData.get("name") || "");
      const email = String(formData.get("email") || "");
      const password = String(formData.get("password") || "");

      // Upload Image First
      const imageUrl = await handleImageUpload();

      // Better Auth Registration
      const result = await signUp.email({
        name,
        email,
        password,
        image: imageUrl,
        callbackURL: "/",
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      router.push("/");

    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const handleGoogle = async () => {
    await signIn.social({
      provider: "google",
    });
  };

  // GitHub Sign In
  const handleGitHub = async () => {
    await signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-100 p-4 sm:p-8">

      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl grid grid-cols-1 lg:grid-cols-2">







       {/* Left Side */}
<div className="hidden lg:flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-700 to-purple-800 p-12 text-white">

  {/* Decorative Background */}
  <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-400/20" />

  <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-purple-400/20" />

  {/* Logo */}
  <div className="relative z-10">
    <h2 className="text-3xl font-bold tracking-wide">
      MyApp
    </h2>

    <div className="mt-16">
      <h1 className="text-5xl font-bold leading-tight">
        Join Our
        <br />
        Community
      </h1>

      <p className="mt-6 max-w-sm text-lg leading-8 text-indigo-100">
        Create your account and become a part of
        something great.
      </p>
    </div>
  </div>

  {/* Illustration */}
  <div className="relative z-10 flex items-center justify-center py-8">

    <div className="relative flex h-64 w-64 rotate-[-8deg] items-center justify-center rounded-[40px] border border-white/30 bg-white/15 shadow-2xl backdrop-blur-md">

      <div className="flex h-44 w-44 items-center justify-center rounded-3xl bg-white shadow-xl">

        <FaUserCircle className="h-32 w-32 text-blue-600" />

      </div>

      <FaPlusCircle className="absolute -bottom-5 -right-5 h-16 w-16 rounded-full bg-green-500 text-white shadow-lg" />

      <div className="absolute -right-10 top-5 rounded-2xl bg-white/20 p-4 backdrop-blur-md">
        <span className="text-3xl">🔒</span>
      </div>

      <div className="absolute -left-10 bottom-8 rounded-2xl bg-white/20 p-4 backdrop-blur-md">
        <span className="text-3xl">📸</span>
      </div>

    </div>

  </div>

  {/* Features */}
  <div className="relative z-10 space-y-5">

    <p className="flex items-center gap-3">
      <FaCheckCircle className="text-xl text-green-400" />
      Create and share posts
    </p>

    <p className="flex items-center gap-3">
      <FaCheckCircle className="text-xl text-green-400" />
      Connect with friends
    </p>

    <p className="flex items-center gap-3">
      <FaCheckCircle className="text-xl text-green-400" />
      Explore amazing content
    </p>

  </div>

</div>



















        {/* rrrrrr */}

       <div className="p-6 sm:p-10 lg:p-12">

          <div className="mb-8">
            <p className="text-sm font-medium text-indigo-600">
              GET STARTED
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Fill in your details to get started.
            </p>
          </div>

          <Form
            className="w-full"
            onSubmit={onSubmit}
          >

            <Fieldset className="w-full">
              <FieldGroup className="gap-5">

                {/* Name */}
                <TextField
                  name="name"
                  isRequired
                  validate={(value) => {
                    if (value.length < 3) {
                      return "Name must be at least 3 characters";
                    }
                    return null;
                  }}
                >
                  <Label>Full Name</Label>
                  <Input
                    placeholder="Enter your name"
                    className="h-12 rounded-xl"
                  />
                  <FieldError />
                </TextField>

                {/* Email */}
                <TextField
                  name="email"
                  type="email"
                  isRequired
                >
                  <Label>Email Address</Label>
                  <Input
                    placeholder="Enter your email"
                    className="h-12 rounded-xl"
                  />
                  <FieldError />
                </TextField>













                  {/* Password */}
                <TextField
                  name="password"
                  type="password"
                  isRequired
                  minLength={8}
                  validate={(value) => {
                    if (value.length < 8) {
                      return "At least 8 characters required";
                    }

                    if (!/[A-Z]/.test(value)) {
                      return "One uppercase letter required";
                    }

                    if (!/[0-9]/.test(value)) {
                      return "One number required";
                    }

                    return null;
                  }}
                >
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="Create a strong password"
                    className="h-12 rounded-xl"
                  />

                  <Description>
                    At least 8 characters, 1 uppercase
                    letter and 1 number.
                  </Description>

                  <FieldError />
                </TextField>

                {/* Profile Image */}
                <div className="space-y-3">
                  <Label>Profile Image</Label>

                  <div className="flex flex-col sm:flex-row items-center gap-5">

                    <label className="flex min-h-32 flex-1 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50/50 p-5 transition hover:bg-indigo-50">

                      <span className="text-3xl text-indigo-600">
                        ↑
                      </span>







                      <span className="mt-2 font-semibold text-gray-800">
                        Click to upload
                      </span>

                      <span className="mt-1 text-xs text-gray-500">
                        PNG, JPG or WEBP (Max 2MB)
                      </span>

                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];

                          if (!file) return;

                          if (!file.type.startsWith("image/")) {
                            setErrorMessage("Please select an image");
                            e.target.value = "";
                            return;
                          }

                          if (file.size > 2 * 1024 * 1024) {
                            setErrorMessage("Image must be under 2MB");
                            e.target.value = "";
                            return;
                          }

                          setErrorMessage("");
                          setImage(file);
                        }}
                      />

                    </label>

                    {/* Image Preview */}
                    <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-indigo-100 bg-gray-100">

                      {preview ? (
                        <img
                          src={preview}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl text-gray-400">
                          👤
                        </span>
                      )}



                        {preview && (
                        <button
                          type="button"
                          onClick={() => setImage(null)}
                          className="absolute right-0 top-0 rounded-full bg-red-500 px-2 py-1 text-xs text-white"
                        >
                          ✕
                        </button>
                      )}

                    </div>
                  </div>

                  {image && (
                    <p className="text-xs text-gray-500">
                      Selected: {image.name}
                    </p>
                  )}
                </div>

              </FieldGroup>

              {/* Error Message */}
              {errorMessage && (
                <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {errorMessage}
                </p>
              )}

              {/* Submit */}
              <Fieldset.Actions className="mt-7 flex flex-col gap-3">

                <Button
                  type="submit"
                  isDisabled={loading}
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold text-white shadow-lg"
                >
                  {loading ? "Creating Account..." : "Create Account →"}
                </Button>



                </Fieldset.Actions>

            </Fieldset>

          </Form>
 


{/* Social Login */}
<div className="my-7 flex items-center gap-4">

  <div className="h-px flex-1 bg-gray-200" />

  <span className="text-sm text-gray-500">
    Or continue with
  </span>

  <div className="h-px flex-1 bg-gray-200" />

</div>





<div className="flex justify-between">

  {/* Google */}
  <Button
    type="button"
    variant="secondary"
    onPress={handleGoogle}
    className="h-12 w-full rounded-xl border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
  >
    <FaGoogle className="mr-2 h-5 w-5 text-[#4285F4]" />
    Google
  </Button>

  {/* GitHub */}
  <Button
    type="button"
    variant="secondary"
    onPress={handleGitHub}
    className="h-12   rounded-xl border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
  >
    <FaGithub className="mr-2 h-5 w-5 text-black" />
    GitHub
  </Button>

</div>




          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/sign-in")}
              className="font-semibold text-indigo-600 hover:underline"
            >
              Sign In
            </button>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignUp;