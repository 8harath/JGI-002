"use client";

import * as React from "react";
import { Keyboard, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function KeyboardShortcuts() {
  const [open, setOpen] = React.useState(false);
  const [isMac, setIsMac] = React.useState(false);

  React.useEffect(() => {
    // Check if the user is on macOS
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  const shortcuts = [
    { 
      key: isMac ? "⌘K" : "Ctrl + K", 
      description: "Open search" 
    },
    { 
      key: isMac ? "⌘⇧1" : "Ctrl + Shift + 1", 
      description: "Go to Semester 1" 
    },
    { 
      key: isMac ? "⌘⇧2" : "Ctrl + Shift + 2", 
      description: "Go to Semester 2" 
    },
    { 
      key: isMac ? "⌘⇧3" : "Ctrl + Shift + 3", 
      description: "Go to Semester 3" 
    },
    { 
      key: isMac ? "⌘⇧4" : "Ctrl + Shift + 4", 
      description: "Go to Semester 4" 
    },
    { 
      key: isMac ? "⌘⇧5" : "Ctrl + Shift + 5", 
      description: "Go to Semester 5" 
    },
    { 
      key: isMac ? "⌘⇧6" : "Ctrl + Shift + 6", 
      description: "Go to Semester 6" 
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 lg:px-3 hover:bg-accent/20"
        >
          <Keyboard className="h-4 w-4" />
          <span className="hidden lg:inline-flex ml-2">Shortcuts</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 border-2 border-foreground" align="end">
        <div className="flex items-center justify-between border-b-2 border-foreground px-4 py-2">
          <h4 className="font-medium">Keyboard Shortcuts</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
            className="h-8 px-2 hover:bg-accent/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 space-y-3">
          {shortcuts.map((shortcut) => (
            <div key={shortcut.key} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{shortcut.description}</span>
              <Badge variant="secondary" className="font-mono text-xs border-2 border-foreground">
                {shortcut.key}
              </Badge>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
} 