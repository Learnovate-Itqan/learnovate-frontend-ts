import { useForm } from "react-hook-form";

import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type TFormValues = {
  search: string;
};

export const Search = () => {
  const form = useForm({ defaultValues: { search: "" } });
  const handleFormSubmit = (values: TFormValues) => {
    console.log(values);
    form.reset();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormControl>
                <Input
                  {...field}
                  autoComplete="off"
                  type="text"
                  placeholder="Search"
                  className="w-full rounded-lg bg-[#313E6B] py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 border-none text-white"
                />
              </FormControl>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
