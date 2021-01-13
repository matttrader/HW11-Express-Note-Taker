var express = require("express");
var path = require("path");
var apiRoutes = require("./routes/api")
var htmlRoutes = require("./routes/view")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))
app.use("/", htmlRoutes);
app.use("/api", apiRoutes)

console.log("hi")

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });