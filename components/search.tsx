"use client";

import * as React from "react";
import { Search as SearchIcon, X, Clock, Filter, ChevronDown, BookOpen, FileText, Book, ClipboardList, TrendingUp } from "lucide-react";
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
          "relative h-10 w-full max-w-sm lg:max-w-md xl:max-w-lg p-0 justify-start px-4 py-2 border-2 border-foreground hover:border-primary transition-all duration-200 hover:shadow-md bg-card/50 backdrop-blur-sm",
          className
        )}
        onClick={() => dispatch({ type: "SET_OPEN", payload: true })}
      >
        <SearchIcon className="h-4 w-4 mr-3 text-foreground" />
        <span className="flex-1 text-left text-muted-foreground">Search resources, subjects, or semesters...</span>
        <span className="sr-only">Search resources</span>
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-6 select-none items-center gap-1 rounded border border-foreground/20 bg-muted/50 px-2 font-mono text-[10px] font-medium opacity-70 lg:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog 
        open={state.isOpen} 
        onOpenChange={(open) => dispatch({ type: "SET_OPEN", payload: open })}
        className="border-2 border-foreground shadow-2xl"
      >
        <div className="flex items-center border-b-2 border-foreground px-4 py-3 bg-gradient-to-r from-card to-card/80">
          <SearchIcon className="mr-3 h-5 w-5 shrink-0 text-foreground" />
          <CommandInput
            placeholder="Search resources, subjects, or semesters..."
            value={state.query}
            onValueChange={performSearch}
            className="flex h-12 w-full rounded-md bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:ring-0"
            autoFocus
          />
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 px-3 hover:bg-accent/20 border border-foreground/20 rounded-md transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden lg:inline-flex ml-2 text-sm font-medium">Filters</span>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2 rounded-full px-2 py-0.5 text-xs font-medium border border-foreground/20 bg-accent/10 text-accent">
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
                            ? "bg-accent text-accent-foreground hover:bg-accent/90"
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
                              ? "bg-accent text-accent-foreground hover:bg-accent/90"
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
        <CommandList className="max-h-[400px] overflow-y-auto">
          <CommandEmpty className="py-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <SearchIcon className="h-8 w-8 text-foreground/30" />
              <p className="text-muted-foreground">No results found</p>
              <p className="text-sm text-muted-foreground/70">Try different keywords or check your filters</p>
              {state.query && (
                <div className="mt-4">
                  <CommandGroup heading="Search Suggestions">
                    <CommandItem
                      onSelect={() => performSearch("programming")}
                      className="hover:bg-accent/20 px-4 py-3"
                    >
                      <TrendingUp className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Try "programming"</span>
                    </CommandItem>
                    <CommandItem
                      onSelect={() => performSearch("data")}
                      className="hover:bg-accent/20 px-4 py-3"
                    >
                      <TrendingUp className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Try "data"</span>
                    </CommandItem>
                    <CommandItem
                      onSelect={() => performSearch("semester")}
                      className="hover:bg-accent/20 px-4 py-3"
                    >
                      <TrendingUp className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Try "semester"</span>
                    </CommandItem>
                  </CommandGroup>
                </div>
              )}
            </div>
          </CommandEmpty>
          {state.results.length > 0 && (
            <>
              <CommandGroup heading={`Search Results (${state.results.length})`}>
                {state.results.map((result) => {
                  const Icon = resourceTypeIcons[result.type as keyof typeof resourceTypeIcons];
                  return (
                    <CommandItem
                      key={result.id}
                      onSelect={() => handleSelect(result)}
                      className="flex flex-col items-start py-4 px-4 hover:bg-accent/20 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="bg-accent/10 p-2 rounded-lg border border-foreground/20 flex-shrink-0">
                          <Icon className="h-5 w-5 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-foreground truncate">{result.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {result.subject} • Semester {result.semester}
                          </div>
                        </div>
                        <Badge variant="secondary" className="border border-foreground/20 bg-accent/5 text-accent text-xs px-2 py-1">
                          {result.type}
                        </Badge>
                      </div>
                      {result.description && (
                        <div className="text-sm text-muted-foreground/80 mt-2 ml-11 line-clamp-2">
                          {result.description}
                        </div>
                      )}
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
                  className="flex items-center hover:bg-accent/20 px-4 py-3"
                >
                  <Clock className="mr-3 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{query}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandGroup heading="Quick Access">
            <CommandItem
              onSelect={() => {
                dispatch({ type: "SET_OPEN", payload: false });
                router.push("/semester/1");
              }}
              className="hover:bg-accent/20 px-4 py-3"
            >
              <BookOpen className="mr-3 h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="font-medium">Semester 1</span>
                <span className="text-xs text-muted-foreground">Foundational courses</span>
              </div>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                dispatch({ type: "SET_OPEN", payload: false });
                router.push("/semester/2");
              }}
              className="hover:bg-accent/20 px-4 py-3"
            >
              <BookOpen className="mr-3 h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="font-medium">Semester 2</span>
                <span className="text-xs text-muted-foreground">Core programming</span>
              </div>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                dispatch({ type: "SET_OPEN", payload: false });
                router.push("/semester/3");
              }}
              className="hover:bg-accent/20 px-4 py-3"
            >
              <BookOpen className="mr-3 h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="font-medium">Semester 3</span>
                <span className="text-xs text-muted-foreground">Networks & databases</span>
              </div>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                dispatch({ type: "SET_OPEN", payload: false });
                router.push("/semester/4");
              }}
              className="hover:bg-accent/20 px-4 py-3"
            >
              <BookOpen className="mr-3 h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="font-medium">Semester 4</span>
                <span className="text-xs text-muted-foreground">Specialization tracks</span>
              </div>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                dispatch({ type: "SET_OPEN", payload: false });
                router.push("/semester/5");
              }}
              className="hover:bg-accent/20 px-4 py-3"
            >
              <BookOpen className="mr-3 h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="font-medium">Semester 5</span>
                <span className="text-xs text-muted-foreground">Advanced specialization</span>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
} 