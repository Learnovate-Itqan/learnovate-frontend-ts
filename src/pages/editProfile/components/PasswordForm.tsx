import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { changePasswordSchema } from "@/schemas/changePasswordSchema";
import { BasicInfoFormSchema } from "@/schemas/mentorSchema";

type PasswordFormProps = {
  handleSubmit: (data: z.infer<typeof changePasswordSchema>) => void;
};

export const PasswordForm = forwardRef<HTMLFormElement, PasswordFormProps>(
  ({ handleSubmit }: PasswordFormProps, ref) => {
    const form = useForm<z.infer<typeof changePasswordSchema>>({
      resolver: zodResolver(BasicInfoFormSchema),
      defaultValues: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    });
    const { isSubmitting } = form.formState;
    return (
      <Form {...form}>
        <form
          ref={ref}
          className={` min-w-full flex flex-col justify-between h-full`}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className=" grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="*************"
                      type="password"
                      className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      type="password"
                      className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      type="password"
                      className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    );
  }
);
