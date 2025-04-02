import { differenceInDays, format } from "date-fns";

// Constants
export const DEADLINE_DATE = new Date("2025-05-10");

// Calculate days until deadline
export const getDaysUntilDeadline = (): number => {
  const today = new Date();
  return Math.max(0, differenceInDays(DEADLINE_DATE, today));
};

// Format date to YYYY-MM-DD
export const formatDate = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

// Calculate required study hours per day
export const calculateRequiredHoursPerDay = (
  totalRemainingHours: number
): number => {
  const daysLeft = getDaysUntilDeadline();
  if (daysLeft === 0) return totalRemainingHours;
  return totalRemainingHours / daysLeft;
};

// Format number to have at most 1 decimal place
export const formatNumber = (num: number): string => {
  return num % 1 === 0 ? num.toString() : num.toFixed(1);
};
