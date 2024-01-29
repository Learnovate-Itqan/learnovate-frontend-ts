import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import OtpInput from "react-otp-input";
import { Navigate, useNavigate } from "react-router-dom";

import { FromError } from "@/components/FormError";
import { FromSuccess } from "@/components/FormSuccess";
import { Button } from "@/components/ui/Button";
import { usePostData } from "@/hooks/useApi";
import { useTitle } from "@/hooks/useTitle";
import { AuthLayout } from "@/layouts/AuthLayout";
import { authErrorSchema } from "@/schemas/authError";

export function VerificationPage() {
  const resetEmail = localStorage.getItem("reset-email");
  useTitle("Learnovate | Verification");
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string[] | undefined>([]);
  const [success, setSuccess] = useState<string | undefined>("");
  const resetMutation = usePostData("/auth/forgot-password");
  const verificationMutation = usePostData("/auth/verify/password-reset-code");

  const handleResend = async () => {
    if (!resetEmail) {
      toast.error("Something went wrong!");
      return;
    }
    setSending(true);
    const loadingToast = toast.loading(`sending reset code ...`);
    const state = await resetMutation.mutateAsync({ email: resetEmail });
    if (state.status === "failed") {
      toast.dismiss(loadingToast);
      const errors = authErrorSchema.safeParse(state.data.errors);
      if (errors.success === true) {
        const errorMsg = errors.data.map((error) => error.msg.toLocaleLowerCase());
        toast.error(errorMsg.join(", "));
      } else setError(["Something went wrong!"]);
      setSending(false);
      return;
    }

    toast.dismiss(loadingToast);
    toast.success("reset code sent to your email address!");
    setSending(false);
  };

  const handleVerify = async () => {
    if (otp.length === 0) {
      setError(["verification code is required!"]);
      return;
    } else if (otp.length !== 6) {
      setError(["invalid code!"]);
      return;
    }
    setError(undefined);
    setSuccess(undefined);
    setLoading(true);
    const state = await verificationMutation.mutateAsync({ resetCode: otp });
    if (state.status === "failed") {
      const errors = authErrorSchema.safeParse(state.data.errors);
      if (errors.success === true) {
        const errorMsg = errors.data.map((error) => error.msg.toLocaleLowerCase());
        setError(errorMsg);
      } else setError(["Something went wrong!"]);
      setLoading(false);
      return;
    }

    setSuccess("verification successful!");
    setLoading(false);
    setOtp("");
    setTimeout(() => {
      navigate("/auth/reset-password");
    }, 1000);
  };

  if (!resetEmail) {
    return <Navigate to="/auth/forgot-password" />;
  }

  return (
    <AuthLayout title="Verification" subTitle="Please enter the code we sent to your email address">
      <div className="my-6 space-y-5">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType="number"
          renderInput={(props) => <input {...props} />}
          placeholder="------"
          containerStyle={"flex gap-2.5 xs:gap-4 sm:gap-2 md:gap-4"}
          inputStyle={
            "bg-[#222C54] border border-royal-blue p-2 text-white !w-10 !h-10 xs:!w-12 xs:!h-12 sm:!w-16 sm:!h-16 lg:!w-12 lg:!h-12 xl:!w-14 xl:!h-14 rounded-md font-medium text-2xl xs:text-3xl sm:text-4xl md:text-3xl xl:text-4xl"
          }
        />
        <div className="">
          <p className="text-zinc-400">
            <span>{"Didn’t get a code?"}</span>{" "}
            <button className="font-medium text-royal-blue" onClick={handleResend} disabled={sending}>
              Resend
            </button>
          </p>
        </div>
        {error && <FromError messages={error} />}
        {success && <FromSuccess message={success} />}
        <Button text="Confirm" type="button" onClick={handleVerify} isLoading={loading} disabled={loading} />
      </div>
      <Toaster />
    </AuthLayout>
  );
}
