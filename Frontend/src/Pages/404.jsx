import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="min-h-screen text-white flex flex-col bg-cover bg-center items-center justify-center"
      style={{ backgroundImage: `url('/404.png')` }}
    >
      <header className="absolute top-0 left-0 p-4 bg-black w-full">
        <Link to={"/"}>
          <img src="/notflix-logo.png" alt="missing" className="h-8" />
        </Link>
      </header>
      <main className="z-10 error-oage--content text-center">
        <h1 className="mb-4 text-7xl font-semibold">Lost your way?</h1>
        <p className="text-xl mb-6">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page
        </p>
        <Link to={"/"} className="bg-white text-black py-2 px-4 rounded">
          Netflix Home
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
