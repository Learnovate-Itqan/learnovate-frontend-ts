import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SocialMediaSchema } from "@/schemas/mentorSchema";

type ContactsFormProps = {
  handleSubmit: (data: z.infer<typeof SocialMediaSchema>) => void;
  data: z.infer<typeof SocialMediaSchema>;
};

export const ContactsForm = forwardRef<HTMLFormElement, ContactsFormProps>(
  ({ handleSubmit, data }: ContactsFormProps, ref) => {
    const form = useForm<z.infer<typeof SocialMediaSchema>>({
      resolver: zodResolver(SocialMediaSchema),
      defaultValues: data,
    });
    const { isSubmitting } = form.formState;

    return (
      <Form {...form}>
        <form
          ref={ref}
          className={` min-w-full flex flex-col justify-between h-full`}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className=" flex flex-col gap-4 grow">
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. www.facebook.com/Learnovate"
                      type="text"
                      className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. LinkedIn.com/learnovate"
                      type="text"
                      className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. Github.com/learnovate"
                      type="string"
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
