import Card from "@/components/ui/card";
import { Star } from "lucide-react";

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

export default function Starred({
  notes,
  deleteNote,
  toggleFavorite,
}: {
  notes: Note[];
  deleteNote: (id: string) => void;
  toggleFavorite: (id: string) => void;
}) {
  const favoriteNotes = notes.filter((note: Note) => note.isFavorite);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-gray-400 flex items-center gap-2 select-none">
        <Star size={20} /> Starred
      </span>
      {/* Dashboard content */}
      <div className="flex border-x gap-4 max-w-screen-lg overflow-x-scroll p-2">
        {favoriteNotes.map((note) => (
          <Card
            isHorizontal={true}
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
  );
}
