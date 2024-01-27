import { useTitle } from "@/hooks/useTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/schemas/resetPassword";
import { z } from "zod";
import { AuthLayout } from "@/layouts/AuthLayout";
import { InputField } from "@/components/ui/InputField";
import { FieldError } from "@/components/auth/FieldError";
import { Button } from "@/components/ui/Button";

export function ResetPassword() {
  useTitle("Learnovate | Reset Password");
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

  const handleFromSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    console.log(values);
    reset();
  };

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
            <Button text="Send" disabled={isSubmitting} type="submit" />
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
