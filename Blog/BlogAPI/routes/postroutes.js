const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  createpost,
  getposts,
  uploadimage,
  deletePost,
  updatePost,
} = require("../controllers/postcontroller");

router.route("/").post(protect, authorize("author"), createpost).get(getposts);
// router.route("/").post( createpost).get(getposts);

router
  .route("/:id")
  .delete( protect, authorize("author"),deletePost)
  .put( updatePost);

router.route("/:id/photo").put(uploadimage);
// router.route("/:id/photo").put(protect, authorize("author"), uploadimage);
module.exports = router;
