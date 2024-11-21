import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export const handlePopoverOpenChange = (
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  containerClass: string,
) => {
  // If the popover is opened, attach the event listener
  if (open) {
    // Close the popover if `open` is false
    setOpen(open);
  } else {
    // Handle clicks outside the popover
    const handleDocumentClick = (e: MouseEvent) => {
      // Check if the click is inside the autocomplete dropdown
      if (e.target) {
        const target = e.target as HTMLElement;

        // Look for a parent element with the class "pac-container"
        if (target.closest(containerClass)) {
          // Do not close the popover if the click is inside the dropdown
          return;
        }
      }

      // Update the popover state if the click is outside the autocomplete dropdown
      setOpen(open);
      // Remove the event listener after handling the click
      document.removeEventListener("mousedown", handleDocumentClick);
    };

    // Handle Escape key press to close the popover
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Perform your action when the Escape key is pressed
        setOpen(false); // Close the popover
        document.removeEventListener("keydown", handleEscapeKey); // Remove listener after action
      }
    };

    // Add the event listeners for click and Escape key press
    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscapeKey);
  }
};
