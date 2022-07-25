const express = require("express");
const app = express();

app.use(express.json());

app.use("/data", require("./api/data.js"));

const port = 5000 || 8080;

app.listen(port, () => console.log("server is up and running at port", port));
