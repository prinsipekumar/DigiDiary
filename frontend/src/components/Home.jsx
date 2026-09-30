import { useEffect, useState } from "react";
import axios from "axios";
import EntryModal from "./EntryModal";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const location = useLocation();

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please login");
        return;
      }

      const searchParams = new URLSearchParams(location.search);
      const search = searchParams.get("search") || "";

      const { data } = await axios.get("/api/diary", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filteredEntries = search
        ? data.filter(
            (entry) =>
              entry.title.toLowerCase().includes(search.toLowerCase()) ||
              entry.description.toLowerCase().includes(search.toLowerCase()),
          )
        : data;
      setEntries(filteredEntries);
    } catch (error) {
      setError("Failed to fetch entries");
      console.log(error);
    }
  };

  const handleEdit = (entry) => {
    setEditEntry(entry);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchEntries();
  }, [location.search]);

  const handleSaveEntry = (newEntry) => {
    if (editEntry) {
      setEntries(
        entries.map((entry) => (entry._id === newEntry._id ? newEntry : entry)),
      );
    } else {
      setEntries([...entries, newEntry]);
    }
    setEditEntry(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please login");
        return;
      }
      await axios.delete(`/api/diary/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (error) {
      setError("Failed to delete entry");
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-slate-800">
      {error && (
        <p className="text-red-500 md:text-semibold md:text-xl mb-4">{error}</p>
      )}
      <EntryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditEntry(null);
        }}
        entry={editEntry}
        onSave={handleSaveEntry}
      />
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-10 h-10 md:w-14 md:h-14 bg-gray-100 text-black text-2xl md:text-3xl rounded-full shadow-lg hover:bg-gray-200 flex items-center justify-center"
      >
        <span className="flex items-center justify-center h-full w-full pb-1">
          +
        </span>
      </button>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
        {entries.map((entry) => (
          <div
            className="break-inside-avoid bg-gray-600 p-4 rounded-lg shadow-md mb-4"
            key={entry._id}
          >
            <h3 className="text-lg font-medium text-white mb-2 wrap-break-word">
              {entry.title}
            </h3>
            <p className="text-gray-50 mb-4 whitespace-pre-line wrap-break-word">
              {entry.description}
            </p>
            <p className="text-sm text-gray-300 mb-4">
              {new Date(entry.updatedAt).toLocaleString()}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(entry)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(entry._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
