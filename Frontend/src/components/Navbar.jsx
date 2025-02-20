import React, { useState } from "react";

import { Link } from "react-router-dom";

import { LogOut, Menu, Search } from "lucide-react";

import { authUser } from "../store/authUser";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { user, logOut } = authUser();
  return (
    <header className="max-w-6xl mx-auto flex justify-between items-center p-4 h-20 flex-wrap">
      <div className="flex items-center gap-10 z-50">
        <Link to={"/"}>
          <img src="/notflix-logo.png" alt="missing" className="w-32 sm:w-40" />
        </Link>

        {/* Desktop Navbar  */}
        <div className="hidden sm:flex gap-4 items-center">
          <Link to={"/"} className="hover:underline underline-offset-2">
            Movies
          </Link>
          <Link to={"/"} className="hover:underline underline-offset-2">
            TV Shows
          </Link>
          <Link to={"/"} className="hover:underline underline-offset-2">
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-2 md:gap-4 items-center z-50">
        <Link to={"/"}>
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src={user.profileImg}
          alt="missing"
          className="h-8 cursor-pointer rounded"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logOut} />

        <div className="sm:hidden">
          <Menu
            className="size-6 cursor-pointer"
            onClick={() => setShow(!show)}
          />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className={`w-full sm:hidden mt-4 rounded z-50 bg-black border ${
          show ? "opacity-100" : "opacity-0"
        } transition-all duration-200 border-gray-800`}
      >
        <Link
          to={"/"}
          className="hover:underline block p-2 underline-offset-2"
          onClick={() => setShow(!show)}
        >
          Movies
        </Link>
        <Link
          to={"/"}
          className="hover:underline block p-2 underline-offset-2"
          onClick={() => setShow(!show)}
        >
          TV Shows
        </Link>
        <Link
          to={"/"}
          className="hover:underline block p-2 underline-offset-2"
          onClick={() => setShow(!show)}
        >
          Search History
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
