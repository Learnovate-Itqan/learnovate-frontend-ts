import { v4 as uuid } from "uuid";

import AbdelrahmanAwadImage from "@/assets/mentors/Abdelrahman-Awad.webp";
import resume from "@/assets/mentors/Resume_Template.pdf";

export const mentor = {
  id: uuid(),
  name: "Abdelrahman Awad",
  jobTitle: "Front End Developer",
  description:
    "Senior Engineer @rasayelio | @GoogleDevExpert in Web Technologies | Passionate about Vue.js 💚 and TypeScript 💙 | OSS Maintainer | Host 🎙️ Untyped Podcast",
  image: AbdelrahmanAwadImage,
  price: 100,
  skills: [
    { id: uuid(), name: "Vue.js" },
    { id: uuid(), name: "TypeScript" },
    { id: uuid(), name: "Front End" },
    { id: uuid(), name: "JavaScript" },
    { id: uuid(), name: "Node.js" },
    { id: uuid(), name: "Nuxt.js" },
    { id: uuid(), name: "Vee Validate" },
  ],
  workExperience:
    "Senior Engineer @rasayelio | @GoogleDevExpert in Web Technologies | Passionate about Vue.js 💚 and TypeScript 💙 | OSS Maintainer | Host 🎙️ Untyped Podcast",
  education: "Computer Science",
  jobExperience: "Senior",
  rating: 4.9,
  languages: ["English", "Arabic"],
  location: "Egypt",
  timeZones: "UTC+2",
  resume: resume,
};
