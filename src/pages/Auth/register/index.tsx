import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { FromError } from "@/components/FormError";
import { FromSuccess } from "@/components/FormSuccess";
import { FieldError } from "@/components/auth/FieldError";
import { TrueIcon } from "@/components/icons/TrueIcon";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { OrSeparator } from "@/components/ui/OrSeparator";
import { SocialButton } from "@/components/ui/SocialButton";
import { globalResponseFormat, postRequest, usePostData } from "@/hooks/useApi";
import { useTitle } from "@/hooks/useTitle";
import { AuthLayout } from "@/layouts/AuthLayout";
import { authErrorSchema } from "@/schemas/authError";
import { registerSchema } from "@/schemas/register";

import { GoogleTempModal } from "../GoogleTempModal";

export function RegisterPage() {
  useTitle("Learnovate | Register");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string[] | undefined>([]);
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "", termsAndPolicy: false },
  });
  const registerReq = usePostData("/auth/signup");

  const googleAuth = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const { code: token } = codeResponse;
      const data = await postRequest("/auth/continue-with-google", { token });
      const response = globalResponseFormat(data);

      if (response.status === "failed") {
        // setError(["Something went wrong!"]);
        console.log({ errorData: response.data });
        setIsModalOpen(true);
        return;
      }

      console.log(response.data);
    },
    onError: (error) => {
      console.log(error);
      setError(["Something went wrong!"]);
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof registerSchema>) => {
    // reset error and success
    setError(undefined);
    setSuccess("");
    // check if termsAndPolicy is checked
    if (!getValues("termsAndPolicy")) {
      setError(["You must agree to the terms and privacy policy."]);
      return;
    }

    // extract values from form
    const { fullName: name, email, password, termsAndPolicy } = values;
    // send request to server
    const state = await registerReq.mutateAsync({
      name,
      email,
      password,
      confirmPassword: password,
      role: "student",
      termsAndPolicy,
    });

    // handle response
    if (state.status === "failed") {
      const errors = authErrorSchema.safeParse(state.data.errors);
      if (errors.success === true) {
        const errorMsg = errors.data.map((error) => error.msg.toLocaleLowerCase());
        setError(errorMsg);
      } else setError(["Something went wrong!"]);
    } else {
      toast.success(state.data.message, { duration: 3000 });
      setSuccess("register successful!");
      navigate("/");
      reset();
    }
  };

  return (
    <AuthLayout title="Sign Up" subTitle="Create your account to get started.">
      <GoogleTempModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className="my-6 space-y-4">
        <SocialButton text="Create With Google" onClick={() => googleAuth()} />
        <OrSeparator />
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-5">
            <div className="space-y-2">
              <InputField
                {...register("fullName")}
                type="text"
                label="Full name"
                placeholder="e.g. John Doe"
                disabled={isSubmitting}
              />
              {errors.fullName && <FieldError message={errors.fullName.message} />}
            </div>
            <div className="space-y-2">
              <InputField
                {...register("email")}
                type="email"
                label="Email"
                placeholder="e.g. example@learnovate.com"
                disabled={isSubmitting}
              />
              {errors.email && <FieldError message={errors.email.message} />}
            </div>
            <div className="space-y-2">
              <InputField
                {...register("password")}
                type="password"
                label="Password"
                placeholder="e.g. ●●●●●●●●"
                disabled={isSubmitting}
              />
              {errors.password && <FieldError message={errors.password.message} />}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <label className="flex cursor-pointer items-center gap-1.5" htmlFor="termsAndPolicy">
                <div className="relative flex w-fit cursor-pointer items-center rounded-full">
                  <input
                    {...register("termsAndPolicy")}
                    type="checkbox"
                    id="termsAndPolicy"
                    disabled={isSubmitting}
                    className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border-[0.1rem] border-zinc-400 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-10 before:w-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-royal-blue checked:bg-royal-blue checked:before:bg-royal-blue hover:before:opacity-10"
                  />
                  <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <TrueIcon className="h-3 w-3" />
                  </span>
                </div>
                <span className="select-none text-sm text-zinc-400">
                  <span>I agree to all</span>{" "}
                  <Link to="/" className="text-royal-blue">
                    Terms and privacy policy
                  </Link>
                </span>
              </label>
            </div>
            {error && <FromError messages={error} />}
            {success && <FromSuccess message={success} />}
            <Button type="submit" text="Create an account" disabled={isSubmitting} isLoading={isSubmitting} />
          </div>
        </form>
        <div className="text-balance text-center text-sm text-zinc-400">
          <span>Already have an account?</span>{" "}
          <Link to="/auth/login" className="font-medium text-royal-blue">
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
