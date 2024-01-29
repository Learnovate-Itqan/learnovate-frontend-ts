import { AppStoreButton } from "@/components/ui/AppStoreButton";
import { Button } from "@/components/ui/Button";
import { PlayStoreButton } from "@/components/ui/PlayStoreButton";

export default function HeroSection() {
  return (
    <section className="hero min-h-dvh bg-contain px-20 bg-right bg-no-repeat bg-dark-navy flex justify-start items-center">
      <main className=" text-white w-1/2 grid gap-8 ">
        <h1 className="text-6xl font-bold ">
          <span className="block">Choose your </span>
          <span className="block">
            <span className=" text-royal-blue">tech</span> road with
          </span>
          <span className="block"> industry experts </span>
        </h1>
        <p className="w-2/3 leading-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis elit a arcu laoreet cursus eu sit amet
          ipsum.{" "}
        </p>
        <div className="w-1/4">
          <Button text="Get Start" type="button" />
        </div>
        <div className="flex gap-4">
          <AppStoreButton />
          <PlayStoreButton />
        </div>
      </main>
    </section>
  );
}
