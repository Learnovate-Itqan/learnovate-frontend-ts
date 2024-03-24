import { CircularProgressbar } from "react-circular-progressbar";

import { Navbar } from "@/layouts/Navbar";

import Questions from "./components/Questions";

const QUIZ = {
  header: {
    title: "Mentor Quiz",
    description: "Non quia ipsum rem animi dolor eum voluptatum necessitatibus",
    time: 12 * 60,
  },
  questions: [
    {
      question: "What is the capital of France?",
      options: ["New York", "London", "Paris", "Dublin"],
      points: 3,
    },
    {
      question: "Who is CEO of Tesla?",
      options: ["Jeff Bezos", "Elon Musk", "Bill Gates", "Tony Stark"],
      points: 5,
    },
    {
      question: "The iPhone was created by which company?",
      options: ["Apple", "Intel", "Amazon", "Microsoft"],
      points: 3,
    },
    {
      question: "How many Harry Potter books are there?",
      options: ["1", "4", "6", "7"],
      points: 3,
    },
  ],
};

export function Quiz() {
  return (
    <>
      <Navbar />
      <main>
        <header className="bg-dark-navy text-white">
          <main className="container flex flex-col md:flex-row justify-between items-center gap-10 py-16">
            <section className="grid gap-3">
              <h1 className="text-3xl font-semibold">{QUIZ.header.title}</h1>
              <p>{QUIZ.header.description}</p>
            </section>
            <section className=" w-1/2 place-self-start md:w-fit md:place-self-end max-w-48">
              <CircularProgressbar
                styles={{
                  path: {
                    stroke: "#3498DB",
                  },
                  trail: {
                    stroke: "#293560",
                  },
                  text: {
                    fill: "#fff",
                    fontSize: "24px",
                    fontWeight: 500,
                  },
                }}
                value={50}
                text={`${12}:${23}`}
              />
            </section>
          </main>
        </header>
        <main className="container py-16">
          <Questions questions={QUIZ.questions} />
        </main>
      </main>
    </>
  );
}
