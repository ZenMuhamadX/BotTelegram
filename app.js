const express = require("express");
const app = express();
const bot = require("./command");

app.use(express.json());
// WEBHOOK
app.post("/webhook", (req, res) => {
   bot.handleUpdate(req.body, res);
});

app.get("/",(req,res)=>{
   res.status(200).json({
      OK:true,
      status:200,
      message:"Webhook Set",
   })
})
bot.telegram.setWebhook("https://webhook.zenxyz.online/webhook");

app.listen(5000, () => {
   console.log(`webhook SET`);
   console.log("webHook Succes");
});
