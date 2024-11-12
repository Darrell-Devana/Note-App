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
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredNotes = sortedNotes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
      )
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">Welcome, Darrell Devana</h1>

        <div className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search notes..."
            className="w-full bg-gray-100 outline outline-gray-200 rounded-md py-2 px-6"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link
            to={"/new"}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-2 rounded-md"
          >
            <FilePlus size={20} />
            <span className="hidden sm:inline text-nowrap">New Note</span>
          </Link>
        </div>
      </div>
      {/* Recent content */}
      <Recent
        notes={filteredNotes}
        deleteNote={deleteNote}
        toggleFavorite={toggleFavorite}
      />
      {/* Starred content */}
      <Starred
        notes={filteredNotes}
        deleteNote={deleteNote}
        toggleFavorite={toggleFavorite}
      />
      {/* Dashboard content */}
      <div className="flex flex-col gap-2">
        <span className="text-gray-400 flex items-center gap-2 select-none">
          <Notebook size={20} /> All Notes
        </span>
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {filteredNotes.map((note) => (
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
