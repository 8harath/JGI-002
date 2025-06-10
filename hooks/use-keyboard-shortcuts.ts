"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useKeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Debug log
      console.log('Key pressed:', {
        key: e.key,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        metaKey: e.metaKey
      });

      // Check if Ctrl + Shift is pressed
      if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
        // Check for number keys 1-6
        const semesterNumber = parseInt(e.key);
        if (!isNaN(semesterNumber) && semesterNumber >= 1 && semesterNumber <= 6) {
          e.preventDefault();
          console.log(`Navigating to semester ${semesterNumber}`);
          router.push(`/semester/${semesterNumber}`);
        }
      }
    };

    // Add event listener with capture phase
    window.addEventListener("keydown", handleKeyDown, true);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [router]);
} 