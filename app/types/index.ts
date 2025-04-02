export interface StudySession {
  id: string;
  date: string;
  hours: number;
  notes?: string;
}

export interface Course {
  id: string;
  name: string;
  hours: number;
  completed: boolean;
  notes: string;
  sessions: StudySession[];
  completedHours: number;
}

export interface RootState {
  courses: {
    items: Course[];
    loading: boolean;
    error: string | null;
  };
}
