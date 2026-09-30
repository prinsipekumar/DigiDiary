import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const delay = setTimeout(() => {
      navigate(search.trim() ? `/?search=${encodeURIComponent(search)}` : "/");
    }, 500);
    return () => clearTimeout(delay);
  }, [search, navigate, user]);

  useEffect(() => {
    setSearch("");
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-slate-700 p-2 md:p-4 text-teal-300 text-sm md:text-2xl shadow-lg rounded-bl-sm rounded-br-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          className="flex flex-col items-center md:flex-row md:items-center"
          to="/"
        >
          <img
            className="w-10 h-10 mb-1 md:mb-0 md:mr-2"
            src="favicon.svg"
            alt="DigiDiary"
          />
          DigiDiary
        </Link>
        {user && (
          <>
            <div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Entries..."
                className="mt-0 w-30 md:w-full px-2 py-1 md:px-4 md:py-2 text-xs md:text-lg bg-gray-500 text-white border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-x-4 md:space-y-0">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-600 text-white text-2xl font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span className="text-teal-50 md:font-medium">
                {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
