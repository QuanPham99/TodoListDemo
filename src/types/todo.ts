/** One item on the todo dashboard */
export type Todo = {
  id: string;
  title: string;
  /** ISO date string (YYYY-MM-DD) when present */
  dueDate?: string;
  completed: boolean;
};
