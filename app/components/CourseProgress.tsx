"use client";

import { Course } from "../types";

interface CourseProgressProps {
  course: Course;
}

export const CourseProgress = ({ course }: CourseProgressProps) => {
  const percentage =
    course.hours > 0
      ? Math.min(100, Math.round((course.completedHours / course.hours) * 100))
      : 0;

  // Determine color based on progress
  let colorClass = "bg-[#2563eb]"; // blue-600
  if (percentage >= 100) {
    colorClass = "bg-[#10b981]"; // emerald-500
  } else if (percentage >= 75) {
    colorClass = "bg-[#3b82f6]"; // blue-500
  } else if (percentage >= 50) {
    colorClass = "bg-[#f59e0b]"; // amber-500
  } else if (percentage >= 25) {
    colorClass = "bg-[#f97316]"; // orange-500
  } else {
    colorClass = "bg-[#ef4444]"; // red-500
  }

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-xs text-[#6b7280] dark:text-[#9ca3af]">
        <span>{course.completedHours} hrs</span>
        <span>{percentage}%</span>
        <span>{course.hours} hrs</span>
      </div>
      <div className="w-full bg-[#e5e7eb] dark:bg-[#374151] rounded-[9999px] h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-[9999px] ${colorClass}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
