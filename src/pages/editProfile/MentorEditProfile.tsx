import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ImageUploader } from "@/components/ui/ImageUploader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { changePasswordSchema } from "@/schemas/changePasswordSchema";
import { BasicInfoFormSchema, ProSectionSchema, SocialMediaSchema } from "@/schemas/mentorSchema";

import { ContactsForm } from "./components/ContactsFrom";
import { MentorBasicInfo } from "./components/MentorBasicInfo";
import { MentorEducationInfo } from "./components/MentorEducationInfo";
import { PasswordForm } from "./components/PasswordForm";

export type TMentorEditProfileForm = z.infer<typeof BasicInfoFormSchema> &
  z.infer<typeof changePasswordSchema> &
  z.infer<typeof ProSectionSchema> &
  z.infer<typeof SocialMediaSchema>;

export function MentorEditProfile() {
  const editForm = useForm<TMentorEditProfileForm>({
    resolver: zodResolver(
      BasicInfoFormSchema.extend(ProSectionSchema.shape)
        .extend(SocialMediaSchema.shape)
        .and(changePasswordSchema)
    ),
    defaultValues: {
      name: "",
      email: "",
      mobileNumber: "",
      country: "",
      city: "",
      languages: [],
      workExp: "",
      education: "",
      experience: "",
      about: "",
      title: "",
      facebook: "",
      linkedIn: "",
      github: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      cv: undefined,
      image: undefined,
      dateOfBirth: undefined,
    },
  });

  async function handleBasicInfoSubmit(data: TMentorEditProfileForm) {
    console.log("submitted", data);
  }
  return (
    <main className=" container py-10">
      <header className="mb-5">
        <h1 className="text-3xl font-semibold">Edit Profile</h1>
      </header>
      <main>
        <Form {...editForm}>
          <form className="grid lg:grid-cols-[250px_1fr] gap-10" onSubmit={editForm.handleSubmit(handleBasicInfoSubmit)}>
            <aside className="flex flex-col items-center gap-2 mb-10 ">
              <FormField
                control={editForm.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUploader className="w-40 h-40" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h1 className="font-semibold text-2xl">Kareem Khalaf</h1>
              <p className="text-zinc-400">Kareemkhalaf1722@gmail.com</p>
            </aside>
            <section className=" space-y-10">
              <div>
                <header>
                  <h1 className="text-xl font-semibold">Basic Information</h1>
                  <hr className="my-2 bg-zinc-300" />
                </header>
                <MentorBasicInfo form={editForm} />
              </div>
              <div>
                <header>
                  <h1 className="text-xl font-semibold">Password</h1>
                  <hr className="my-2 bg-zinc-300" />
                </header>
                <PasswordForm form={editForm} />
              </div>
              <div>
                <header>
                  <h1 className="text-xl font-semibold">Education</h1>
                  <hr className="my-2 bg-zinc-300" />
                </header>
                <MentorEducationInfo form={editForm} />
              </div>
              <div>
                <header>
                  <h1 className="text-xl font-semibold">Contacts</h1>
                  <hr className="my-2 bg-zinc-300" />
                </header>
                <ContactsForm form={editForm} />
              </div>
              <footer className="flex items-center justify-end gap-2">
                <Button type="reset" variant={"ghost"} className="text-royal-blue hover:text-royal-blue/80">
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </footer>
            </section>
          </form>
        </Form>
      </main>
    </main>
  );
}
