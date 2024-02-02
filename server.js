require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;
console.log(process.env.NODE_ENV);

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "public")));

//# root for show in index
app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

//# others routes
app.use("/api/v1", require("./routes/v1/root"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

//# gestione dell'errore (anche di ADDRESS ALREADY IN USE)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
