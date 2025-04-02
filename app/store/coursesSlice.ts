import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, StudySession } from "../types";
import { loadCourses, saveCourses } from "../lib/localStorage";

interface CoursesState {
  items: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  items: [],
  loading: false,
  error: null,
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.items = action.payload;
      saveCourses(state.items);
    },
    toggleCourseCompleted: (state, action: PayloadAction<string>) => {
      const course = state.items.find((course) => course.id === action.payload);
      if (course) {
        course.completed = !course.completed;
        // If completed, set completedHours to total hours
        if (course.completed) {
          course.completedHours = course.hours;
        }
        saveCourses(state.items);
      }
    },
    updateCourseNotes: (
      state,
      action: PayloadAction<{ id: string; notes: string }>
    ) => {
      const { id, notes } = action.payload;
      const course = state.items.find((course) => course.id === id);
      if (course) {
        course.notes = notes;
        saveCourses(state.items);
      }
    },
    addStudySession: (
      state,
      action: PayloadAction<{ courseId: string; session: StudySession }>
    ) => {
      const { courseId, session } = action.payload;
      const course = state.items.find((course) => course.id === courseId);
      if (course) {
        course.sessions.push(session);
        course.completedHours = course.sessions.reduce(
          (total, session) => total + session.hours,
          0
        );
        // If all hours are completed, mark course as completed
        if (course.completedHours >= course.hours) {
          course.completed = true;
        }
        saveCourses(state.items);
      }
    },
    removeStudySession: (
      state,
      action: PayloadAction<{ courseId: string; sessionId: string }>
    ) => {
      const { courseId, sessionId } = action.payload;
      const course = state.items.find((course) => course.id === courseId);
      if (course) {
        const sessionIndex = course.sessions.findIndex(
          (session) => session.id === sessionId
        );
        if (sessionIndex !== -1) {
          const removedSession = course.sessions[sessionIndex];
          course.sessions.splice(sessionIndex, 1);
          course.completedHours = Math.max(
            0,
            course.completedHours - removedSession.hours
          );
          // Update completion status based on hours
          course.completed = course.completedHours >= course.hours;
          saveCourses(state.items);
        }
      }
    },
  },
});

export const {
  setCourses,
  toggleCourseCompleted,
  updateCourseNotes,
  addStudySession,
  removeStudySession,
} = coursesSlice.actions;

export default coursesSlice.reducer;
