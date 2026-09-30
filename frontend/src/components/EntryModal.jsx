import { useEffect, useState } from "react";
import axios from "axios";

const EntryModal = ({ isOpen, onClose, entry, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(entry ? entry.title : "");
    setDescription(entry ? entry.description : "");
    setError("");
  }, [entry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please login");
        return;
      }

      const payload = { title, description };
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (entry) {
        const { data } = await axios.put(
          `/api/diary/${entry._id}`,
          payload,
          config,
        );
        onSave(data);
      } else {
        const { data } = await axios.post("/api/diary", payload, config);
        onSave(data);
      }
      setTitle("");
      setDescription("");
      setError("");
      onClose();
    } catch (error) {
      console.log("Error in saving entry: ", error);
      setError("Failed to Save");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="mx-6 mt-20 md:mt-0 w-full max-w-md md:max-w-xl lg:max-w-2xl p-6 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white mb-4">
          {entry ? "Edit Your Diary" : "Add To Your Diary"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Entry Title"
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Entry Description"
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
            >
              {entry ? "Update" : "Add"}
            </button>
            <button
              onClick={onClose}
              type="button"
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntryModal;
