import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to calculate the number of days between two dates
export function calculateDaysAgo(dateString: string): number {
  const currentDate = new Date();
  const lastMessagedDate = new Date(dateString);
  const timeDifference = currentDate.getTime() - lastMessagedDate.getTime();
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysAgo;
}

// Helper function to format a date relative to today
export function formatDateBasedOnDistance(inputDate: string): string {
  // Parse the input date string
  const inputDateObj = new Date(inputDate);
  const currentDate = new Date();

  // Calculate the difference in days between the two dates
  const timeDifference = inputDateObj.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  if (daysDifference <= 0) {
    // Handle dates in the past (not expected in this case)
    return "Invalid date";
  } else if (daysDifference <= 7) {
    // Within the current week
    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][inputDateObj.getUTCDay()];
    return `This ${dayOfWeek}`;
  } else if (daysDifference <= 14) {
    // On or before the Sunday of the next week
    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][inputDateObj.getUTCDay()];
    return `Next ${dayOfWeek}`;
  } else {
    // After the Sunday of the next week
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return inputDateObj.toLocaleDateString(undefined, options);
  }
}