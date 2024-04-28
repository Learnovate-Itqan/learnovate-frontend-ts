import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { ImageUploader } from "@/components/ui/ImageUploader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { RootState } from "@/redux/store";
import { changePasswordSchema } from "@/schemas/changePasswordSchema";
import { SocialMediaSchema } from "@/schemas/mentorSchema";
import { studentBasicInfoFormSchema } from "@/schemas/studentSchema";

import { ContactsForm } from "./components/ContactsFrom";
import { PasswordForm } from "./components/PasswordForm";
import { StudentBasicInfo } from "./components/StudentBasicInfo";

export type TStudentEditProfileForm = z.infer<typeof studentBasicInfoFormSchema> &
  z.infer<typeof changePasswordSchema> &
  z.infer<typeof SocialMediaSchema>;

export function StudentEditProfile() {
  const user = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const editForm = useForm<TStudentEditProfileForm>({
    resolver: zodResolver(studentBasicInfoFormSchema.extend(SocialMediaSchema.shape).and(changePasswordSchema)),
    defaultValues: {
      name: "",
      email: "",
      mobileNumber: "",
      country: "",
      city: "",
      education: "",
      gradYear: undefined,
      facebook: "",
      linkedIn: "",
      github: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      image: user.image,
      dateOfBirth: undefined,
    },
  });

  async function handleBasicInfoSubmit(data: TStudentEditProfileForm) {
    console.log("submitted", data);
  }
  return (
    <main className=" container py-10">
      <header className="mb-5">
        <h1 className="text-3xl font-semibold">Edit Profile</h1>
      </header>
      <main>
        <Form {...editForm}>
          <form
            className="grid lg:grid-cols-[250px_1fr] gap-10"
            onSubmit={editForm.handleSubmit(handleBasicInfoSubmit)}
          >
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

              <h1 className="font-semibold text-2xl">{user.name}</h1>
              <p className="text-zinc-400">{user.email}</p>
            </aside>
            <section className=" space-y-10">
              <div>
                <header>
                  <h1 className="text-xl font-semibold">Basic Information</h1>
                  <hr className="my-2 bg-zinc-300" />
                </header>
                <StudentBasicInfo form={editForm} />
              </div>
              <div>
                <header>
                  <h1 className="text-xl font-semibold">Password</h1>
                  <hr className="my-2 bg-zinc-300" />
                </header>
                <PasswordForm form={editForm} formType={{} as TStudentEditProfileForm} />
              </div>

              <div>
                <header>
                  <h1 className="text-xl font-semibold">Contacts</h1>
                  <hr className="my-2 bg-zinc-300" />
                </header>
                <ContactsForm form={editForm} formType={{} as TStudentEditProfileForm} />
              </div>
              <footer className="flex items-center justify-end gap-2">
                <Button
                  type="reset"
                  variant={"ghost"}
                  className="text-royal-blue hover:text-royal-blue/80"
                  onClick={() => navigate("/profile")}
                >
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
