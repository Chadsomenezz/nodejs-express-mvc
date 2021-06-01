const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");

router.get("/create",blogController.blog_create_get)
router.get("/:id",blogController.blog_details);
//this is handle by ajax using fetch api
router.delete("/:id",blogController.blog_delete)
router.get("/",blogController.blog_index);
router.post("/",blogController.blog_create_post)
module.exports = router;