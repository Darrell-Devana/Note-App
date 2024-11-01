import Card from "@/components/ui/card";
import { useState, useEffect } from "react";

interface Note {
  id: number;
  title: string;
  content: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function Starred() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetch("http://localhost:8008/list")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const favoriteNotes = data.output.filter((note: Note) => note.isFavorite);
        setNotes(favoriteNotes);
      });
  }, []);

  return (
    <div className="flex flex-col gap-6 mx-auto">
      <h1 className="font-bold text-3xl">Starred</h1>
      {/* Dashboard content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notes.map((note, i) => (
            <Card key={i} title={note.title} content={note.content} />
        ))}
      </div>
    </div>
  );
}
