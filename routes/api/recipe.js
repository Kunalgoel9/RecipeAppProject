const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Recipe = require("../../models/Recipe");

const router = express.Router();

//@route   POST api/recipes
//@desc    Send recipe
//type     public

router.post(
  "/",
  [
    auth,
    check("name", "name is required").not().isEmpty(),
    check("description", "description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newRecipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        user: req.user.id,
        img: req.body.img,
      });

      const recipe = await newRecipe.save();
      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
);

// @route   GET api/recipes
// @desc    Get all recipes

// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ date: -1 });
    res.json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// @route   GET api/recipes/:id
// @desc    Get all recipes

// @access  Private

router.get("/:id", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    res.json(recipe);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    console.log(err);

    res.status(500).send("Server error");
  }
});
router.put("/:id", auth, async (req, res) => {
  try {
    var recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }
    var recipeFields = {};
    if (req.body.name) recipeFields.name = req.body.name;
    if (req.body.description) recipeFields.description = req.body.description;
    if (req.body.steps) recipeFields.steps = req.body.steps;
    if (req.body.ingredients) recipeFields.ingredients = req.body.ingredients;
    if (req.body.img) recipeFields.img = req.body.img;
    recipe = await Recipe.findOneAndUpdate(
      { user: req.user.id },
      { $set: recipeFields },
      { new: true },
    );

    res.json(recipe);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    console.log(err);

    res.status(500).send("Server error");
  }
});

// @route   DELETE api/recipes/:id
// @desc    Delete recipe by id

// @access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    await recipe.remove();

    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Recipe not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
