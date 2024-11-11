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
  textContent: string;
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

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setNotes((prevNotes) =>
      prevNotes.map(note => 
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
      )
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">Welcome, Darrell Devana</h1>
        <Link
          to={"/new"}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-2 rounded-md"
        >
          <FilePlus size={20} /> New Note
        </Link>
      </div>
      {/* Recent content */}
      <Recent notes={sortedNotes} deleteNote={deleteNote} toggleFavorite={toggleFavorite} />
      {/* Starred content */}
      <Starred notes={sortedNotes} deleteNote={deleteNote} toggleFavorite={toggleFavorite} />
      {/* Dashboard content */}
      <div className="flex flex-col gap-2">
        <span className="text-gray-400 flex items-center gap-2 select-none">
          <Notebook size={20} /> All Notes
        </span>
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {sortedNotes.map((note) => (
            <Card
              key={note.id}
              id={note.id}
              isFavorite={note.isFavorite}
              title={note.title}
              textContent={note.textContent}
              deleteNote={deleteNote}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
