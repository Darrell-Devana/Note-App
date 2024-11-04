import React, { useState, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Editor: React.FC = () => {
  const [editor, setEditor] = useState<Quill | null>(null);

  useEffect(() => {
    const quill = new Quill("#editor", {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "video"],
          ["clean"],
        ],
      },
      placeholder: "Compose something great...",
      theme: "snow",
    });

    setEditor(quill);
  }, []);

  return (
    <div className="flex flex-col gap-6 mx-auto">
      <h1 className="font-bold text-3xl">Editor</h1>
      <div id="editor" className="rounded-lg outline outline-gray-100 bg-white p-6 shadow-md"></div>
    </div>
  );
};

export default Editor;