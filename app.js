const express = require("express");
const app = express();
const bot = require("./command");

app.use(express.json());
// WEBHOOK
app.post("/webhook", (req, res) => {
   bot.handleUpdate(req.body, res);
   res.sendStatus(200)
});

app.listen(5000, () => {
   console.log(`webhook SET`);
});
