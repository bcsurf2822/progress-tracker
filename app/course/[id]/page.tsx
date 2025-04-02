"use client";

import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks/redux";
import { Header } from "@/app/components/Header";
import { CourseProgress } from "@/app/components/CourseProgress";
import { CourseNotes } from "@/app/components/CourseNotes";
import { StudySessionForm } from "@/app/components/StudySessionForm";
import { StudySessionList } from "@/app/components/StudySessionList";
import { FiArrowLeft, FiCheck, FiX } from "react-icons/fi";
import Link from "next/link";

interface CoursePageProps {
  params: {
    id: string;
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const { id } = params;
  const router = useRouter();

  const course = useAppSelector((state) =>
    state.courses.items.find((course) => course.id === id)
  );

  if (!course) {
    return (
      <div className="min-h-screen bg-[#f9fafb] dark:bg-[#111827] flex flex-col">
        <Header />
        <main className="max-w-[1200px] mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
          <div className="p-5 rounded-[0.75rem] bg-[#ffffff] dark:bg-[#1f2937] border border-[#e5e7eb] dark:border-[#374151] text-center py-8 max-w-md w-full">
            <h2 className="text-xl font-bold text-[#dc2626] mb-4">
              Course Not Found
            </h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] mb-6">
              The course you are looking for does not exist or has been removed.
            </p>
            <Link
              href="/"
              className="px-4 py-2 bg-[#2563eb] text-[#ffffff] rounded-[0.375rem] hover:bg-[#1d4ed8] inline-block"
            >
              Back to Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] dark:bg-[#111827] flex flex-col">
      <Header />

      <main className="max-w-[1200px] mx-auto px-4 py-8 flex-1">
        <div className="mb-6">
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-[#2563eb] dark:text-[#60a5fa] hover:underline"
          >
            <FiArrowLeft className="mr-2" />
            Back to Dashboard
          </button>
        </div>

        <div className="p-5 rounded-[0.75rem] bg-[#ffffff] dark:bg-[#1f2937] border border-[#e5e7eb] dark:border-[#374151] mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#1f2937] dark:text-[#ffffff]">
                {course.name}
              </h1>
              <div className="flex items-center mt-1">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-[9999px] text-xs font-medium ${
                    course.completed
                      ? "bg-[#dcfce7] text-[#166534] dark:bg-[#065f46]/30 dark:text-[#34d399]"
                      : "bg-[#fef3c7] text-[#92400e] dark:bg-[#78350f]/30 dark:text-[#fbbf24]"
                  }`}
                >
                  {course.completed ? (
                    <>
                      <FiCheck className="mr-1 h-3 w-3" />
                      Completed
                    </>
                  ) : (
                    <>
                      <FiX className="mr-1 h-3 w-3" />
                      Pending
                    </>
                  )}
                </span>
                <span className="ml-2 text-sm text-[#6b7280] dark:text-[#9ca3af]">
                  {course.completedHours} of {course.hours} hours completed
                </span>
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <CourseProgress course={course} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CourseNotes courseId={id} />
          <StudySessionForm courseId={id} />
        </div>

        <div className="mb-6">
          <StudySessionList courseId={id} />
        </div>
      </main>

      <footer className="py-6 bg-[#ffffff] dark:bg-[#1f2937] border-t border-[#e5e7eb] dark:border-[#374151]">
        <div className="max-w-[1200px] mx-auto px-4 text-center text-[#6b7280] dark:text-[#9ca3af] text-sm">
          <p>Course Progress Tracker &copy; {new Date().getFullYear()}</p>
          <p className="mt-1">Deadline: May 10, 2025</p>
        </div>
      </footer>
    </div>
  );
}
