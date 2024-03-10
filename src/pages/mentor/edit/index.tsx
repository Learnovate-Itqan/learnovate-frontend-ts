import { BasicInfoForm } from "./components/basicInfoForm";
import { Header } from "./components/header";
import { ImageForm } from "./components/imageForm";

export const MentorEditPage = () => {
  return (
    <main className="w-full py-6 space-y-4">
      <Header />
      <div className="container flex gap-4">
        <div className="basis-1/2">
          <div className="bg-gray-200 p-4 rounded-lg flex gap-4">
            <ImageForm />
            <BasicInfoForm />
          </div>
        </div>
        {/* <div className="basis-1/2">csasca</div> */}
      </div>
    </main>
  );
};
