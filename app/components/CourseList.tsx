"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { CourseProgress } from "./CourseProgress";
import { toggleCourseCompleted } from "../store/coursesSlice";
import { FiFilter, FiCheck, FiEye } from "react-icons/fi";
import Link from "next/link";

type FilterType = "all" | "completed" | "pending";
type SortType = "name" | "hours" | "progress";

export const CourseList = () => {
  const courses = useAppSelector((state) => state.courses.items);
  const dispatch = useAppDispatch();
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("progress");

  const handleToggleStatus = (courseId: string) => {
    dispatch(toggleCourseCompleted(courseId));
  };

  // Filter and sort courses
  const filteredAndSortedCourses = [...courses]
    .filter((course) => {
      if (filterType === "all") return true;
      if (filterType === "completed") return course.completed;
      return !course.completed;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "hours") return b.hours - a.hours;
      // Default: sort by progress
      const progressA = a.completedHours / a.hours;
      const progressB = b.completedHours / b.hours;
      return progressB - progressA;
    });

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#1f2937] dark:text-[#ffffff]">
          Your Courses
        </h2>

        <div className="flex gap-2">
          <div className="relative inline-block">
            <button
              className="px-4 py-2 bg-[#f3f4f6] dark:bg-[#374151] text-[#1f2937] dark:text-[#e5e7eb] rounded-[0.375rem] hover:bg-[#e5e7eb] dark:hover:bg-[#4b5563] flex items-center gap-1"
              onClick={() => {
                const nextFilter =
                  filterType === "all"
                    ? "completed"
                    : filterType === "completed"
                    ? "pending"
                    : "all";
                setFilterType(nextFilter);
              }}
            >
              <FiFilter className="h-4 w-4" />
              <span className="capitalize">{filterType}</span>
            </button>
          </div>

          <div className="relative inline-block">
            <select
              className="w-full px-3 py-2 border border-[#d1d5db] dark:border-[#4b5563] rounded-[0.375rem] dark:bg-[#374151] dark:text-[#ffffff] appearance-none pr-8"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
            >
              <option value="progress">Sort by Progress</option>
              <option value="name">Sort by Name</option>
              <option value="hours">Sort by Hours</option>
            </select>
          </div>
        </div>
      </div>

      {filteredAndSortedCourses.length === 0 ? (
        <div className="p-5 rounded-[0.75rem] bg-[#ffffff] dark:bg-[#1f2937] border border-[#e5e7eb] dark:border-[#374151] text-center py-8">
          <p className="text-[#6b7280] dark:text-[#9ca3af]">
            No courses match your filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredAndSortedCourses.map((course) => (
            <div
              key={course.id}
              className="p-5 rounded-[0.75rem] bg-[#ffffff] dark:bg-[#1f2937] border border-[#e5e7eb] dark:border-[#374151] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="mb-3 md:mb-0">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleToggleStatus(course.id)}
                      className={`mr-3 w-6 h-6 rounded-[9999px] flex items-center justify-center border ${
                        course.completed
                          ? "bg-[#10b981] border-[#10b981] text-[#ffffff]"
                          : "border-[#d1d5db] dark:border-[#4b5563]"
                      }`}
                      aria-label={
                        course.completed
                          ? "Mark as incomplete"
                          : "Mark as complete"
                      }
                    >
                      {course.completed && <FiCheck className="h-4 w-4" />}
                    </button>
                    <h3 className="text-lg font-medium text-[#1f2937] dark:text-[#ffffff]">
                      {course.name}
                    </h3>
                  </div>
                  <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mt-1">
                    {course.completed
                      ? "Completed"
                      : `${course.completedHours} of ${course.hours} hours completed`}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-48">
                    <CourseProgress course={course} />
                  </div>

                  <Link
                    href={`/course/${course.id}`}
                    className="px-4 py-2 bg-[#f3f4f6] dark:bg-[#374151] text-[#1f2937] dark:text-[#e5e7eb] rounded-[0.375rem] hover:bg-[#e5e7eb] dark:hover:bg-[#4b5563] flex items-center gap-1"
                  >
                    <FiEye className="h-4 w-4" />
                    <span>Details</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
