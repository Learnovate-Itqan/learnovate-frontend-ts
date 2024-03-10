import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const BasicInfoFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(100, { message: "Name is too long" }),
  title: z.string().min(1, { message: "Title is required" }).max(100, { message: "Title is too long" }),
  bio: z.string().min(1, { message: "Bio is required" }).max(1000, { message: "Bio is too long" }),
});

export const BasicInfoForm = () => {
  const form = useForm<z.infer<typeof BasicInfoFormSchema>>({
    resolver: zodResolver(BasicInfoFormSchema),
    defaultValues: {
      name: "Micheal John",
      title: "Front End Developer",
      bio: "A passionate and creative frontend developer with a keen eye for design and user experience.",
    },
  });
  const { isSubmitting } = form.formState;

  const handleFormSubmit = (values: z.infer<typeof BasicInfoFormSchema>) => {
    console.log(values);
  };
  return (
    <div className="flex-grow">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <div className="space-y-2 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="ps-3">name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} placeholder="e.g. John Doe" type="text" className="" />
                  </FormControl>
                  <FormMessage className="ps-3 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="ps-3">Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. Front End Developer"
                      type="text"
                      className=""
                    />
                  </FormControl>
                  <FormMessage className="ps-3 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="ps-3">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. A passionate and creative frontend developer with a keen eye for design and user experience."
                      className=""
                    />
                  </FormControl>
                  <FormMessage className="ps-3 text-xs" />
                </FormItem>
              )}
            />
            <div className="pt-2">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Loading..." : "Update"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
