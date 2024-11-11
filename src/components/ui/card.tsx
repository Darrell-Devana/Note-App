import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { MoreVertical, Star, Trash2 } from "lucide-react";

export default function Card({
  id,
  title,
  isFavorite,
  textContent,
  isHorizontal = false,
  deleteNote,
  toggleFavorite,
}: {
  id: string;
  title: string;
  isFavorite: boolean;
  textContent: string;
  isHorizontal?: boolean;
  deleteNote: (id: string) => void;
  toggleFavorite: (id: string) => void;
}) {
  const handleDelete = () => {
    fetch(import.meta.env.VITE_DELETE_URL + id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        deleteNote(id);
      }
    });
  };

  const handleFavorite = () => {
    fetch(import.meta.env.VITE_FAVORITE_URL + id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        toggleFavorite(id);
      }
    })
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute top-2 right-2 hover:cursor-pointer hover:bg-gray-200 p-[1px] rounded-md">
          <MoreVertical size={20} className="hover:text-gray-700" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleDelete}>
            <Trash2 /> Delete
          </DropdownMenuItem>
          {isFavorite ? (
            <DropdownMenuItem onSelect={handleFavorite}>
              <Star /> Remove
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onSelect={handleFavorite}>
              <Star /> Star
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {isHorizontal ? (
        <Link
          to={"/edit/" + id}
          className="flex flex-col w-[200px] h-[150px] rounded-lg outline outline-gray-100 bg-white hover:bg-gray-50 p-6 shadow-md hover:cursor-pointer"
        >
          <h2 className="mb-4 text-xl font-semibold text-ellipsis overflow-hidden line-clamp-1 select-none">
            {title}
          </h2>
          <p className="text-gray-600 text-ellipsis overflow-hidden line-clamp-2 select-none">
            {textContent.slice(0, 150)}
          </p>
        </Link>
      ) : (
        <Link
          to={"/edit/" + id}
          className="flex flex-col min-w-min h-[150px] rounded-lg outline outline-gray-100 bg-white hover:bg-gray-50 p-6 shadow-md hover:cursor-pointer"
        >
          <h2 className="mb-4 text-xl font-semibold text-ellipsis overflow-hidden line-clamp-1 select-none">
            {title}
          </h2>
          <p className="text-gray-600 text-ellipsis overflow-hidden line-clamp-2 select-none">
            {textContent.slice(0, 150)}
          </p>
        </Link>
      )}
    </div>
  );
}
