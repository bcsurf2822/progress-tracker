"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { updateCourseNotes } from "../store/coursesSlice";
import { FiEdit, FiSave, FiXCircle } from "react-icons/fi";

interface CourseNotesProps {
  courseId: string;
}

export const CourseNotes = ({ courseId }: CourseNotesProps) => {
  const dispatch = useAppDispatch();
  const course = useAppSelector((state) =>
    state.courses.items.find((course) => course.id === courseId)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (course) {
      setNotes(course.notes);
    }
  }, [course]);

  if (!course) {
    return <div className="text-[#dc2626]">Course not found</div>;
  }

  const handleSave = () => {
    dispatch(updateCourseNotes({ id: courseId, notes }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNotes(course.notes);
    setIsEditing(false);
  };

  return (
    <div className="p-5 rounded-[0.75rem] bg-[#ffffff] dark:bg-[#1f2937] border border-[#e5e7eb] dark:border-[#374151]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-[#1f2937] dark:text-[#ffffff]">
          Course Notes
        </h3>

        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="p-1.5 rounded-[0.25rem] text-[#059669] hover:text-[#047857] hover:bg-[#ecfdf5] dark:text-[#34d399] dark:hover:text-[#6ee7b7] dark:hover:bg-[#065f46]/20"
              aria-label="Save notes"
            >
              <FiSave className="h-5 w-5" />
            </button>

            <button
              onClick={handleCancel}
              className="p-1.5 rounded-[0.25rem] text-[#dc2626] hover:text-[#b91c1c] hover:bg-[#fef2f2] dark:text-[#ef4444] dark:hover:text-[#f87171] dark:hover:bg-[#7f1d1d]/20"
              aria-label="Cancel editing"
            >
              <FiXCircle className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 rounded-[0.25rem] text-[#2563eb] hover:text-[#1d4ed8] hover:bg-[#eff6ff] dark:text-[#3b82f6] dark:hover:text-[#60a5fa] dark:hover:bg-[#1e3a8a]/20"
            aria-label="Edit notes"
          >
            <FiEdit className="h-5 w-5" />
          </button>
        )}
      </div>

      {isEditing ? (
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 border border-[#d1d5db] dark:border-[#4b5563] rounded-[0.375rem] dark:bg-[#374151] dark:text-[#ffffff] min-h-[200px]"
          placeholder="Add notes about this course..."
          autoFocus
        />
      ) : (
        <div className="bg-[#f9fafb] dark:bg-[#1f2937]/50 p-4 rounded-[0.375rem] min-h-[100px]">
          {course.notes ? (
            <p className="whitespace-pre-wrap text-[#374151] dark:text-[#d1d5db]">
              {course.notes}
            </p>
          ) : (
            <p className="text-[#9ca3af] dark:text-[#6b7280] italic">
              No notes yet. Click the edit button to add notes.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
