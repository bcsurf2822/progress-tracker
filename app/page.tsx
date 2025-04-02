"use client";

import { Header } from "./components/Header";
import { DashboardSummary } from "./components/DashboardSummary";
import { CourseList } from "./components/CourseList";
import { DataVisualizations } from "./components/DataVisualizations";
import { DataManagement } from "./components/DataManagement";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9fafb] dark:bg-[#111827]">
      <Header />

      <main className="max-w-[1200px] mx-auto px-4 py-8">
        <DashboardSummary />
        <DataVisualizations />
        <CourseList />
        <DataManagement />
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
