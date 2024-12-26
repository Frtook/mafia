import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * A hook to block navigation based on a condition.
 * @param blocker Function that returns a boolean to allow or block navigation
 * @param when Boolean indicating when to block navigation
 */
export const useBlocker = (
  blocker: (navigate: unknown) => boolean,
  when: boolean
): void => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!when) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (blocker(navigate)) {
        // Block navigation and display confirmation message
        event.returnValue =
          "You have unsaved changes. Do you really want to leave?";
      }
    };

    // Add event listener for beforeunload
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Clean up the event listener on unmount
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [blocker, when, navigate]);
};
