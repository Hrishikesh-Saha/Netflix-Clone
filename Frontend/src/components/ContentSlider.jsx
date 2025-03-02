import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useContentType } from "../store/content";
import { SMALL_IMG_BASE_URL } from "../constants/constants";

const ContentSlider = ({ category }) => {
  const { contentType } = useContentType();
  const [content, setContent] = useState();
  const [show, setShow] = useState(false);

  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setShow(window.innerWidth < 1024);

    handleResize(); // Run once on mount

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  const categoryName = category.replaceAll("_", " ");
  const upperCase = categoryName
    .split(" ")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1));
  const formattedCategoryName = upperCase.join(" ");
  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(res.data.content);
    };

    getContent();
  }, [contentType, category]);

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

  return (
    <div
      className="text-white bg-black px-5 md:px-20 relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategoryName} {formattedContentType}
      </h2>

      <div
        className="flex space-x-4 overflow-x-scroll no-scrollbar"
        ref={sliderRef}
      >
        {content?.map((item) => (
          <Link
            key={item.id}
            to={"/watch/" + item.id}
            className="min-w-[250px] relative group"
          >
            <div className="rounded overflow-hidden">
              <img
                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                alt="missing"
                className="group-hover:scale-125 ease-in-out transition-all duration-300"
              />
            </div>

            <p className="text-center mt-2">{item.name || item.title}</p>
          </Link>
        ))}
      </div>

      {show && (
        <>
          <button className="absolute top-1/2 left-5 -translate-y-1/2 md:left-24 flex items-center justify-center size-12 rounded-full bg-black/50 hover:bg-black/75 z-10 cursor-pointer">
            <ChevronLeft size={24} onClick={scrollLeft} />
          </button>
          <button className="absolute top-1/2 right-5 -translate-y-1/2 md:right-24 flex items-center justify-center size-12 rounded-full bg-black/50 hover:bg-black/75 z-10 cursor-pointer">
            <ChevronRight size={24} onClick={scrollRight} />
          </button>
        </>
      )}
    </div>
  );
};

export default ContentSlider;
