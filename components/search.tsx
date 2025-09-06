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
import { useIsMobile } from "@/components/ui/use-mobile";
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
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        dispatch({ type: "SET_OPEN", payload: !state.isOpen });
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [dispatch, state.isOpen]);

  const handleSearch = React.useCallback(
    (query: string) => {
      dispatch({ type: "SET_QUERY", payload: query });
      if (query.trim()) {
        performSearch(query);
      } else {
        dispatch({ type: "SET_RESULTS", payload: [] });
      }
    },
    [dispatch, performSearch]
  );

  const handleResourceSelect = (resource: Resource) => {
    // Add to recent searches
    const recentSearches = state.recentSearches.filter(
      (item) => item.id !== resource.id
    );
    recentSearches.unshift(resource);
    dispatch({
      type: "SET_RECENT_SEARCHES",
      payload: recentSearches.slice(0, 5),
    });

    // Navigate to resource
    router.push(resource.path);
    dispatch({ type: "SET_OPEN", payload: false });
  };

  const clearRecentSearches = () => {
    dispatch({ type: "SET_RECENT_SEARCHES", payload: [] });
  };

  const hasActiveFilters = Object.values(state.filters).some(Boolean);

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Mobile-optimized search trigger */}
      <div className="relative flex-1">
        <button
          onClick={() => dispatch({ type: "SET_OPEN", payload: true })}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-lg border-2 border-foreground bg-card px-3 py-2 text-sm text-muted-foreground hover:bg-accent/20 focus:bg-accent/20 transition-colors",
            isMobile && "h-12 px-4 text-base" // Larger touch target on mobile
          )}
        >
          <div className="flex items-center gap-2">
            <SearchIcon className={cn("h-4 w-4", isMobile && "h-5 w-5")} />
            <span>{isMobile ? "Search resources..." : "Search resources... (Ctrl+K)"}</span>
          </div>
          {!isMobile && (
            <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border border-accent bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          )}
        </button>
      </div>

      {/* Desktop-only filter button */}
      {!isMobile && (
        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-10 px-3 hover:bg-accent/20 border-2 border-foreground"
            >
              <Filter className="h-4 w-4" />
              <span className="ml-2">Filters</span>
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
                      }}
                    >
                      Sem {sem}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-sm font-medium">Resource Type</h5>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(resourceTypeIcons).map((type) => (
                    <Badge
                      key={type}
                      variant={state.filters.resourceType === type ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer border-2 border-foreground",
                        state.filters.resourceType === type
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "hover:bg-accent/20"
                      )}
                      onClick={() => {
                        dispatch({
                          type: "SET_FILTER",
                          payload: {
                            key: "resourceType",
                            value: state.filters.resourceType === type ? null : type,
                          },
                        });
                      }}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* Mobile-optimized search dialog */}
      <CommandDialog 
        open={state.isOpen} 
        onOpenChange={(open) => dispatch({ type: "SET_OPEN", payload: open })}
      >
        <div className={cn("flex items-center border-b px-3", isMobile && "px-4 py-2")}>
          <SearchIcon className={cn("mr-2 h-4 w-4 shrink-0 opacity-50", isMobile && "h-5 w-5")} />
          <CommandInput
            placeholder="Search for resources, subjects, or notes..."
            value={state.query}
            onValueChange={handleSearch}
            className={cn("flex h-11 w-full", isMobile && "h-12 text-base")}
          />
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: "SET_OPEN", payload: false })}
              className="ml-2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Mobile: Show filters inline */}
        {isMobile && hasActiveFilters && (
          <div className="border-b px-4 py-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Active Filters:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-6 px-2 text-xs"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {state.filters.semester && (
                <Badge variant="secondary" className="text-xs">
                  Semester {state.filters.semester}
                </Badge>
              )}
              {state.filters.resourceType && (
                <Badge variant="secondary" className="text-xs">
                  {state.filters.resourceType}
                </Badge>
              )}
            </div>
          </div>
        )}

        <CommandList className={cn(isMobile && "max-h-[60vh]")}>
          <CommandEmpty className={cn("py-6 text-center text-sm", isMobile && "py-8")}>
            {state.query ? "No resources found." : "Start typing to search..."}
          </CommandEmpty>

          {/* Recent searches - prioritized on mobile */}
          {!state.query && state.recentSearches.length > 0 && (
            <CommandGroup heading="Recent Searches">
              {state.recentSearches.map((resource) => {
                const Icon = resourceTypeIcons[resource.type as keyof typeof resourceTypeIcons] || FileText;
                return (
                  <CommandItem
                    key={resource.id}
                    value={resource.title}
                    onSelect={() => handleResourceSelect(resource)}
                    className={cn("flex items-center gap-2 px-4 py-3", isMobile && "py-4")}
                  >
                    <Clock className={cn("h-4 w-4 text-muted-foreground", isMobile && "h-5 w-5")} />
                    <Icon className={cn("h-4 w-4", isMobile && "h-5 w-5")} />
                    <div className="flex-1 min-w-0">
                      <div className={cn("font-medium truncate", isMobile && "text-base")}>
                        {resource.title}
                      </div>
                      <div className={cn("text-xs text-muted-foreground truncate", isMobile && "text-sm")}>
                        {resource.subject} • Semester {resource.semester}
                      </div>
                    </div>
                  </CommandItem>
                );
              })}
              <CommandSeparator />
              <CommandItem onSelect={clearRecentSearches} className="px-4 py-2 justify-center">
                <span className="text-xs text-muted-foreground">Clear recent searches</span>
              </CommandItem>
            </CommandGroup>
          )}

          {/* Search results */}
          {state.results.length > 0 && (
            <CommandGroup heading={`Results (${state.results.length})`}>
              {state.results.map((resource) => {
                const Icon = resourceTypeIcons[resource.type as keyof typeof resourceTypeIcons] || FileText;
                return (
                  <CommandItem
                    key={resource.id}
                    value={resource.title}
                    onSelect={() => handleResourceSelect(resource)}
                    className={cn("flex items-center gap-2 px-4 py-3", isMobile && "py-4")}
                  >
                    <Icon className={cn("h-4 w-4", isMobile && "h-5 w-5")} />
                    <div className="flex-1 min-w-0">
                      <div className={cn("font-medium truncate", isMobile && "text-base")}>
                        {resource.title}
                      </div>
                      <div className={cn("text-xs text-muted-foreground truncate", isMobile && "text-sm")}>
                        {resource.subject} • Semester {resource.semester} • {resource.type}
                      </div>
                    </div>
                    <Badge variant="outline" className={cn("text-xs", isMobile && "text-sm")}>
                      {resource.type}
                    </Badge>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
}