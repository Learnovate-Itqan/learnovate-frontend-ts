import { useCallback, useEffect, useRef, useState } from "react";

import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { EndOfQuizCard } from "../EndOfQuizCard";
import Question from "./Question";

type QuestionsProps = {
  questions: { question: string; options: string[]; points: number }[];
  isQuizFinished: boolean;
  finishQuiz: (answers: Answers) => void;
};
type Answers = {
  [question: string]: { answer: string | null; points: number };
};

export default function Questions({ questions, isQuizFinished, finishQuiz }: QuestionsProps) {
  const finishCardRef = useRef<HTMLButtonElement>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>(() => {
    return questions.reduce((acc, question) => {
      acc[question.question] = { answer: null, points: 0 };
      return acc;
    }, {} as Answers);
  });
  const handleFinish = useCallback(() => {
    console.log(answers);
    finishQuiz(answers);
    finishCardRef?.current?.click();
  }, [answers, finishQuiz]);

  // Calculate the number of answered questions
  const answeredQuestions = Object.values(answers).filter((answer) => answer.answer !== null).length;
  // Handle the next question
  function handleNextQuestion() {
    if (currentQuestion === questions.length - 1) {
      handleFinish();
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
  }
  // Handle the previous question
  function handlePreviousQuestion() {
    if (currentQuestion === 0) return;
    setCurrentQuestion((prev) => prev - 1);
  }
  // Handle the answer change
  function handleAnswerChange(question: string, value: string) {
    setAnswers((prev) => {
      return {
        ...prev,
        [question]: { answer: value, points: questions[currentQuestion].points },
      };
    });
  }
  // Handle the times up
  useEffect(() => {
    if (isQuizFinished) {
      handleFinish();
    }
  }, [isQuizFinished, handleFinish]);
  return (
    <>
      <Progress
        className=" h-3 bg-zinc-200 text-white shadow-2xl"
        value={(answeredQuestions / questions.length) * 100}
      />

      <section className="grid gap-5 py-10">
        <Question
          disabled={isQuizFinished}
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
        <Button
          variant={`${currentQuestion === questions.length - 1 ? "destructive" : "default"}`}
          size="lg"
          onClick={handleNextQuestion}
        >
          {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
      <Modal>
        <Modal.Open opens="result">
          <Button ref={finishCardRef} className="hidden" size="lg" variant="ghost" aria-hidden>
            Finish
          </Button>
        </Modal.Open>
        <Modal.Window name="result">
          <EndOfQuizCard />
        </Modal.Window>
      </Modal>
    </>
  );
}
