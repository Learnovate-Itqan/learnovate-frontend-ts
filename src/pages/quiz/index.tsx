import { useState } from "react";
import toast from "react-hot-toast";

import Questions from "./components/Questions";
import Timer from "./components/Timer";

const QUIZ = {
  header: {
    title: "Mentor Quiz",
    description: "Non quia ipsum rem animi dolor eum voluptatum necessitatibus",
    time: 1 * 20,
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
  const [isTimeFinished, setIsTimeFinished] = useState(false);
  function handleTimesUp() {
    toast.error("Times up! 🕒");
    setIsTimeFinished(true);
  }
  return (
    <main>
      <header className="bg-dark-navy text-white">
        <main className="container flex flex-col md:flex-row justify-between items-center gap-10 py-16">
          <section className="grid gap-3">
            <h1 className="text-3xl font-semibold">{QUIZ.header.title}</h1>
            <p>{QUIZ.header.description}</p>
          </section>
          <section className=" w-1/2 place-self-start md:w-fit md:place-self-end max-w-48">
            <Timer time={QUIZ.header.time} onTimesUp={handleTimesUp} />
          </section>
        </main>
      </header>
      <main className="container py-16">
        <Questions questions={QUIZ.questions} isTimeFinished={isTimeFinished} />
      </main>
    </main>
  );
}
