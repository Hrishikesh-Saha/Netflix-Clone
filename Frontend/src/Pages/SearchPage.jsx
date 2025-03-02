import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Search } from "lucide-react";

import { useContentType } from "../store/content";

import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../constants/constants";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");

  const [results, setResults] = useState([]);
  const { setContentType } = useContentType();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(res.data.content);
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error(
          "Nothing was found, make sure you are searching in the right category."
        );
      } else {
        toast.error("An error has occured, please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center  gap-3 mb-4">
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "movie" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700 transition-all duration-200 cursor-pointer`}
            onClick={() => handleTabChange("movie")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "tv" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700 transition-all duration-200 cursor-pointer`}
            onClick={() => handleTabChange("tv")}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "person" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700 transition-all duration-200 cursor-pointer`}
            onClick={() => handleTabChange("person")}
          >
            Person
          </button>
        </div>

        <form
          className="flex items-stretch gap-2 max-w-2xl mx-auto mb-8"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-white bg-gray-800 p-2 rounded"
            placeholder={"Search for a " + activeTab}
          />

          <button className="p-2 rounded bg-red-600 hover:bg-red-700 text-white cursor-pointer">
            <Search className="size-6" />
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((item) => {
            if (!item.poster_path && !item.profile_path) {
              return null;
            }

            return (
              <div key={item.id} className="p-4 rounded bg-gray-800">
                {activeTab === "person" ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={ORIGINAL_IMG_BASE_URL + item.profile_path}
                      alt="missing"
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{item.name}</h2>
                  </div>
                ) : (
                  <Link
                    className="flex flex-col items-center"
                    to={"/watch/" + item.id}
                    onClick={() => setContentType(activeTab)}
                  >
                    <img
                      src={ORIGINAL_IMG_BASE_URL + item.poster_path}
                      alt="missing"
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {item.name || item.title}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
