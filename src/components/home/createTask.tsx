import { PRIORITY } from "@/contants/priority";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Check, Plus, Trash2, X } from "lucide-react";
import { task } from "@/contants/tasks";

const CreateTask = () => {
  const [tasks, setTasks] = useState<task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [priority, setPriority] = useState<PRIORITY | undefined>(undefined);
  const [shortBy, setShortBy] = useState<"priority" | "completed">(`priority`);

  useEffect(() => {
    const storedTasks = window.localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newTask || !priority) {
      toast.warning("Please fill all fields");
      return;
    }

    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTask,
          completed: false,
          priority: priority,
        },
      ]);
      setNewTask("");
      setPriority("medium");
      toast.success(`Task added successfully with ${priority} Priority`);
      return;
    } else {
      toast.error("Please enter a valid task");
      return;
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (shortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    } else {
      return Number(b.completed) - Number(a.completed);
    }
  });

  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    if (updatedTasks.find((task) => task.id === id)?.completed) {
      toast.info("Task completed");
    }
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.error("Task deleted successfully");
  };

  return (
    <div className="py-10">
      <div className="">
        <Card className="max-w-[600px] mx-auto">
          <CardHeader>
            <CardTitle>Create A New Task</CardTitle>
            <CardDescription>Manage your daily tasks</CardDescription>
          </CardHeader>
          <CardContent className="*:space-y-1 space-y-2">
            <div className="">
              <Label>Title</Label>
              <Input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter a New Task"
                className="flex-grow"
                required
              />
            </div>
            <div className="">
              <Select
                value={priority}
                onValueChange={(value: PRIORITY) => setPriority(value)}
                required
              >
                <SelectTrigger>
                  <Label className="text-muted-foreground">
                    <SelectValue placeholder="Select priority..." />
                  </Label>
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button
              onClick={addTask}
              className="flex justify-center items-center"
            >
              <Plus className="animate-pulse" /> Add Task
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="">
        <div className="flex justify-center items-center py-6">
          <Card className="max-w-[800px] w-full">
            <CardHeader>
              <Select
                value={shortBy}
                onValueChange={(value: "priority" | "completed") =>
                  setShortBy(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="priority">Sort by Priority</SelectItem>
                  <SelectItem value="completed">Sort by Completion</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>

            <CardContent className="flex flex-col gap-2">
              {sortedTasks.map((task) => (
                <li
                  key={task.id}
                  className={`flex items-center justify-between py-2 px-5 rounded-lg ${
                    task.completed
                      ? "bg-emerald-100 dark:bg-emerald-700 "
                      : "bg-muted"
                  } transition-colors duration-300 ease-in-out`}
                >
                  <span
                    className={`flex-grow ${
                      task.completed ? "line-through" : "font-semibold"
                    }`}
                  >
                    {task.title}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      task.priority === "high"
                        ? "bg-destructive text-white "
                        : task.priority === "medium"
                        ? "bg-amber-400 text-black"
                        : "bg-lime-700 text-black"
                    }`}
                  >
                    {task.priority}
                  </span>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggleComplete(task.id)}
                    >
                      {task.completed ? (
                        <X className="w-4 h-4" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
