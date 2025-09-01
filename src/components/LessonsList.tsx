"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { Checkbox } from "@/components/ui/checkbox";

type Lesson = {
  id: string;
  title: string;
  date: string;
  completed: boolean;
};

export default function LessonsList({ lessons }: { lessons: Lesson[] }) {
  const supabase = supabaseBrowser();
  const [items, setItems] = useState(lessons);

  const toggleComplete = async (id: string, completed: boolean) => {
    setItems((prev) =>
      prev.map((l) => (l.id === id ? { ...l, completed } : l))
    );

    const { error } = await supabase
      .from("lessons")
      .update({ completed })
      .eq("id", id);

    if (error) {
      setItems((prev) =>
        prev.map((l) => (l.id === id ? { ...l, completed: !completed } : l))
      );
    }
  };

  return (
    <ul className="space-y-3">
      {items.map((lesson) => (
        <li
          key={lesson.id}
          className="flex items-center justify-between border rounded p-4 hover:shadow transition-all"
        >
          <div>
            <p
              className={`font-medium transition-all ${
                lesson.completed
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {lesson.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(lesson.date).toLocaleString()}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              checked={lesson.completed}
              onCheckedChange={(checked) =>
                toggleComplete(lesson.id, Boolean(checked))
              }
              className="h-6 w-6 border-2 border-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
            <span
              className={`text-base font-semibold transition-all ${
                lesson.completed ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {lesson.completed ? "Completed" : "Pending"}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
