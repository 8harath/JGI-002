"use client";

import * as React from "react";
import { Search as SearchIcon, X, Clock, Filter, ChevronDown, BookOpen, FileText, Book, ClipboardList, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSearch } from "@/lib/search-context";
import { Resource } from "@/types";

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const resourceTypeIcons = {
  Notes: FileText,
  Books: Book,
  Assignments: ClipboardList,
  Projects: BookOpen,
};

export function Search({ className }: SearchProps) {
  const router = useRouter();
  const { state, dispatch, performSearch } = useSearch();
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        dispatch({ type: "SET_OPEN", payload: !state.isOpen });
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [state.isOpen, dispatch]);

  React.useEffect(() => {
    if (state.isOpen) {
      setInputValue(state.query);
    }
  }, [state.isOpen, state.query]);

  const handleSelect = (result: Resource) => {
    dispatch({ type: "SET_OPEN", payload: false });
    router.push(`/semester/${result.semester}?subject=${result.subject}`);
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
    performSearch(inputValue);
  };

  const hasActiveFilters = Object.values(state.filters).some(Boolean);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    performSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      dispatch({ type: "SET_OPEN", payload: false });
    }
  };

  return (
    <>
      {/* Search Button */}
      <Button
        variant="outline"
        className={cn(
          "relative h-9 sm:h-10 w-full max-w-sm lg:max-w-md xl:max-w-lg p-0 justify-start px-3 sm:px-4 py-2 border-2 border-foreground hover:border-primary transition-all duration-200 hover:shadow-md bg-card/50 backdrop-blur-sm",
          className
        )}
        onClick={() => dispatch({ type: "SET_OPEN", payload: true })}
      >
        <SearchIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-foreground" />
        <span className="flex-1 text-left text-muted-foreground text-xs sm:text-sm">Search resources, subjects, or semesters...</span>
        <span className="sr-only">Search resources</span>
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 sm:h-6 select-none items-center gap-1 rounded border border-foreground/20 bg-muted/50 px-1 sm:px-2 font-mono text-[9px] sm:text-[10px] font-medium opacity-70 lg:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* Custom Search Modal */}
      {state.isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-start justify-center p-3 sm:p-4"
          onClick={() => dispatch({ type: "SET_OPEN", payload: false })}
        >
          <div 
            className="bg-card border-2 border-foreground rounded-lg shadow-2xl w-full max-w-2xl search-modal mt-8 sm:mt-16 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center border-b-2 border-foreground px-3 sm:px-4 py-3 sm:py-4 bg-gradient-to-r from-card to-card/80">
              <SearchIcon className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-foreground" />
              <input
                type="text"
                placeholder="Search resources, subjects, or semesters..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1 h-8 sm:h-10 bg-transparent search-input text-sm sm:text-base outline-none placeholder:text-muted-foreground"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch({ type: "SET_OPEN", payload: false })}
                className="h-8 w-8 sm:h-10 sm:w-10 p-0 hover:bg-accent/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Filters */}
            <div className="border-b border-foreground/20 px-3 sm:px-4 py-2 sm:py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters</span>
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs font-medium border border-foreground/20 bg-accent/10 text-accent">
                      {Object.values(state.filters).filter(Boolean).length}
                    </Badge>
                  )}
                </div>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-7 px-2 hover:bg-accent/20 text-xs"
                  >
                    Clear
                  </Button>
                )}
              </div>
              
              {/* Filter Options */}
              <div className="mt-3 space-y-3">
                <div>
                  <h5 className="text-xs font-medium mb-2">Semester</h5>
                  <div className="flex flex-wrap gap-1">
                    {[1, 2, 3, 4, 5, 6].map((sem) => (
                      <Badge
                        key={sem}
                        variant={state.filters.semester === sem ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer border-2 border-foreground filter-badge text-xs",
                          state.filters.semester === sem
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "hover:bg-accent/20"
                        )}
                        onClick={() => {
                          dispatch({
                            type: "SET_FILTER",
                            payload: {
                              key: "semester",
                              value: state.filters.semester === sem ? null : sem,
                            },
                          });
                          performSearch(inputValue);
                        }}
                      >
                        Semester {sem}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-xs font-medium mb-2">Type</h5>
                  <div className="flex flex-wrap gap-1">
                    {["Notes", "Books", "Assignments", "Projects"].map((type) => {
                      const Icon = resourceTypeIcons[type as keyof typeof resourceTypeIcons];
                      return (
                        <Badge
                          key={type}
                          variant={state.filters.type === type ? "default" : "outline"}
                          className={cn(
                            "cursor-pointer border-2 border-foreground filter-badge flex items-center gap-1 text-xs",
                            state.filters.type === type
                              ? "bg-primary text-primary-foreground hover:bg-primary/90"
                              : "hover:bg-accent/20"
                          )}
                          onClick={() => {
                            dispatch({
                              type: "SET_FILTER",
                              payload: {
                                key: "type",
                                value: state.filters.type === type ? null : type,
                              },
                            });
                            performSearch(inputValue);
                          }}
                        >
                          <Icon className="h-3 w-3" />
                          {type}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[300px] sm:max-h-[350px] overflow-y-auto">
              {state.results.length === 0 && !inputValue ? (
                <div className="py-8 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <SearchIcon className="h-8 w-8 text-foreground/30" />
                    <p className="text-muted-foreground text-sm">Start typing to search...</p>
                  </div>
                </div>
              ) : state.results.length === 0 && inputValue ? (
                <div className="py-8 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <SearchIcon className="h-8 w-8 text-foreground/30" />
                    <p className="text-muted-foreground text-sm">No results found</p>
                    <p className="text-xs text-muted-foreground/70">Try different keywords or check your filters</p>
                  </div>
                </div>
              ) : (
                <div className="p-2">
                  <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                    Search Results ({state.results.length})
                  </div>
                  {state.results.map((result) => {
                    const Icon = resourceTypeIcons[result.type as keyof typeof resourceTypeIcons];
                    return (
                      <div
                        key={result.id}
                        onClick={() => handleSelect(result)}
                        className="flex items-center gap-3 search-item p-3 hover:bg-accent/10 cursor-pointer transition-colors rounded-lg"
                      >
                        <div className="bg-primary/10 p-2 rounded-lg border border-foreground/20 flex-shrink-0">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-foreground truncate text-sm">{result.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {result.subject} • Semester {result.semester}
                          </div>
                        </div>
                        <Badge variant="secondary" className="border border-foreground/20 bg-accent/5 text-accent text-xs px-2 py-1">
                          {result.type}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Quick Access */}
              {!inputValue && (
                <div className="border-t border-foreground/20 p-2">
                  <div className="text-xs font-medium text-muted-foreground mb-2 px-2">Quick Access</div>
                  <div className="space-y-1">
                    {[
                      { id: 1, name: "Semester 1", desc: "Foundational courses" },
                      { id: 2, name: "Semester 2", desc: "Core programming" },
                      { id: 3, name: "Semester 3", desc: "Networks & databases" },
                      { id: 4, name: "Semester 4", desc: "Specialization tracks" },
                      { id: 5, name: "Semester 5", desc: "Advanced specialization" },
                    ].map((semester) => (
                      <div
                        key={semester.id}
                        onClick={() => {
                          dispatch({ type: "SET_OPEN", payload: false });
                          router.push(`/semester/${semester.id}`);
                        }}
                        className="flex items-center gap-3 search-item p-3 hover:bg-accent/10 cursor-pointer transition-colors rounded-lg"
                      >
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">{semester.name}</span>
                          <span className="text-xs text-muted-foreground">{semester.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 