import Hero from "@/assets/home/landing-page.png";
import { AppStoreButton } from "@/components/ui/AppStoreButton";
import { Button } from "@/components/ui/Button";
import { PlayStoreButton } from "@/components/ui/PlayStoreButton";

export default function HeroSection() {
  return (
    <section className="relative flex justify-start items-center py-24 min-h-dvh bg-gradient-to-b from-dark-navy via-dark-navy/90 to-dark-navy/80 md:from-transparent md:to-transparent md:via-transparent md:bg-dark-navy ">
      <div
        style={{
          backgroundImage: `url(${Hero})`,
        }}
        className="hidden md:block bg-dark-navy inset-0 absolute bg-cover bg-right bg-no-repeat "
      />
      <main className="container text-white text-center md:text-left grid gap-5 xs:gap-8 z-20">
        <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl font-bold ">
          <span className="block">Choose your </span>
          <span className="block">
            <span className=" text-royal-blue">tech</span> road with
          </span>
          <span className="block"> industry experts </span>
        </h1>
        <p className="md:w-2/3 text-balance leading-6 max-w-[750px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis elit a arcu laoreet cursus eu sit amet
          ipsum.{" "}
        </p>
        <div className="md:w-1/4 md:max-w-48 min-w-36">
          <Button text="Get Start" type="button" />
        </div>
        <div className="flex flex-col xs:flex-row gap-2 justify-center md:justify-start sm:gap-4">
          <AppStoreButton />
          <PlayStoreButton />
        </div>
      </main>
    </section>
  );
}
