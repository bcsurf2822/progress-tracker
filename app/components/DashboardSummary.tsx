"use client";

import { useAppSelector } from "../hooks/redux";
import {
  getDaysUntilDeadline,
  calculateRequiredHoursPerDay,
  formatNumber,
} from "../lib/utils";
import {
  FiClock,
  FiCheckCircle,
  FiCalendar,
  FiBarChart2,
} from "react-icons/fi";

export const DashboardSummary = () => {
  const courses = useAppSelector((state) => state.courses.items);

  // Calculate stats
  const totalHours = courses.reduce((total, course) => total + course.hours, 0);
  const completedHours = courses.reduce(
    (total, course) => total + course.completedHours,
    0
  );
  const remainingHours = totalHours - completedHours;
  const daysUntilDeadline = getDaysUntilDeadline();
  const hoursPerDay = calculateRequiredHoursPerDay(remainingHours);
  const completionPercentage =
    totalHours > 0 ? Math.round((completedHours / totalHours) * 100) : 0;

  const statCards = [
    {
      title: "Total Hours",
      value: totalHours,
      icon: <FiClock className="text-[#3b82f6]" />,
      bgColor: "bg-[#eff6ff] dark:bg-[#1e3a8a]/20",
      textColor: "text-[#2563eb] dark:text-[#60a5fa]",
    },
    {
      title: "Completed Hours",
      value: completedHours,
      icon: <FiCheckCircle className="text-[#10b981]" />,
      bgColor: "bg-[#ecfdf5] dark:bg-[#065f46]/20",
      textColor: "text-[#059669] dark:text-[#34d399]",
    },
    {
      title: "Days Until Deadline",
      value: daysUntilDeadline,
      icon: <FiCalendar className="text-[#f59e0b]" />,
      bgColor: "bg-[#fffbeb] dark:bg-[#92400e]/20",
      textColor: "text-[#d97706] dark:text-[#fbbf24]",
    },
    {
      title: "Hours Per Day",
      value: formatNumber(hoursPerDay),
      icon: <FiBarChart2 className="text-[#8b5cf6]" />,
      bgColor: "bg-[#f5f3ff] dark:bg-[#5b21b6]/20",
      textColor: "text-[#7c3aed] dark:text-[#a78bfa]",
    },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-[#1f2937] dark:text-[#ffffff]">
        Dashboard Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`p-5 ${card.bgColor} border-none rounded-[0.75rem] bg-[#ffffff] dark:bg-[#1f2937] flex items-center`}
          >
            <div className="mr-4 p-3 rounded-[9999px] bg-[#ffffff] dark:bg-[#1f2937] border border-[#e5e7eb] dark:border-[#374151]">
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-[#4b5563] dark:text-[#9ca3af]">
                {card.title}
              </p>
              <p className={`text-xl font-bold ${card.textColor}`}>
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Overall progress bar */}
      <div className="mt-6 p-5 rounded-[0.75rem] bg-[#ffffff] dark:bg-[#1f2937] border border-[#e5e7eb] dark:border-[#374151]">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-[#374151] dark:text-[#d1d5db]">
            Overall Completion
          </span>
          <span className="text-sm font-medium text-[#374151] dark:text-[#d1d5db]">
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-[#e5e7eb] dark:bg-[#374151] rounded-[9999px] h-2.5 overflow-hidden">
          <div
            className="bg-[#3b82f6] h-2.5 rounded-[9999px]"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
};
