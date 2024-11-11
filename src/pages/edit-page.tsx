import { useEffect, useState, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { Link, useParams } from "react-router-dom";
import { House, Save } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

library.add(regularStar);
library.add(solidStar);

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

export default function EditPage() {
  const [note, setNote] = useState<Note>();
  const noteRef = useRef<Note>();
  noteRef.current = note;
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const { id } = useParams<{ id: string }>();
  const quillRef = useRef<any>(null);

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    [{ font: [] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    ["clean"],
  ];

  useEffect(() => {
    quillRef.current = new Quill("#editor", {
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: "Compose something great...",
      theme: "snow",
    });

    fetch(import.meta.env.VITE_OPEN_URL + id)
      .then((res) => res.json())
      .then((data) => {
        setNote(data.output);
        quillRef.current.setContents(data.output.content);
      });

    quillRef.current.focus();

    // Add event listener for Cmd+S or Ctrl+S to trigger save when Quill is focused
    const handleKeyDown = (event: any) => {
      if (quillRef.current && quillRef.current.hasFocus()) {
        if (event.key === "s" && (event.metaKey || event.ctrlKey)) {
          event.preventDefault(); // Prevent the default save dialog
          handleSave(); // Trigger save
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSave = () => {
    const quill = quillRef.current;
    if (quill) {
      const content = quill.getContents();
      const textContent = quill.getText();

      fetch(import.meta.env.VITE_UPDATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: noteRef.current?.id,
          content,
          title: noteRef.current?.title,
          isFavorite: noteRef.current?.isFavorite,
          textContent,
          createdAt: noteRef.current?.createdAt,
          updatedAt: moment().format(),
        }),
      }).then((res) => res.json());
    }
  };

  const toggleFavorite = () => {
    if (note) {
      setNote({
        ...note,
        isFavorite: !note.isFavorite,
      });
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (note) {
      setNote({
        ...note,
        title: e.target.value,
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          {/* Display input or title based on isEditingTitle state */}
          {isEditingTitle ? (
            <input
              type="text"
              value={note?.title || ""}
              onChange={handleTitleChange}
              onBlur={() => setIsEditingTitle(false)} // Exit edit mode on blur
              onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
              className="font-bold text-3xl border-b focus:outline-none"
              autoFocus
            />
          ) : (
            <>
              <h1
                onClick={() => setIsEditingTitle(true)}
                className="font-bold text-3xl"
              >
                {note?.title}
              </h1>
            </>
          )}
          <FontAwesomeIcon
            onClick={toggleFavorite}
            id="favoriteIcon"
            icon={note?.isFavorite ? solidStar : regularStar}
            className="text-yellow-500 hover:cursor-pointer select-none"
            size="xl"
          />
        </div>
        <div className="flex gap-2">
          <Link
            to={"/"}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-2 rounded-md"
          >
            <House size={20} /> Home
          </Link>
          <button
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-2 rounded-md"
            onClick={handleSave}
          >
            <Save size={20} /> Save
          </button>
        </div>
      </div>
      <div id="editor"></div>
    </div>
  );
}
