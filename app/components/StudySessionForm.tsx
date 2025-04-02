"use client";

import { useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { addStudySession } from "../store/coursesSlice";
import { formatDate } from "../lib/utils";
import { FiPlusCircle } from "react-icons/fi";

interface StudySessionFormProps {
  courseId: string;
}

export const StudySessionForm = ({ courseId }: StudySessionFormProps) => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState(formatDate(new Date()));
  const [hours, setHours] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate hours
    const hoursValue = parseFloat(hours);
    if (isNaN(hoursValue) || hoursValue <= 0) {
      alert("Please enter a valid number of hours");
      return;
    }

    // Prevent multiple submissions
    setIsSubmitting(true);

    // Create the session object
    const session = {
      id: `session-${Date.now()}`,
      date,
      hours: hoursValue,
      notes: notes.trim(),
    };

    // Dispatch action to add session
    dispatch(addStudySession({ courseId, session }));

    // Reset form
    setHours("");
    setNotes("");
    setDate(formatDate(new Date()));
    setIsSubmitting(false);
  };

  return (
    <div className="card">
      <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
        Log Study Session
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="session-date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Date
            </label>
            <input
              type="date"
              id="session-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div>
            <label
              htmlFor="session-hours"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Hours
            </label>
            <input
              type="number"
              id="session-hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="e.g. 2.5"
              min="0.1"
              step="0.1"
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="session-notes"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Notes (optional)
          </label>
          <textarea
            id="session-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What did you study during this session?"
            rows={3}
            className="input-field"
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full md:w-auto flex items-center justify-center gap-2"
          disabled={isSubmitting}
        >
          <FiPlusCircle className="h-4 w-4" />
          <span>Add Session</span>
        </button>
      </form>
    </div>
  );
};
