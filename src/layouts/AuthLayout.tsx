import { ReactNode } from "react";
import logoInline from "@/assets/logo-inline.webp";
import background from "@/assets/auth/backgroud.webp";
import person1 from "@/assets/auth/person01.webp";
import person2 from "@/assets/auth/person02.webp";
import { Link } from "react-router-dom";

type TPersonCircleProps = {
  className?: string;
  src: string;
};

const PersonCircle = ({ className, src }: TPersonCircleProps) => (
  <div
    className={`h-10 w-10 overflow-hidden rounded-full border-[0.15rem] border-dark-navy bg-stone-300 md:h-12 md:w-12 ${className}`}
  >
    <img className="w-full object-cover object-top p-1" src={src} alt="person" title="person" loading="lazy" />
  </div>
);

type TAuthLayoutProps = {
  children: ReactNode;
  title: string;
  subTitle: string;
};

export function AuthLayout({ children, title, subTitle }: TAuthLayoutProps) {
  return (
    <main className="flex min-h-screen w-full bg-dark-navy text-white">
      <div className="my-14 basis-full md:basis-6/12 lg:basis-4/12">
        <div className="container flex h-full flex-col justify-between gap-y-6">
          <div className="w-fit">
            <span className="sr-only">learnovate</span>
            <Link to="/">
              <img className="w-48 object-contain" src={logoInline} alt="learnovate" title="learnovate" />
            </Link>
          </div>
          <div>
            <header className="space-y-1">
              <h1 className="text-4xl font-semibold">{title}</h1>
              <p className="text-pretty text-zinc-400">{subTitle}</p>
            </header>
            {children}
          </div>
          <div></div>
        </div>
      </div>
      <div className="relative hidden md:block md:basis-6/12 lg:basis-8/12">
        <img
          className="z-0 h-full w-full object-cover"
          src={background}
          alt="learnovate"
          title="learnovate"
          loading="lazy"
        />
        <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-dark-navy via-transparent to-transparent py-14">
          <div className="container space-y-4">
            <h2 className="flex select-all flex-col text-balance text-3xl font-semibold md:text-4xl lg:text-5xl">
              <span>The Place Where</span>
              <span>You Learn and Innovate.</span>
            </h2>
            <p className="max-w-xl text-pretty text-sm leading-snug md:text-base">
              Lorem ipsum dolor sit amet. Et ipsa quod ea quae perspiciatis ut expedita fugiat est voluptatem sunt quo
              unde dignissimos.
            </p>
            <div className="flex">
              <PersonCircle src={person1} />
              <PersonCircle src={person2} className="-ms-3.5" />
              <PersonCircle src={person1} className="-ms-3.5" />
              <PersonCircle src={person2} className="-ms-3.5" />
              <div className="-ms-3.5 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-[0.15rem] border-dark-navy bg-stone-300 md:h-12 md:w-12">
                <span className="font-semibold text-dark-navy">+14</span>
              </div>
              <div className="ms-2 hidden flex-col justify-center whitespace-nowrap leading-snug md:flex">
                <span>are in</span>
                <span>one place</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
