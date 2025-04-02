"use client";

import { useState, useRef } from "react";
import { useAppDispatch } from "../hooks/redux";
import { setCourses } from "../store/coursesSlice";
import { exportData, importData, defaultCourses } from "../lib/localStorage";
import { FiDownload, FiUpload, FiRefreshCw } from "react-icons/fi";

export const DataManagement = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string | null>(null);

  const handleExport = () => {
    exportData();
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result as string;
        const courses = importData(result);
        dispatch(setCourses(courses));
      } catch (error) {
        setImportError("Failed to import data. Please check the file format.");
        console.error("Import error:", error);
      }
    };
    reader.readAsText(file);

    // Reset the file input
    e.target.value = "";
  };

  const handleReset = () => {
    if (
      confirm("Are you sure you want to reset all data? This cannot be undone.")
    ) {
      dispatch(setCourses(defaultCourses));
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
        Data Management
      </h3>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleExport}
          className="btn-secondary flex items-center gap-1"
        >
          <FiDownload className="h-4 w-4" />
          <span>Export Data</span>
        </button>

        <button
          onClick={handleImportClick}
          className="btn-secondary flex items-center gap-1"
        >
          <FiUpload className="h-4 w-4" />
          <span>Import Data</span>
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          className="hidden"
        />

        <button
          onClick={handleReset}
          className="btn-danger flex items-center gap-1"
        >
          <FiRefreshCw className="h-4 w-4" />
          <span>Reset Data</span>
        </button>
      </div>

      {importError && (
        <div className="mt-3 text-sm text-red-500">{importError}</div>
      )}
    </div>
  );
};
