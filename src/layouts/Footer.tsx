import { Link } from "react-router-dom";

import { SubscribeEmailInput } from "@/components/ui/SubscribeEmailInput";

import Logo from "../assets/logo-full-white-text.svg";

export function Footer() {
  return (
    <footer className=" bg-dark-navy px-44 py-16 text-white">
      <main className="grid grid-cols-6 my-5">
        <aside>
          <img src={Logo} alt="Learnovate Logo" className="w-2/3" />
        </aside>
        <aside className="">
          <h1>Welcome</h1>
          <ul className=" my-5 gap-2 opacity-75 grid">
            <Link to="/">Employee</Link>
            <Link to="/">Payroll</Link>
            <Link to="/">Absences</Link>
            <Link to="/">Time tracking</Link>
            <Link to="/">Shift planner</Link>
            <Link to="/">Recruiting</Link>
          </ul>
        </aside>
        <aside className="">
          <h1>Information</h1>
          <ul className=" my-5 gap-2 opacity-75 grid">
            <Link to="/">FAQ</Link>
            <Link to="/">Blog</Link>
            <Link to="/">Support</Link>
          </ul>
        </aside>
        <aside className="">
          <h1>Company</h1>
          <ul className=" my-5 gap-2 opacity-75 grid">
            <Link to="/">About us</Link>
            <Link to="/">Terms of use</Link>
            <Link to="/">Privacy policy</Link>
            <Link to="/">Contact us</Link>
          </ul>
        </aside>
        <aside className=" -translate-y-10 col-span-2 grid gap-3 bg-white/10 p-11">
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
