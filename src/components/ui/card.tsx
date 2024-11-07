import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { MoreVertical } from "lucide-react";

export default function Card({
  id,
  title,
  content,
  isHorizontal = false,
}: {
  id: string;
  title: string;
  content: string;
  isHorizontal?: boolean;
}) {
  const stripHTML = (html : string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  const previewContent = stripHTML(content).slice(0, 150);

  // Dropdown menu items and actions
  const handleEdit = () => {
    console.log("Edit note:", id);
  };

  const handleDelete = () => {
    console.log("Delete note:", id);
  };
  
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute top-2 right-2 hover:cursor-pointer hover:bg-gray-200 p-[1px] rounded-md">
          <MoreVertical size={20} className="hover:text-gray-700"/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem onSelect={handleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isHorizontal ? (
        <Link
          to={"/edit/" + id}
          className="flex flex-col h-[150px] rounded-lg outline outline-gray-100 bg-white hover:bg-gray-50 p-6 shadow-md max-w-[200px] hover:cursor-pointer"
        >
          <h2 className="mb-4 text-xl font-semibold text-ellipsis overflow-hidden">{title}</h2>
          <p className="text-gray-600 text-ellipsis overflow-hidden">
            {previewContent}
          </p>
        </Link>
      ) : (
        <Link
          to={"/edit/" + id}
          className="flex flex-col min-w-min h-[150px] rounded-lg outline outline-gray-100 bg-white hover:bg-gray-50 p-6 shadow-md hover:cursor-pointer"
        >
          <h2 className="mb-4 text-xl font-semibold text-ellipsis overflow-hidden line-clamp-1">{title}</h2>
          <p className="text-gray-600 text-ellipsis overflow-hidden line-clamp-2">
            {previewContent}
          </p>
        </Link>
      )}
    </div>
  );
}
