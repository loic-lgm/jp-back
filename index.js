require("dotenv").config();
const app = require("./app");

app.use((req, res) => {
  res.status(404).send("404 Bad route");
});

app.listen(process.env.SERVER_PORT, function () {
  console.log("Server listening at: " + process.env.SERVER_PORT);
});