import { useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { Link, useNavigate } from "react-router-dom";
import { House, Save } from "lucide-react";
import { SaveModal } from "@/components/save-modal";

export default function Editor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    [{ font: [] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    ["clean"], // remove formatting button
  ];

  useEffect(() => {
    new Quill("#editor", {
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: "Compose something great...",
      theme: "snow",
    });
  }, []);

  const openSaveModal = () => {
    setIsModalOpen(true);
  };

  const handleSave = (title: string, isFavorite: boolean) => {
    const quill = document.getElementById("editor");

    if (quill) {
      const content = quill.innerHTML;

      fetch(import.meta.env.VITE_ADD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content: content,
          isFavorite,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        navigate("/edit/" + data.id);
      })
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-3xl">New Note</h1>
        <div className="flex gap-2">
          <Link
            to={"/"}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-2 rounded-md"
          >
            <House size={20} /> Home
          </Link>
          <button
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-2 rounded-md"
            onClick={openSaveModal}
          >
            <Save size={20} /> Save
          </button>
        </div>
      </div>
      <div id="editor"></div>
      <SaveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
