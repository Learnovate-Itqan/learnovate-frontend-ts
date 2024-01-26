import OtpInput from "react-otp-input";
import { useState } from "react";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/Button";

export function VerificationPage() {
  const [otp, setOtp] = useState("");

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
            "bg-[#222C54] border border-royal-blue p-2 text-white !w-10 !h-10 xs:!w-12 xs:!h-12 sm:!w-10 sm:!h-10 lg:!w-12 lg:!h-12 xl:!w-14 xl:!h-14 rounded-md font-medium"
          }
        />
        <div className="">
          <p className="text-zinc-400">
            <span>{"Didn’t get a code?"}</span>{" "}
            <button type="button" className="font-medium text-royal-blue">
              Resend
            </button>
          </p>
        </div>
        <Button text="Confirm" type="button" />
      </div>
    </AuthLayout>
  );
}
