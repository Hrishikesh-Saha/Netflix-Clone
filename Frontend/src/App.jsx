import React, { useEffect } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import HomePage from "./Pages/Home/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import WatchPage from "./Pages/WatchPage";
import SearchPage from "./Pages/SearchPage";
import HistoryPage from "./Pages/HistoryPage";
import NotFound from "./Pages/404";

import Footer from "./components/Footer";

import { authUser } from "./store/authUser";

import { Loader } from "lucide-react";

const App = () => {
  const { user, isCheckingAuth, authCheck } = authUser();

  useEffect(() => {
    authCheck();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <Loader className="text-red-600 animate-spin size-8" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/history"
          element={user ? <HistoryPage /> : <Navigate to={"/login"} />}
        />
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
      <Toaster />
      <Footer />
    </>
  );
};

export default App;
