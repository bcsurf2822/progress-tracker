import { Course } from "../types";

// Default course data
export const defaultCourses: Course[] = [
  {
    id: "1",
    name: "SharePoint",
    hours: 22,
    completed: false,
    notes: "",
    sessions: [],
    completedHours: 0,
  },
  {
    id: "2",
    name: "PowerApps",
    hours: 26,
    completed: false,
    notes: "",
    sessions: [],
    completedHours: 0,
  },
  {
    id: "3",
    name: "Power BI",
    hours: 18,
    completed: false,
    notes: "",
    sessions: [],
    completedHours: 0,
  },
  {
    id: "4",
    name: "Microsoft Flow",
    hours: 15,
    completed: false,
    notes: "",
    sessions: [],
    completedHours: 0,
  },
  {
    id: "5",
    name: "Office 365 Admin",
    hours: 20,
    completed: false,
    notes: "",
    sessions: [],
    completedHours: 0,
  },
];

// Save courses to local storage
export const saveCourses = (courses: Course[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("courseData", JSON.stringify(courses));
  }
};

// Load courses from local storage
export const loadCourses = (): Course[] => {
  if (typeof window !== "undefined") {
    const savedData = localStorage.getItem("courseData");
    return savedData ? JSON.parse(savedData) : defaultCourses;
  }
  return defaultCourses;
};

// Export data to JSON file
export const exportData = (): void => {
  if (typeof window !== "undefined") {
    const data =
      localStorage.getItem("courseData") || JSON.stringify(defaultCourses);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `course-progress-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
};

// Import data from JSON file
export const importData = (jsonData: string): Course[] => {
  try {
    const courses = JSON.parse(jsonData) as Course[];
    saveCourses(courses);
    return courses;
  } catch (error) {
    console.error("Failed to import data:", error);
    return loadCourses();
  }
};
