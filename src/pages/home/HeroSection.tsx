import Hero from "@/assets/home/landing-page.png";
import { AppStoreButton } from "@/components/ui/AppStoreButton";
import { Button } from "@/components/ui/Button";
import { PlayStoreButton } from "@/components/ui/PlayStoreButton";

export default function HeroSection() {
  return (
    <section className="relative min-h-dvh px-20 bg-gradient-to-b from-dark-navy via-dark-navy/90 to-dark-navy/80 md:from-transparent md:to-transparent md:via-transparent md:bg-dark-navy flex justify-start items-center">
      <div
        style={{
          backgroundImage: `url(${Hero})`,
        }}
        className="hidden md:block bg-dark-navy inset-0 absolute z-10 bg-cover bg-right bg-no-repeat "
      />
      <main className=" text-white md:w-2/3 lg:w-1/2 grid gap-8 z-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-xl ">
          <span className="block">Choose your </span>
          <span className="block">
            <span className=" text-royal-blue">tech</span> road with
          </span>
          <span className="block"> industry experts </span>
        </h1>
        <p className="sm:w-2/3 leading-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis elit a arcu laoreet cursus eu sit amet
          ipsum.{" "}
        </p>
        <div className="w-1/4 min-w-36">
          <Button text="Get Start" type="button" />
        </div>
        <div className="flex gap-2 sm:gap-4">
          <AppStoreButton />
          <PlayStoreButton />
        </div>
      </main>
    </section>
  );
}
