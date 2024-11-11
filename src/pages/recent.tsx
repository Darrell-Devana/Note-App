import Card from "@/components/ui/card";
import { Clock3 } from "lucide-react";

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

export default function Recent({
  notes,
  deleteNote,
  toggleFavorite,
}: {
  notes: Note[];
  deleteNote: (id: string) => void;
  toggleFavorite: (id: string) => void;
}) {
  const recentNotes = notes
    .sort(
      (a, b) =>
        new Date(b.lastVisited).getTime() - new Date(a.lastVisited).getTime()
    )
    .slice(0, 5)
    .reverse();

  return (
    <div className="flex flex-col gap-2">
      <span className="text-gray-400 flex items-center gap-2 select-none">
        <Clock3 size={20} /> Recent
      </span>
      {/* Dashboard content */}
      <div className="flex border-x gap-4 max-w-screen-lg overflow-x-scroll p-2">
        {recentNotes.reverse().map((note) => (
          <Card
            isHorizontal={true}
            key={note.id}
            id={note.id}
            title={note.title}
            isFavorite={note.isFavorite}
            textContent={note.textContent}
            deleteNote={deleteNote}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
