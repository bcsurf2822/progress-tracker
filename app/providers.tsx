"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { ReactNode, useEffect } from "react";
import { loadCourses } from "./lib/localStorage";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  // Initialize store with data from localStorage
  useEffect(() => {
    const courses = loadCourses();
    store.dispatch({ type: "courses/setCourses", payload: courses });
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
