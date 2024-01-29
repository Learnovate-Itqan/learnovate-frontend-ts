import { z } from "zod";
import { useTitle } from "@/hooks/useTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginResponseSchema } from "@/schemas/login";
import { OrSeparator } from "@/components/ui/OrSeparator";
import { SocialButton } from "@/components/ui/SocialButton";
import { AuthLayout } from "@/layouts/AuthLayout";
import { InputField } from "@/components/ui/InputField";
import { FieldError } from "@/components/auth/FieldError";
import { TrueIcon } from "@/components/icons/TrueIcon";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { FromError } from "@/components/FormError";
import { FromSuccess } from "@/components/FormSuccess";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { postRequest, usePostData } from "@/hooks/useApi";
import { authErrorSchema } from "@/schemas/authError";
import { encrypt } from "@/utils/crypto";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";

export function LoginPage() {
  useTitle("Learnovate | Login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string[] | undefined>([]);
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const login = usePostData<z.infer<typeof loginSchema>>("/auth/login");

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      try {
        const { code: token } = codeResponse;
        const data = await postRequest("/auth/continue-with-google", { token });
        console.log(data);
        setSuccess("Login successful!");
      } catch (error) {
        setError(["Something went wrong!"]);
        console.log(error);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof loginSchema>) => {
    // reset error and success
    setError([]);
    setSuccess("");

    // extract email and password from values
    const { email, password } = values;

    // send request
    const state = await login.mutateAsync({ email, password });

    // handle response errors
    if (state.status === "failed") {
      const errors = authErrorSchema.safeParse(state.data.errors);
      if (errors.success === true) {
        const errorMsg = errors.data.map((error) => error.msg.toLocaleLowerCase());
        setError(errorMsg);
      } else setError(["Something went wrong!"]);
      return;
    }

    // handle response success, parse it and store token in local storage
    const response = loginResponseSchema.safeParse(state.data);
    if (response.success) {
      const { accessToken, data } = response.data;
      const encryptedToken = encrypt(accessToken, import.meta.env.VITE_TOKEN_SECRET);
      localStorage.setItem("token", encryptedToken);
      dispatch(setUser({ ...data, authStatus: true }));
      setSuccess("Login successful!");
      reset();
      navigate("/");
      return;
    }
    setError(["something went wrong!"]);
  };

  return (
    <AuthLayout title="Welcome Back" subTitle="Welcome back! Please enter your details.">
      <div className="my-6 space-y-4">
        <SocialButton text="Log in with Google" onClick={() => googleLogin()} />
        <OrSeparator />
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-5">
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
              <label className="flex cursor-pointer items-center gap-2" htmlFor="rememberMe">
                <div className="relative flex w-fit cursor-pointer items-center rounded-full">
                  <input
                    {...register("rememberMe")}
                    type="checkbox"
                    id="rememberMe"
                    disabled={isSubmitting}
                    className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-[0.1rem] border-zinc-400 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-10 before:w-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-royal-blue checked:bg-royal-blue checked:before:bg-royal-blue hover:before:opacity-10"
                  />
                  <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <TrueIcon className="h-3.5 w-3.5" />
                  </span>
                </div>
                <span className="select-none text-zinc-400">Remember me</span>
              </label>
              <Link to="/auth/forgot-password" className="font-medium text-royal-blue">
                Forgot Password?
              </Link>
            </div>
            {error && <FromError messages={error} />}
            {success && <FromSuccess message={success} />}
            <Button type="submit" text="Log In" disabled={isSubmitting} isLoading={isSubmitting} />
          </div>
        </form>
        <div className="text-balance text-center text-sm text-zinc-400">
          <span>Don't have an account?</span>{" "}
          <Link to="/auth/register" className="font-medium text-royal-blue">
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
