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
}

export default function Starred({ notes }: { notes: Note[] }) {
  const favoriteNotes = notes.filter((note: Note) => note.isFavorite);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-gray-400 flex items-center gap-2">
        <Star size={20} /> Starred
      </span>
      {/* Dashboard content */}
      <div className="flex border-x gap-4 max-w-screen-lg overflow-x-scroll p-2 whitespace-nowrap">
        {favoriteNotes.map((note) => (
          <Card
            isHorizontal={true}
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
          />
        ))}
      </div>
    </div>
  );
}
