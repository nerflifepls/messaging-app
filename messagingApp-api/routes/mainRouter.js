const express = require("express");
const app = express();
app.use(express.json());
const PORT = 6666;
const resetDatabaseOnStart = false;
const { dropDatabase, initializeDataBase } = require("../database/main.js");

const db = require("../database/main.js").db;

async function initialization() {
  if (resetDatabaseOnStart) {
    await dropDatabase(db);
  }
  await initializeDataBase(db);

  require("./users.js")(app);
  require("./friendRequests.js")(app);

  app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });
}

initialization()

module.exports = app;
