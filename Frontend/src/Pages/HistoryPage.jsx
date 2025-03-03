import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../constants/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

function formatDate(dateString) {
  const date = new Date(dateString);

  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthName[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

const HistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get("/api/v1/search/history");
        setSearchHistory(res.data.history);
      } catch (error) {
        console.log(error.message);
        setSearchHistory([]);
      }
    };

    getSearchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/v1/search/history/" + id);
      setSearchHistory(searchHistory.filter((item) => item.id !== id));
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  if (searchHistory.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex items-center justify-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory.map((item, index) => (
            <div
              key={index}
              className="flex items-start bg-gray-800 rounded p-4"
            >
              <img
                src={SMALL_IMG_BASE_URL + item.image}
                alt="missing"
                className="object-cover size-16 mr-4 rounded-full"
              />

              <div className="flex flex-col">
                <span className="text-white text-lg">
                  {item.title || item.name}
                </span>
                <span className="text-gray-400 text-sm">
                  {formatDate(item.createdAt)}
                </span>
              </div>

              <span
                className={`min-w-20 ${
                  item.searchType === "movie"
                    ? "bg-red-600"
                    : item.searchType === "tv"
                    ? " bg-blue-600"
                    : "bg-green-600"
                } items-center ml-auto py-1 px-3 text-center text-sm rounded-full`}
              >
                {item.searchType[0].toUpperCase() + item.searchType.slice(1)}
              </span>
              <Trash
                className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
                onClick={() => handleDelete(item.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
