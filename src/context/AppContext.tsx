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
  /** Adds a todo (AddTodoPage intentionally skips this on submit for the demo bug) */
  addTodo: (todo: Omit<Todo, "id">) => void;
  toggleTodoComplete: (id: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

function newId(): string {
  return crypto.randomUUID();
}

/** Starter todo so “mark done” can be exercised without relying on Add todo (which is intentionally broken for the workshop). */
const WORKSHOP_SEED_TODOS: Todo[] = [
  {
    id: "workshop-seed-1",
    title: "Sample workshop todo",
    completed: false,
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>(WORKSHOP_SEED_TODOS);

  const addTodo = useCallback((todo: Omit<Todo, "id">) => {
    setTodos((prev) => [...prev, { ...todo, id: newId() }]);
  }, []);

  const toggleTodoComplete = useCallback((_id: string) => {
    // INTENTIONAL DEMO BUG: completion toggle does not update state (BA workshop / mark-done exercise).
    // setTodos((prev) =>
    //   prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    // );
  }, []);

  const value = useMemo(
    () => ({
      userEmail,
      setUserEmail,
      todos,
      addTodo,
      toggleTodoComplete,
    }),
    [userEmail, todos, addTodo, toggleTodoComplete],
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
