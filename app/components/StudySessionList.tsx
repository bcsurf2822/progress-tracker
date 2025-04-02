"use client";

import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { removeStudySession } from "../store/coursesSlice";
import { FiTrash2, FiClock } from "react-icons/fi";
import { formatDate } from "date-fns";

interface StudySessionListProps {
  courseId: string;
}

export const StudySessionList = ({ courseId }: StudySessionListProps) => {
  const dispatch = useAppDispatch();
  const course = useAppSelector((state) =>
    state.courses.items.find((course) => course.id === courseId)
  );

  if (!course) {
    return <div className="text-red-500">Course not found</div>;
  }

  const handleDelete = (sessionId: string) => {
    if (confirm("Are you sure you want to delete this study session?")) {
      dispatch(removeStudySession({ courseId, sessionId }));
    }
  };

  if (course.sessions.length === 0) {
    return (
      <div className="card bg-gray-50 dark:bg-gray-800/50 text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          No study sessions recorded yet.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          Log your first session to start tracking your progress.
        </p>
      </div>
    );
  }

  // Sort sessions by date, most recent first
  const sortedSessions = [...course.sessions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
        Study Sessions
      </h3>

      <div className="grid grid-cols-1 gap-4">
        {sortedSessions.map((session) => (
          <div
            key={session.id}
            className="card hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {formatDate(new Date(session.date), "MMM d, yyyy")}
                  </span>
                  <div className="flex items-center text-blue-600 dark:text-blue-400">
                    <FiClock className="h-3 w-3 mr-1" />
                    <span className="text-sm">
                      {session.hours} {session.hours === 1 ? "hour" : "hours"}
                    </span>
                  </div>
                </div>

                {session.notes && (
                  <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {session.notes}
                  </p>
                )}
              </div>

              <button
                onClick={() => handleDelete(session.id)}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1"
                aria-label="Delete session"
              >
                <FiTrash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
