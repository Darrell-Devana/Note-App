import Card from "@/components/ui/card";
import { useState, useEffect } from "react";
import { FilePlus, Notebook } from "lucide-react";
import Starred from "./starred";
import Recent from "./recent";
import { Link } from "react-router-dom";

interface Note {
  id: string;
  title: string;
  content: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastVisited: Date;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_LIST_URL)
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.output);
      });
  }, []);

  const sortedNotes = notes.slice().sort((a, b) => {
    return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-8 mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">Welcome, Darrell Devana</h1>
        <Link
          to={"/new"}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-2 rounded-md"
        >
          <FilePlus size={20} /> Create Note
        </Link>
      </div>
      {/* Recent content */}
      <Recent notes={sortedNotes} />
      {/* Starred content */}
      <Starred notes={sortedNotes} />
      {/* Dashboard content */}
      <div className="flex flex-col gap-2">
        <span className="text-gray-400 flex items-center gap-2">
          <Notebook size={20} /> All Notes
        </span>
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {/* how to sort by alphabetical order */}
          {sortedNotes.map((note) => (
            <Card
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
