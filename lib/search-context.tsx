"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Resource } from "@/types/resource";
import { searchResources, SearchResult } from "./search";

interface SearchState {
  query: string;
  results: SearchResult[];
  filters: {
    semester: number | null;
    subject: string | null;
    type: string | null;
  };
  history: string[];
  isOpen: boolean;
}

type SearchAction =
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_RESULTS"; payload: SearchResult[] }
  | { type: "SET_FILTER"; payload: { key: keyof SearchState["filters"]; value: any } }
  | { type: "CLEAR_FILTERS" }
  | { type: "ADD_TO_HISTORY"; payload: string }
  | { type: "CLEAR_HISTORY" }
  | { type: "SET_OPEN"; payload: boolean };

const initialState: SearchState = {
  query: "",
  results: [],
  filters: {
    semester: null,
    subject: null,
    type: null,
  },
  history: [],
  isOpen: false,
};

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_RESULTS":
      return { ...state, results: action.payload };
    case "SET_FILTER":
      return {
        ...state,
        filters: { ...state.filters, [action.payload.key]: action.payload.value },
      };
    case "CLEAR_FILTERS":
      return { ...state, filters: initialState.filters };
    case "ADD_TO_HISTORY":
      return {
        ...state,
        history: [action.payload, ...state.history.filter(q => q !== action.payload)].slice(0, 5),
      };
    case "CLEAR_HISTORY":
      return { ...state, history: [] };
    case "SET_OPEN":
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
}

interface SearchContextType {
  state: SearchState;
  dispatch: React.Dispatch<SearchAction>;
  resources: Resource[];
  performSearch: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children, resources }: { children: React.ReactNode; resources: Resource[] }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const performSearch = (query: string) => {
    dispatch({ type: "SET_QUERY", payload: query });
    
    if (!query.trim()) {
      dispatch({ type: "SET_RESULTS", payload: [] });
      return;
    }

    let filteredResources = resources;

    // Apply filters
    if (state.filters.semester) {
      filteredResources = filteredResources.filter(r => r.semester === state.filters.semester);
    }
    if (state.filters.subject) {
      filteredResources = filteredResources.filter(r => r.subject === state.filters.subject);
    }
    if (state.filters.type) {
      filteredResources = filteredResources.filter(r => r.type === state.filters.type);
    }

    const results = searchResources(query, filteredResources);
    dispatch({ type: "SET_RESULTS", payload: results });
    
    if (query.trim()) {
      dispatch({ type: "ADD_TO_HISTORY", payload: query });
    }
  };

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      history.forEach((query: string) => {
        dispatch({ type: "ADD_TO_HISTORY", payload: query });
      });
    }
  }, []);

  // Save search history to localStorage
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(state.history));
  }, [state.history]);

  return (
    <SearchContext.Provider value={{ state, dispatch, resources, performSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
} 