import { useState } from "react";

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, isFavorite: boolean) => void;
}

export function SaveModal({ isOpen, onClose, onSave }: SaveModalProps) {
  const [title, setTitle] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onClose();
    onSave(title, isFavorite);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">Save Note</h2>

        <label className="block mb-2">
          <span className="text-sm font-medium">Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Enter note title"
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isFavorite}
            onChange={() => setIsFavorite(!isFavorite)}
          />
          <span className="text-sm">Mark as favorite</span>
        </label>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
