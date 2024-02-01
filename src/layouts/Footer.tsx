import { Link } from "react-router-dom";

import { SubscribeEmailInput } from "@/components/ui/SubscribeEmailInput";

import Logo from "../assets/logo-full-white-text.svg";

export function Footer() {
  return (
    <footer className=" bg-dark-navy md:px-44 lg:px-10 xl:px-44  px-10 py-16 text-white">
      <main className="flex flex-col gap-5 justify-left items-left md:grid lg:grid-cols-6 my-5">
        <aside className="">
          <img src={Logo} alt="Learnovate Logo" className="md:w-2/3 w-1/3" />
        </aside>
        <aside className="">
          <h1>Welcome</h1>
          <ul className=" md:my-5 gap-x-3 flex flex-wrap">
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Employee
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Payroll
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Absences
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Time tracking
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Shift planner
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Recruiting
            </Link>
          </ul>
        </aside>
        <aside className="">
          <h1>Information</h1>
          <ul className=" md:my-5 gap-2 opacity-75 flex flex-wrap">
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              FAQ
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Blog
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Support
            </Link>
          </ul>
        </aside>
        <aside className="">
          <h1>Company</h1>
          <ul className=" md:my-5 gap-2 opacity-75 flex flex-wrap">
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              About us
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Terms of use
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Privacy policy
            </Link>
            <Link className="opacity-65 hover:opacity-100 transition-colors" to="/">
              Contact us
            </Link>
          </ul>
        </aside>
        <aside className=" lg:-translate-y-16 col-span-2 grid gap-3 my-8 bg-white/10 p-8 ">
          <h1>Subscribe</h1>

          <SubscribeEmailInput />

          <p className="opacity-60 text-sm leading-6">
            Hello, we are Lift Media. Our goal is to translate the positive effects from revolutionizing how companies
            engage with their clients & their team.
          </p>
        </aside>
      </main>
      <footer className=" text-center">
        <hr className="border-neutral-gray/20 border-2 my-5 " />
        <span className="text-sm text-center text-neutral-gray">© 2024 Learnovate | All Rights Reserved</span>
      </footer>
    </footer>
  );
}
