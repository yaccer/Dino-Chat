const path = require("path");
const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", ({res}) => {
    res.sendFile("index.html");
});

app.get("/chat", ({res}) => {
    const options = {root: path.join(__dirname, "./public")};
    res.sendFile("/chat/index.html", options);
});

app.get("/end", ({res}) => {
    const options = {root: path.join(__dirname, "./public")};
    res.sendFile("/end/index.html", options);
});

app.listen(3000 , _ => {
    console.log("[SERVER] STARTED ON PORT 3000.");
});