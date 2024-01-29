import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { FromError } from "@/components/FormError";
import { FromSuccess } from "@/components/FormSuccess";
import { FieldError } from "@/components/auth/FieldError";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { usePostData } from "@/hooks/useApi";
import { useTitle } from "@/hooks/useTitle";
import { AuthLayout } from "@/layouts/AuthLayout";
import { authErrorSchema } from "@/schemas/authError";
import { forgotPasswordSchema } from "@/schemas/forgotPassword";

export function ForgotPassword() {
  useTitle("Learnovate | Forgot Password");
  const navigate = useNavigate();
  const [error, setError] = useState<string[] | undefined>([]);
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const forgetMutation = usePostData("/auth/forgot-password");

  const handleFromSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    const state = await forgetMutation.mutateAsync(values);
    if (state.status === "failed") {
      const errors = authErrorSchema.safeParse(state.data.errors);
      if (errors.success === true) {
        const errorMsg = errors.data.map((error) => error.msg.toLocaleLowerCase());
        setError(errorMsg);
      } else setError(["Something went wrong!"]);
      return;
    }

    setSuccess("reset password code sent to your email address!");
    localStorage.setItem("reset-email", values.email);
    setTimeout(() => {
      navigate("/auth/verification");
    }, 700);
    reset();
  };

  return (
    <AuthLayout title="Forget Password?" subTitle="Enter your email address to receive security code.">
      <div className="my-6 space-y-4">
        <form onSubmit={handleSubmit(handleFromSubmit)}>
          <div className="space-y-6">
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
            {error && <FromError messages={error} />}
            {success && <FromSuccess message={success} />}
            <Button text="Send" disabled={isSubmitting} type="submit" isLoading={isSubmitting} />
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
