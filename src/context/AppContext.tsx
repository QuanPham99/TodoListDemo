import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Todo } from "../types/todo";

type AppContextValue = {
  /** Logged-in user email, or null on the login page */
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
  todos: Todo[];
  addTodo: (todo: Omit<Todo, "id">) => void;
  toggleTodoComplete: (id: string) => void;
  deleteAllTodos: () => void;
  deleteTodo: (id: string) => void;
  updateTodoTitle: (id: string, newTitle: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

function newId(): string {
  return crypto.randomUUID();
}

/** Default list — grocery shopping items for the demo dashboard */
const WORKSHOP_SEED_TODOS: Todo[] = [
  { id: "grocery-1", title: "Buy milk", completed: false },
  { id: "grocery-2", title: "Buy eggs", completed: false },
  { id: "grocery-3", title: "Buy bread", completed: false },
  { id: "grocery-4", title: "Buy bananas", completed: false },
  { id: "grocery-5", title: "Buy chicken breast", completed: false },
  { id: "grocery-6", title: "Buy rice", completed: false },
  { id: "grocery-7", title: "Buy olive oil", completed: false },
  { id: "grocery-8", title: "Buy tomatoes", completed: false },
  { id: "grocery-9", title: "Buy cheese", completed: false },
  { id: "grocery-10", title: "Buy coffee", completed: false },
  { id: "grocery-11", title: "Buy spinach", completed: false },
  { id: "grocery-12", title: "Buy onions", completed: false },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>(WORKSHOP_SEED_TODOS);

  const addTodo = useCallback((todo: Omit<Todo, "id">) => {
    setTodos((prev) => [...prev, { ...todo, id: newId() }]);
  }, []);

  const toggleTodoComplete = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const deleteAllTodos = useCallback(() => {
    setTodos([]);
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateTodoTitle = useCallback((id: string, newTitle: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t)),
    );
  }, []);

  const value = useMemo(
    () => ({
      userEmail,
      setUserEmail,
      todos,
      addTodo,
      toggleTodoComplete,
      deleteAllTodos,
      deleteTodo,
      updateTodoTitle,
    }),
    [
      userEmail,
      todos,
      addTodo,
      toggleTodoComplete,
      deleteAllTodos,
      deleteTodo,
      updateTodoTitle,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within AppProvider");
  }
  return ctx;
}
