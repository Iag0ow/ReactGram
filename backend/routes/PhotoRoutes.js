const express = require("express");
const router = express.Router();

//Controllers
const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
} = require("../controllers/PhotoController");
//Middlewares
const {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
} = require("../middlewares/PhotoValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/HandleValidator");
const { imageUpload } = require("../middlewares/imageUpload");
//Routes
router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos);
router.get("/search", searchPhotos);

router.get("/:id", authGuard, getPhotoById);
router.put(
  "/:id",
  authGuard,
  imageUpload.single("image"),
  photoUpdateValidation(),
  validate,
  updatePhoto
);
router.put("/like/:id", authGuard, likePhoto);
router.put(
  "/comment/:id",
  authGuard,
  commentValidation(),
  validate,
  commentPhoto
);

module.exports = router;