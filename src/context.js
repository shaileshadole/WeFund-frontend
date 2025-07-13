// src/context.js
import { createContext } from "react";

export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  loading: false,
  setLoading: () => {},
  cuser: {},
  setCUser: () => {},
});
