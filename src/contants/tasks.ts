import { PRIORITY } from "./priority";

export type task = {
  id: number;
  title: string;
  completed: boolean;
  priority: PRIORITY;
};
