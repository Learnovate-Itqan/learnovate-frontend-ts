import { useTitle } from "@/hooks/useTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/schemas/forgotPassword";
import { z } from "zod";
import { AuthLayout } from "@/layouts/AuthLayout";
import { InputField } from "@/components/ui/InputField";
import { FieldError } from "@/components/auth/FieldError";
import { Button } from "@/components/ui/Button";

export function ForgotPassword() {
  useTitle("Learnovate | Forgot Password");
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

  const handleFromSubmit = (values: z.infer<typeof forgotPasswordSchema>) => {
    console.log(values);
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
            <Button text="Send" disabled={isSubmitting} type="submit" />
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
