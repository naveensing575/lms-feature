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
    // Optimistic UI update
    setItems((prev) =>
      prev.map((l) => (l.id === id ? { ...l, completed } : l))
    );

    const { error } = await supabase
      .from("lessons")
      .update({ completed })
      .eq("id", id);

    if (error) {
      console.error(error.message);
      // Rollback if update fails
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
          className="flex items-center justify-between border rounded p-3"
        >
          <div>
            <p className="font-medium">{lesson.title}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(lesson.date).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={lesson.completed}
              onCheckedChange={(checked) =>
                toggleComplete(lesson.id, Boolean(checked))
              }
            />
            <span className="text-sm">
              {lesson.completed ? "Completed" : "Pending"}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
