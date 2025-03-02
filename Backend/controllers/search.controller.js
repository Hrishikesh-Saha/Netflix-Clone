import User from "../model/user.model.js";
import { fetchFromTMBD } from "../services/tmdb.service.js";

export const searchPerson = async (req, res) => {
  try {
    const { query } = req.params;

    const response = await fetchFromTMBD(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).json(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: Math.floor(Math.random() * 999999),
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchPerson controller: " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const searchMovie = async (req, res) => {
  try {
    const { query } = req.params;

    const response = await fetchFromTMBD(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).json(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: Math.floor(Math.random() * 999999),
          name: response.results[0].title,
          image: response.results[0].poster_path,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchMovie controller: " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const searchTv = async (req, res) => {
  try {
    const { query } = req.params;

    const response = await fetchFromTMBD(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).json(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: Math.floor(Math.random() * 999999),
          name: response.results[0].name,
          image: response.results[0].poster_path,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchTv controller: " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      history: req.user.searchHistory,
    });
  } catch (error) {
    console.log("Error in getSearchHistory controller: " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const removeItemFromSearchHistory = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: parseInt(id) },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Item removed from search history",
    });
  } catch (error) {
    console.log(
      "Error in removeItemFromSearchHistory controller: " + error.message
    );
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
