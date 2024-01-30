import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";

import { FromError } from "@/components/FormError";
import { FieldError } from "@/components/auth/FieldError";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { usePatchData } from "@/hooks/useApi";
import { useTitle } from "@/hooks/useTitle";
import { AuthLayout } from "@/layouts/AuthLayout";
import { setUser } from "@/redux/slices/authSlice";
import { authErrorSchema } from "@/schemas/authError";
import { loginResponseSchema } from "@/schemas/login";
import { resetPasswordSchema } from "@/schemas/resetPassword";
import { encrypt } from "@/utils/crypto";

export function ResetPassword() {
  const [resetEmail] = useState(localStorage.getItem("reset-email"));
  useTitle("Learnovate | Reset Password");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string[] | undefined>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const resetPasswordMutation = usePatchData("/auth/reset-password");

  const handleFromSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    const email = resetEmail;
    const state = await resetPasswordMutation.mutateAsync({ ...values, email });
    if (state.status === "failed") {
      const errors = authErrorSchema.safeParse(state.data.errors);
      if (errors.success === true) {
        const errorMsg = errors.data.map((error) => error.msg.toLocaleLowerCase());
        setError(errorMsg);
      } else setError(["Something went wrong!"]);
      return;
    }

    const response = loginResponseSchema.safeParse(state.data);
    if (response.success) {
      const { accessToken, data } = response.data;
      const encryptedToken = encrypt(accessToken, import.meta.env.VITE_TOKEN_SECRET);
      localStorage.setItem("token", encryptedToken);
      dispatch(setUser({ ...data, authStatus: true }));
      toast.success("password reset successful!, welcome back!", { duration: 3000 });
      localStorage.removeItem("reset-email");
      reset();
      navigate("/");
      return;
    }
    setError(["something went wrong!"]);
  };

  if (!resetEmail) {
    return <Navigate to="/auth/forgot-password" />;
  }

  return (
    <AuthLayout title="Forget Password?" subTitle="Enter your email address to receive security code.">
      <div className="my-6 space-y-4">
        <form onSubmit={handleSubmit(handleFromSubmit)}>
          <div className="space-y-5">
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
            <div className="space-y-2">
              <InputField
                {...register("confirmPassword")}
                type="password"
                label="Confirm Password"
                placeholder="repeat your password"
                disabled={isSubmitting}
              />
              {errors.confirmPassword && <FieldError message={errors.confirmPassword.message} />}
            </div>
            {error && <FromError messages={error} />}
            <Button text="Send" disabled={isSubmitting} type="submit" isLoading={isSubmitting} />
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
