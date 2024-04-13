import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ImageUploader } from "@/components/ui/ImageUploader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { changePasswordSchema } from "@/schemas/changePasswordSchema";
import { imageFormSchema } from "@/schemas/imageSchema";
import { BasicInfoFormSchema, ProSectionSchema, SocialMediaSchema } from "@/schemas/mentorSchema";

import { ContactsForm } from "./components/ContactsFrom";
import { MentorBasicInfo } from "./components/MentorBasicInfo";
import { MentorEducationInfo } from "./components/MentorEducationInfo";
import { PasswordForm } from "./components/PasswordForm";

export function MentorEditProfile() {
  const imageFormRef = useRef<HTMLFormElement>(null);
  const basicInfoRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLFormElement>(null);
  const educationInfoRef = useRef<HTMLFormElement>(null);
  const passwordRef = useRef<HTMLFormElement>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [basicInfo, setBasicInfo] = useState<z.infer<typeof BasicInfoFormSchema>>({
    name: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: new Date(),
    country: "",
    city: "",
    languages: [],
  });
  const [educationInfo, setEducationInfo] = useState<z.infer<typeof ProSectionSchema>>({
    workExp: "",
    education: "",
    experience: "",
    about: "",
    title: "",
    cv: undefined,
  });
  const [contactInfo, setContactInfo] = useState<z.infer<typeof SocialMediaSchema>>({
    facebook: "",
    linkedIn: "",
    github: "",
  });
  const [password, setPassword] = useState<z.infer<typeof changePasswordSchema>>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const imageForm = useForm<z.infer<typeof imageFormSchema>>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: undefined,
  });

  async function handleBasicInfoSubmit() {
    if (!imageFormRef.current) return;
    await imageFormRef.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    if (!basicInfoRef.current) return;
    await basicInfoRef.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    if (!passwordRef.current) return;
    await passwordRef.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    if (!educationInfoRef.current) return;
    await educationInfoRef.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    if (!contactInfoRef.current) return;
    await contactInfoRef.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    console.log(basicInfoRef.current?.checkValidity());

    // await educationInfoRef.current?.requestSubmit();
    // await contactInfoRef.current?.requestSubmit();
    console.log("submitted", { image, basicInfo, password, educationInfo, contactInfo });
  }
  return (
    <main className=" container py-10">
      <header className="mb-5">
        <h1 className="text-3xl font-semibold">Edit Profile</h1>
      </header>
      <main className="grid">
        
        <aside className="flex flex-col justify-center items-center gap-2 mb-10">
          <Form {...imageForm}>
            <form ref={imageFormRef} onSubmit={imageForm.handleSubmit((data) => setImage(data.image))}>
              <FormField
                control={imageForm.control}
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
            </form>
          </Form>

          <h1 className="font-semibold text-2xl">Kareem Khalaf</h1>
          <p className="text-zinc-400">Kareemkhalaf1722@gmail.com</p>
        </aside>
        <section className=" space-y-10">
          <div>
            <header>
              <h1 className="text-xl font-semibold">Basic Information</h1>
              <hr className="my-2 bg-zinc-300" />
            </header>
            <MentorBasicInfo
              ref={basicInfoRef}
              handleSubmit={(data) => {
                console.log("submitBasicInfo");
                setBasicInfo(data);
              }}
              data={basicInfo}
            />
          </div>
          <div>
            <header>
              <h1 className="text-xl font-semibold">Password</h1>
              <hr className="my-2 bg-zinc-300" />
            </header>
            <PasswordForm ref={passwordRef} handleSubmit={(data) => setPassword(data)} />
          </div>
          <div>
            <header>
              <h1 className="text-xl font-semibold">Education</h1>
              <hr className="my-2 bg-zinc-300" />
            </header>
            <MentorEducationInfo
              ref={educationInfoRef}
              handleSubmit={(data) => {
                console.log("submitBasicInfo");
                setEducationInfo(data);
              }}
              data={educationInfo}
            />
          </div>
          <div>
            <header>
              <h1 className="text-xl font-semibold">Contacts</h1>
              <hr className="my-2 bg-zinc-300" />
            </header>
            <ContactsForm ref={contactInfoRef} handleSubmit={(data) => setContactInfo(data)} data={contactInfo} />
          </div>
          <footer className="flex items-center justify-end gap-2">
            <Button type="reset" variant={"ghost"} className="text-royal-blue hover:text-royal-blue/80">
              Cancel
            </Button>
            <Button type="button" onClick={handleBasicInfoSubmit}>
              Save Changes
            </Button>
          </footer>
        </section>
      </main>
    </main>
  );
}
