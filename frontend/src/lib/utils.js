export function formatMessageTime(date) {
  if (!date) return "Invalid date"; // Prevents errors if date is null/undefined
  
  const validDate = new Date(date);
  if (isNaN(validDate.getTime())) return "Invalid date"; // Checks for invalid dates

  return validDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24-hour format
  });
}

export function formatMessageDate(date) {
  if (!date) return "Invalid date";
  
  const validDate = new Date(date);
  if (isNaN(validDate.getTime())) return "Invalid date";

  return validDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short", // e.g., "Feb"
    day: "2-digit",
  });
}
