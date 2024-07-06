//load express functionality into express variable
const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes.js");
const apiRoutes = require("./routes/apiRoutes.js");

const PORT = process.env.PORT || 3001;
const app = express(); //returns an object

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//Use the api routes defined in apiRoutes.js
// http://localhost:3001/api
app.use("/api", apiRoutes);

// Use the HTML routes defined in htmlRoutes.js
// http://localhost:3001/
app.use("/", htmlRoutes);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
