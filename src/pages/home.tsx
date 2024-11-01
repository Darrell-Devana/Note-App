import Card from "@/components/ui/card";
import { useState, useEffect } from "react";
import { FilePlus } from "lucide-react";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetch("http://localhost:8008/list")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNotes(data.output);
      });
  }, []);

  return (
    <div className="flex flex-col gap-6 mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">Welcome, Darrell Devana</h1>
        <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-2 rounded-md">
          <FilePlus size={20} /> Create Note
        </button>
      </div>
      {/* Dashboard content */}
      <div className="grid gap-6 grid-cols-3">
        {notes.map((note, i) => (
          <Card key={i} title={note.title} content={note.content} />
        ))}
      </div>
    </div>
  );
}
