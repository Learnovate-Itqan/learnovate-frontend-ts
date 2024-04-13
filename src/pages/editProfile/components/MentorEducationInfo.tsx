import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PdfUploader } from "@/components/ui/PdfUploader";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProSectionSchema } from "@/schemas/mentorSchema";

type MentorEducationInfoProps = {
  handleSubmit: (data: z.infer<typeof ProSectionSchema>) => void;
  data: z.infer<typeof ProSectionSchema>;
};

export const MentorEducationInfo = forwardRef<HTMLFormElement, MentorEducationInfoProps>(
  ({ handleSubmit, data }: MentorEducationInfoProps, ref) => {
    const form = useForm<z.infer<typeof ProSectionSchema>>({
      resolver: zodResolver(ProSectionSchema),
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
          <div className=" grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. I am a web developer with 5 years of experience..."
                      className="rounded-lg resize-none border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Education</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. Bachelor's degree in Computer Science from X University."
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
              name="workExp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work experience</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. Worked at ABC Tech as a Senior Frontend Developer"
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
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience in years</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. 5 years"
                      type="number"
                      className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. Web Developer"
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
              name="cv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CV/Resume</FormLabel>
                  <FormControl>
                    <PdfUploader {...field} />
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
