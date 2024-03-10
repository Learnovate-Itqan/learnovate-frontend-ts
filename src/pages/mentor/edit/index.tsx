import { BasicInfoForm } from "./components/basicInfoForm";
import { CVFrom } from "./components/cvForm";
import { Header } from "./components/header";
import { ImageForm } from "./components/imageForm";
import { ProForm } from "./components/proForm";

export const MentorEditPage = () => {
  return (
    <main className="w-full py-6 space-y-4">
      <Header />
      <div className="container flex gap-4">
        <div className="basis-1/2 space-y-6">
          <div className="bg-gray-200 p-4 rounded-lg flex gap-4 shadow-lg">
            <ImageForm />
            <BasicInfoForm />
          </div>
          <CVFrom />
        </div>
        <div className="basis-1/2">
          <ProForm />
        </div>
      </div>
    </main>
  );
};
