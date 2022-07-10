const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));

//Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/recipe", require("./routes/api/recipe"));

//Serve static assests in production

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("recipe/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "recipe", "build", "index.html"));
  });
}

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
