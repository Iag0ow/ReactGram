const express = require("express");

const router = express.Router();

//Controllers
const {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
} = require("../controllers/UserController");

//Middlewares
const validate = require("../middlewares/HandleValidator");
const authGuard = require("../middlewares/authGuard");
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("../middlewares/UserValidations");
const { imageUpload } = require("../middlewares/imageUpload");

//Routes
router.post("/register", userCreateValidation(), validate, register);
router.get("/profile", authGuard, getCurrentUser);
router.post("/login", loginValidation(), validate, login);
router.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  update
);
router.get("/:id", getUserById);

module.exports = router;
