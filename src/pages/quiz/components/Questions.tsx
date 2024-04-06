import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import Question from "./Question";

type QuestionsProps = {
  questions: { question: string; options: string[]; points: number }[];
  isTimeFinished: boolean;
};
type Answers = {
  [question: string]: { answer: string | null; points: number };
};

export default function Questions({ questions, isTimeFinished }: QuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>(() => {
    return questions.reduce((acc, question) => {
      acc[question.question] = { answer: null, points: 0 };
      return acc;
    }, {} as Answers);
  });
  const handleFinish = useCallback(() => {
    console.log(answers);
  }, [answers]);

  const answeredQuestions = Object.values(answers).filter((answer) => answer.answer !== null).length;
  function handleNextQuestion() {
    if (currentQuestion === questions.length - 1) {
      handleFinish();
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
  }
  function handlePreviousQuestion() {
    if (currentQuestion === 0) return;
    setCurrentQuestion((prev) => prev - 1);
  }
  function handleAnswerChange(question: string, value: string) {
    setAnswers((prev) => {
      return {
        ...prev,
        [question]: { answer: value, points: questions[currentQuestion].points },
      };
    });
  }

  useEffect(() => {
    if (isTimeFinished) {
      handleFinish();
    }
  }, [isTimeFinished, handleFinish]);
  return (
    <>
      <Progress
        className=" h-3 bg-zinc-200 text-white shadow-2xl"
        value={(answeredQuestions / questions.length) * 100}
      />

      <section className="grid gap-5 py-10">
        <Question
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          currentQuestionNumber={currentQuestion + 1}
          questionsCount={questions.length}
          pointsPerQuestion={questions[currentQuestion].points}
          onAnswerChange={handleAnswerChange}
          currentAnswer={answers[questions[currentQuestion].question].answer}
        />
      </section>
      <div className=" flex justify-end gap-2">
        <Button
          size="lg"
          variant="ghost"
          className=" text-royal-blue hover:text-royal-blue"
          onClick={handlePreviousQuestion}
        >
          Previous
        </Button>
        <Button size="lg" onClick={handleNextQuestion}>
          {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </>
  );
}
