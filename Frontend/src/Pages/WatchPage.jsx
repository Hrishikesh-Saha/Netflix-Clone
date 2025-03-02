import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useContentType } from "../store/content";
import Navbar from "../components/Navbar";
import {
  ORIGINAL_IMG_BASE_URL,
  SMALL_IMG_BASE_URL,
} from "../constants/constants";
import WatchPageSkeleton from "../Skeletons/WatchPageSkeleton";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "long",
  });
}

const WatchPage = () => {
  const { id } = useParams();
  const { contentType } = useContentType();
  const [trailers, setTrailers] = useState([]);
  const [similarContent, setSimilarContent] = useState([]);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);

  const sliderRef = useRef();

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/trailers`
        );
        setTrailers(response.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };

    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/similar`
        );
        setSimilarContent(response.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };

    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/details`
        );
        setContent(response.data.details);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent({});
        }
      } finally {
        setLoading(false);
      }
    };

    getContentDetails();
  }, [contentType, id]);

  useEffect(() => {
    setLoading(true);
  }, [id, contentType]);

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1) {
      setCurrentTrailerIdx(currentTrailerIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentTrailerIdx > 0) {
      setCurrentTrailerIdx(currentTrailerIdx - 1);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );
  }
  return (
    <section className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 h-full pb-8">
        <Navbar />

        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`px-4 py-2 rounded text-white bg-gray-500/70 hover:bg-gray-500  ${
                currentTrailerIdx === 0
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`px-4 py-2 rounded text-white bg-gray-500/70 hover:bg-gray-500  ${
                currentTrailerIdx === trailers.length - 1
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div
          className={`${
            trailers.length > 0 ? "aspect-video" : "aspect-auto"
          } max-w-6xl mx-auto p-2 mb-8 md:px-0 sm:px-10`}
        >
          {trailers.length > 0 && (
            <ReactPlayer
              url={
                "https://www.youtube.com/watch?v=" +
                trailers[currentTrailerIdx]?.key
              }
              controls={true}
              height={"100%"}
              width={"100%"}
              className={"overflow-hidden mx-auto rounded-lg"}
            />
          )}

          {trailers.length === 0 && (
            <h2 className="text-lg text-center mt-5">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {content?.name || content?.title}
              </span>
            </h2>
          )}
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {content?.name || content?.title}
            </h2>

            <p className="mt-2 text-lg">
              {formatDate(content?.release_date || content?.first_air_date)} |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}
            </p>

            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>

          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="missing"
            className="max-h-[600px] rounded-md"
          />
        </div>

        {similarContent.length > 0 && (
          <div className="mt-12 relative max-w-6xl mx-auto">
            <h3 className="font-bold mb-4 text-3xl">Similar Movies/TV Shows</h3>
            <div
              className="flex overflow-x-scroll group no-scrollbar pb-4 gap-4"
              ref={sliderRef}
            >
              {similarContent.map((item) => {
                if (item.poster_path === null) return null;
                return (
                  <Link
                    key={item.id}
                    to={"/watch/" + item.id}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + item.poster_path}
                      alt="missing"
                      className="rounded-md w-full h-auto"
                    />
                    <h4 className="text-lg mt-2 font-semibold">
                      {item.title || item.name}
                    </h4>
                  </Link>
                );
              })}

              <ChevronLeft
                size={24}
                className="flex-none absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-red-400 rounded-full opacity-80 lg:opacity-0 lg:group-hover:opacity-80 transition-all duration-300 left-2 cursor-pointer text-white"
                onClick={scrollLeft}
              />

              <ChevronRight
                size={24}
                className="flex-none absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-red-400 rounded-full opacity-80 lg:opacity-0 lg:group-hover:opacity-80 transition-all duration-300 right-2 cursor-pointer text-white"
                onClick={scrollRight}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WatchPage;
