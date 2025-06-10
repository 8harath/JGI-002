"use client";

import * as React from "react";
import { Search as SearchIcon, X, Clock, Filter, ChevronDown, BookOpen, FileText, Book, ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSearch } from "@/lib/search-context";
import { Resource } from "@/types/resource";

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

  const handleSelect = (result: Resource) => {
    dispatch({ type: "SET_OPEN", payload: false });
    router.push(`/semester/${result.semester}?subject=${result.subject}`);
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
    performSearch(state.query);
  };

  const getUniqueValues = (resources: Resource[], key: keyof Resource) => {
    return Array.from(new Set(resources.map(r => r[key]))).sort();
  };

  const hasActiveFilters = Object.values(state.filters).some(Boolean);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2 border-2 border-foreground hover:border-primary transition-colors",
          className
        )}
        onClick={() => dispatch({ type: "SET_OPEN", payload: true })}
      >
        <SearchIcon className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Search resources...</span>
        <span className="sr-only">Search resources</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border-2 border-foreground bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog 
        open={state.isOpen} 
        onOpenChange={(open) => dispatch({ type: "SET_OPEN", payload: open })}
        className="border-2 border-foreground"
      >
        <div className="flex items-center border-b-2 border-foreground px-3">
          <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput
            placeholder="Search resources..."
            value={state.query}
            onValueChange={performSearch}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 lg:px-3 hover:bg-accent/20"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden lg:inline-flex ml-2">Filters</span>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal border-2 border-foreground">
                    {Object.values(state.filters).filter(Boolean).length}
                  </Badge>
                )}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 border-2 border-foreground" align="end">
              <div className="flex items-center justify-between border-b-2 border-foreground px-4 py-2">
                <h4 className="font-medium">Filters</h4>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-8 px-2 hover:bg-accent/20"
                  >
                    Clear
                  </Button>
                )}
              </div>
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Semester</h5>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6].map((sem) => (
                      <Badge
                        key={sem}
                        variant={state.filters.semester === sem ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer border-2 border-foreground",
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
                          performSearch(state.query);
                        }}
                      >
                        Semester {sem}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Type</h5>
                  <div className="flex flex-wrap gap-2">
                    {["Notes", "Books", "Assignments", "Projects"].map((type) => {
                      const Icon = resourceTypeIcons[type as keyof typeof resourceTypeIcons];
                      return (
                        <Badge
                          key={type}
                          variant={state.filters.type === type ? "default" : "outline"}
                          className={cn(
                            "cursor-pointer border-2 border-foreground flex items-center gap-1",
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
                            performSearch(state.query);
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
            </PopoverContent>
          </Popover>
        </div>
        <CommandList>
          <CommandEmpty className="py-6 text-center text-muted-foreground">
            No results found.
          </CommandEmpty>
          {state.results.length > 0 && (
            <>
              <CommandGroup heading="Search Results">
                {state.results.map((result) => {
                  const Icon = resourceTypeIcons[result.type as keyof typeof resourceTypeIcons];
                  return (
                    <CommandItem
                      key={result.id}
                      onSelect={() => handleSelect(result)}
                      className="flex flex-col items-start py-3 hover:bg-accent/20"
                    >
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-1.5 rounded-md border-2 border-foreground">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="font-medium">{result.title}</div>
                      </div>
                      <div className="text-sm text-muted-foreground ml-8">
                        {result.subject} • Semester {result.semester}
                      </div>
                      <div className="mt-1 ml-8 flex gap-2">
                        <Badge variant="secondary" className="border-2 border-foreground">
                          {result.type}
                        </Badge>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}
          {state.history.length > 0 && (
            <CommandGroup heading="Recent Searches">
              {state.history.map((query) => (
                <CommandItem
                  key={query}
                  onSelect={() => performSearch(query)}
                  className="flex items-center hover:bg-accent/20"
                >
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{query}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandGroup heading="Quick Links">
            <CommandItem
              onSelect={() => {
                dispatch({ type: "SET_OPEN", payload: false });
                router.push("/semester/1");
              }}
              className="hover:bg-accent/20"
            >
              <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
              Semester 1 Resources
            </CommandItem>
            <CommandItem
              onSelect={() => {
                dispatch({ type: "SET_OPEN", payload: false });
                router.push("/semester/2");
              }}
              className="hover:bg-accent/20"
            >
              <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
              Semester 2 Resources
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
} 