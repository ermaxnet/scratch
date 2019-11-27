const express = require("express");
const http = require("http");
const app = express();

app.use("/", (req, res) => {
    res.send("Hello");
});

http.createServer(app).listen(9000, () => {
    console.log("http://localhost:9000");
});
