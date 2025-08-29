const express = require("express");
const {
  createCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/categoryController");

const categoryRouter = express.Router();

// Routes
categoryRouter.post("/", createCategory); // create new category
categoryRouter.get("/", getCategories); // get all categories
categoryRouter.delete("/:id", deleteCategory); // delete category by id

module.exports = categoryRouter;
