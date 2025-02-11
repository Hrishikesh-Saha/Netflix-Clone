import { fetchFromTMBD } from "../services/tmdb.service.js";

export const getTrendingTv = async (req, res) => {
  try {
    const data = await fetchFromTMBD(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomTv =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.status(200).json({ success: true, content: randomTv });
  } catch (error) {
    console.log("Error in getTrendingTv controller: " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getTvTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMBD(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) return res.status(404).send(null);
    console.log("Error in getTvTrailers controller: " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getTvDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMBD(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    res.status(200).json({ success: true, details: data });
  } catch (error) {
    if (error.message.includes("404")) return res.status(404).send(null);
    console.log("Error in getTvDetails controller: " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSimilarTvs = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMBD(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    if (error.message.includes("404")) return res.status(404).send(null);
    console.log("Error in getSimilarTvs controller: " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getTvsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const data = await fetchFromTMBD(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in getTvsByCategory controller: " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
