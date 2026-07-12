const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    service: "devops-demo-api",
    status: "running",
    version: process.env.APP_VERSION || "dev",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
