import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { usePostData } from "@/hooks/useApi";

import { AnswersType } from "../quiz/components/Questions";

const ROADMAP = {
  id: "1",
  track: "Ui/Ux Design",
  steps: [
    {
      title: "Interaction Design Specialization",
      description:
        "This specialization covers the principles and practices of interaction design, emphasizing the creation of engaging and user-friendly interfaces.",
      duration: "4 weeks",
    },
    {
      title: "UX Design and Evaluation",
      description:
        "This specialization covers the principles and practices of interaction design, emphasizing the creation of engaging and user-friendly interfaces.",
      duration: "3 weeks",
    },
    {
      title: "UI Design with Figma",
      description:
        "This specialization covers the principles and practices of interaction design, emphasizing the creation of engaging and user-friendly interfaces.",
      duration: "2 Months",
    },
    {
      title: "Responsive Web Design",
      description:
        "This specialization covers the principles and practices of interaction design, emphasizing the creation of engaging and user-friendly interfaces.",
      duration: "2 Months",
    },
    {
      title: "Interaction Design Specialization",
      description:
        "This specialization covers the principles and practices of interaction design, emphasizing the creation of engaging and user-friendly interfaces.",
      duration: "4 weeks",
    },
    {
      title: "UX Design and Evaluation",
      description:
        "This specialization covers the principles and practices of interaction design, emphasizing the creation of engaging and user-friendly interfaces.",
      duration: "2 Months",
    },
    {
      title: "UI Design with Figma",
      description:
        "This specialization covers the principles and practices of interaction design, emphasizing the creation of engaging and user-friendly interfaces.",
      duration: "2 Months",
    },
    {
      title: "Responsive Web Design",
      description:
        "This specialization covers the principles and practices of interaction design, emphasizing the creation of engaging and user-friendly interfaces.",
      duration: "4 weeks",
    },
    {
      title: "Responsive Web Design",
      description:
        "This specialization covers the principles and practices of interaction design, emphasizing the creation of engaging and user-friendly interfaces.",
      duration: "4 weeks",
    },
  ],
};

export function Roadmap() {
  const { state } = useLocation();
  const { answers }: { answers: AnswersType } = state || { answers: undefined };
  const finalAnswers = Object.entries(answers).map(([question, answer]) => {
    {
      return {
        question,
        studentAnswer: answer.answer,
        correctAnswer: answer.correctAnswer,
      };
    }
  });
  const generateRoadMap = usePostData("/submit-quiz");
  useEffect(() => {
    async function handleGenerateRoadMap() {
      const { status, data } = await generateRoadMap.mutateAsync(finalAnswers);
      console.log(status, data);
    }
    if (answers) {
      handleGenerateRoadMap();
    }
  }, [answers, finalAnswers, generateRoadMap]);
  return (
    <section className="bg-dark-navy min-h-96">
      <main className="container text-white h-full py-7">
        <header className="mb-5">
          <p>{ROADMAP.track}</p>
          <h1 className="text-5xl font-semibold">Roadmap</h1>
        </header>
        <main className="grid gap-2">
          <h1 className="text-2xl md:text-center font-semibold">Start</h1>
          <section
            style={{
              gridAutoRows: "1fr",
            }}
            className="grid md:grid-cols-2 gap-y-16 pt-36 md:pt-48 py-20 relative overflow-hidden"
          >
            <div className="flex flex-col justify-between items-center absolute md:left-1/2 md:-translate-x-1/2 z-10 overflow-hidden h-full py-1">
              <Dot className="-translate-y-1" />
              <Dot className="translate-y-1" />
              <div className=" absolute -z-10  h-full w-0 border-dashed border-2 border-royal-blue" />
            </div>
            <div aria-hidden className=" hidden md:block"></div>

            {ROADMAP.steps.map((step, index) => (
              <>
                <Step
                  className={`z-10  ${index % 2 === 0 ? "md:-translate-x-3" : "md:text-right md:place-self-end md:translate-x-3"}`}
                  dotPlace={index % 2 === 0 ? "left" : "right"}
                  {...step}
                />
                {index % 2 === 1 && !(index + 1 === ROADMAP.steps.length) && (
                  <>
                    <div aria-hidden className=" hidden md:block"></div>
                    <div aria-hidden className=" hidden md:block"></div>
                  </>
                )}
              </>
            ))}
          </section>
          <h1 className="text-2xl md:text-center">End of the journey</h1>
        </main>
      </main>
    </section>
  );
}

export function Dot({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-6 h-6 border-[1px] min-w-6 border-mint-green rounded-full flex justify-center items-center ${className}`}
    >
      <div className="w-4 h-4 bg-mint-green rounded-full" />
    </div>
  );
}

type StepProps = {
  title: string;
  description: string;
  duration: string;
  className?: string;
  dotPlace?: "left" | "right";
};

export function Step({ title, description, duration, className = "", dotPlace = "left" }: StepProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const stepRef = useRef(null);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        } else {
          setIsIntersecting(false);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  useEffect(() => {
    if (stepRef.current) {
      observer.observe(stepRef.current);
    }
  });
  return (
    <div className={`flex gap-4  ${className}`}>
      {dotPlace === "left" && <Dot className="hidden md:flex " />}
      <Dot className="md:hidden" />
      <div
        ref={stepRef}
        className={`max-w-[500px]  -translate-y-7 transition-all duration-700 ${isIntersecting ? "opacity-1 translate-x-0" : `opacity-0 ${dotPlace === "left" ? "translate-x-24" : "md:-translate-x-24 translate-x-24"} `} `}
      >
        <span className="text-xs sm:text-sm text-royal-blue">{duration}</span>
        <h1 className="text-xl sm:text-2xl">{title}</h1>
        <p className="text-neutral-gray text-sm sm:text-base">{description}</p>
      </div>
      {dotPlace === "right" && <Dot className="hidden md:flex" />}
    </div>
  );
}
