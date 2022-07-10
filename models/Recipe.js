const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  img: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  ingredients: {
    type: [String],
  },
  steps: {
    type: [String],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Recipe = mongoose.model("recipe", RecipeSchema);
