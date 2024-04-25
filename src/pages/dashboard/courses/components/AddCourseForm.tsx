import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";

import { basicCourseInfoSchema, courseChaptersSchema } from "@/schemas/courseSchema";

import { CourseChaptersForm } from "./CourseChaptersForm";
import { CourseInfoForm } from "./CourseInfoForm";

export function AddCourseForm({ onCloseModal }: { onCloseModal?: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);
  const [courseInfo, setCourseInfo] = useState<z.infer<typeof basicCourseInfoSchema>>();
  function handleCourseInfo(data: z.infer<typeof basicCourseInfoSchema>) {
    setCourseInfo(data);
    setCurrentStep((prev) => prev + 1);
    setPrevStep(currentStep);
  }
  function handleCourseChapters(data: z.infer<typeof courseChaptersSchema>) {
    console.log(data, courseInfo);
    onCloseModal?.();
  }
  function handlePrev() {
    setCurrentStep((prev) => prev - 1);
    setPrevStep(currentStep);
  }
  return (
    <main>
      <header className="mb-5">
        <h1 className="text-2xl font-semibold">Add a New Course</h1>
      </header>
      <main>
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key={currentStep}
              className="w-full grow"
              initial={{ x: "-100vw", width: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100vw" }}
              transition={{ duration: 0.3 }}
            >
              <CourseInfoForm handleCourseInfo={handleCourseInfo} data={courseInfo} />
            </motion.div>
          )}
          {currentStep === 1 && (
            <motion.div
              key={currentStep}
              className="w-full grow"
              initial={{ x: `${currentStep < prevStep ? "-" : ""}100vw`, width: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: `${currentStep < prevStep ? "" : "-"}100vw` }}
              transition={{ duration: 0.3 }}
            >
              <CourseChaptersForm noChapters={8} handleCourseChapters={handleCourseChapters} onPrev={handlePrev} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </main>
  );
}
