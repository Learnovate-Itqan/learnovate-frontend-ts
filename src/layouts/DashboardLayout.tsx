import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BsGrid1X2, BsPeople } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { PiBooksBold } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

import { UserAvatar } from "@/components/ui/UserAvatar";
import { usePostData } from "@/hooks/useApi";
import { resetUser } from "@/redux/slices/authSlice";

import Logo from "../assets/logo-inline.webp";

export function DashboardLayout() {
  const dispatcher = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutRequest = usePostData("/auth/logout");

  const logout = async () => {
    const toastId = toast.loading("Logging out...");
    const token = localStorage.getItem("token");
    if (!token) return;
    console.log(token);
    const response = await logoutRequest.mutateAsync({ token });
    console.log(response);
    if (response?.status === "success") {
      queryClient.clear();
      localStorage.removeItem("token");
      dispatcher(resetUser());
      queryClient.invalidateQueries({
        queryKey: ["/nav"],
      });
      toast.success("Logged out successfully", { id: toastId });
      navigate("/");
    } else {
      toast.error("Something went wrong, please try again later", { id: toastId });
    }
  };
  return (
    <main className="grid grid-cols-[300px_1fr] min-h-dvh">
      <nav className="bg-dark-navy text-white px-3 py-10 flex flex-col">
        <Link to={"/"}>
          <img src={Logo} alt="Learnovate-Logo" className="w-48 px-2" loading="lazy" />
        </Link>
        <ul className="mt-10 grid gap-1 *:w-full *:dashboard">
          <li>
            <NavLink
              to={"main"}
              className="flex justify-start items-center gap-3 py-4 px-3  rounded-xl w-full active:bg-[#293560] hover:bg-[#293560]/50"
            >
              <BsGrid1X2 className="inline-block" size={22} />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"courses"}
              className={
                "flex justify-start items-center gap-3 py-4 px-3  rounded-xl w-full active:bg-[#293560] hover:bg-[#293560]/50"
              }
            >
              <PiBooksBold className="inline-block " size={22} />
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"mentors"}
              className={
                "flex justify-start items-center gap-3 py-4 px-3  rounded-xl w-full active:bg-[#293560] hover:bg-[#293560]/50"
              }
            >
              <BsPeople className="inline-block " size={22} />
              Mentors
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"orders-list"}
              className={
                "flex justify-start items-center gap-3 py-4 px-3  rounded-xl w-full active:bg-[#293560] hover:bg-[#293560]/50"
              }
            >
              <FaListUl className="inline-block " size={22} />
              Order list
            </NavLink>
          </li>
        </ul>
        <div className="flex-1" />
        <footer>
          <Link
            to={"/profile"}
            className="flex justify-start items-center gap-3 w-full rounded-xl py-4 px-3 hover:bg-[#293560]/50 "
          >
            <UserAvatar imageUrl="" name=" Micheal Johnson" className=" h-6 w-6" />
            <span className=" select-none">Micheal Johnson</span>
          </Link>
          <button
            className="text-left transition-colors flex w-full rounded-xl py-4 px-3 items-center gap-3 hover:bg-[#293560]/50 "
            onClick={logout}
          >
            <TbLogout size={22} />
            Logout
          </button>
        </footer>
      </nav>
      <main className="container py-10">
        <Outlet />
      </main>
    </main>
  );
}
