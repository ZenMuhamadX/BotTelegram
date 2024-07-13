const express = require("express");
const app = express();
const bot = require("./command");

const setWebHook = () =>{
bot.telegram.setWebhook("https://webhook.zenxyz.online/webhook");
}

app.use(express.json());
// WEBHOOK
app.post("/webhook", (req, res) => {
   bot.handleUpdate(req.body, res);
});

app.get("/",(req,res)=>{
   setWebHook()
   res.status(200).json({
      OK:true,
      status:200,
      message:"Webhook Set",
   })
})


app.listen(5000, () => {
   console.log(`webhook SET`);
});
