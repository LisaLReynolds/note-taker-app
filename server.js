const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes.js");
const apiRoutes = require("./routes/apiRoutes.js");

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const api = apiRoutes(app); //pass the app instance to apiRoutes
app.use("/api", api);

// Use the HTML routes defined in htmlRoutes.js
app.use("/", htmlRoutes);

//Use the api routes defined in apiRoutes.js
app.use("/api", apiRoutes);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
