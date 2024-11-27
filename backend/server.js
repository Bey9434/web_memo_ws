const express = require("express");
const app = express();
const port = 3001; // listenするport番号

app.get("/test", (req, res) => {
  res.send("hello world test test");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
