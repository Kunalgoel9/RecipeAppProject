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
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
/*"scripts": {
  "start": "node server",
  "server": "nodemon server",
  "client": "npm start --prefix client",
  "dev": "concurrently \"npm run server\" \"npm run client\"",
  "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
},
"author": "Kunal",
"license": "ISC",
"dependencies": {
  "bcryptjs": "^2.4.3",
  "config": "^3.3.6",
  "express": "^4.17.1",
  "express-validator": "^6.10.0",
  "gravatar": "^1.8.1",
  "jsonwebtoken": "^8.5.1",
  "mongoose": "^5.12.3",
  "request": "^2.88.2"
},
"devDependencies": {
  "concurrently": "^6.0.1",
  "nodemon": "^2.0.7"
}
*/
