import express from "express";

import {
  checkAuth,
  login,
  logOut,
  signUp,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.post("/logout", logOut);

router.get("/check", protectRoute, checkAuth);

export default router;
