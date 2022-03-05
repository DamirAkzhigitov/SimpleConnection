const express = require('express')

const routes = (app) => {
  const router = express.Router()

  router.get("/", (req, res) => {

  });

  app.use("/api", router);
}

module.exports = routes;
