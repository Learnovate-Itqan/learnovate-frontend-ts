import { v4 as uuid } from "uuid";

import abdelrahmanAwad from "@/assets/mentors/Abdelrahman-Awad.webp";
import amrMostafa from "@/assets/mentors/Amr-Mostafa.webp";
import muhammadEmara from "@/assets/mentors/Muhammad-Emara.webp";
import muhammadIbrahim from "@/assets/mentors/Muhammad-Ibrahim.webp";
import muhammadSelim from "@/assets/mentors/Muhammad-Selim.webp";

export type TChat = {
  id: string;
  name: string;
  message: string;
  time: number | string;
  image: string;
  notRead?: number;
};

export const CHAT_LIST: TChat[] = [
  {
    id: uuid(),
    name: "Abdelrahman Awad",
    message:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: Date.now(),
    image: abdelrahmanAwad,
  },
  {
    id: uuid(),
    name: "Amr Mostafa",
    message:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: Date.now(),
    image: amrMostafa,
  },
  {
    id: uuid(),
    name: "Muhammad Emara",
    message:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: Date.now(),
    image: muhammadEmara,
    notRead: 99,
  },
  {
    id: uuid(),
    name: "Muhammad Ibrahim",
    message:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: Date.now(),
    image: muhammadIbrahim,
    notRead: 8,
  },
  {
    id: uuid(),
    name: "Muhammad Selim",
    message:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: Date.now(),
    image: muhammadSelim,
  },
];
