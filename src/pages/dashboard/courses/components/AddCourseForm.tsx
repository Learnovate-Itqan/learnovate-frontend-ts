import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

import { usePostData } from "@/hooks/useApi";
import { basicCourseInfoSchema, courseChaptersSchema } from "@/schemas/courseSchema";

import { CourseChaptersForm } from "./CourseChaptersForm";
import { CourseInfoForm } from "./CourseInfoForm";

export function AddCourseForm({ onCloseModal }: { onCloseModal?: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);
  const [courseInfo, setCourseInfo] = useState<z.infer<typeof basicCourseInfoSchema>>();
  const createCourse = usePostData("admin/courses");

  function handleCourseInfo(data: z.infer<typeof basicCourseInfoSchema>) {
    setCourseInfo(data);
    setCurrentStep((prev) => prev + 1);
    setPrevStep(currentStep);
  }
  async function handleCourseChapters(data: z.infer<typeof courseChaptersSchema>) {
    const toastId = toast.loading("Creating New Course...");
    const chapters = data.chapters.map((chapter) => {
      return { chapterName: chapter.title, chapterLink: chapter.link };
    });
    const newCourse = {
      ...courseInfo,
      chapters,
      track: courseInfo?.trackName,
    };
    console.log(newCourse);
    delete newCourse.image;
    delete newCourse.trackName;
    const { status, data: res } = await createCourse.mutateAsync(newCourse);
    console.log(res);
    if (status === "success") {
      toast.success("Course created successfully", { id: toastId });
      onCloseModal?.();
    } else {
      toast.error("Failed to create course", { id: toastId });
    }
  }
  function handlePrev() {
    setCurrentStep((prev) => prev - 1);
    setPrevStep(currentStep);
  }
  return (
    <main>
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
              <CourseChaptersForm
                noChapters={courseInfo?.noChapters || 1}
                handleCourseChapters={handleCourseChapters}
                onPrev={handlePrev}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </main>
  );
}
