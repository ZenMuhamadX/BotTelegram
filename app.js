const express = require("express");
const app = express();
const bot = require("./command");

const setWebHook = () =>{
bot.telegram.setWebhook("https://webhook.zenxyz.online/hook");
}

app.use(express.json());
// WEBHOOK
app.post("/hook", (req, res) => {
   bot.handleUpdate(req.body, res);
});

app.get("/",(req,res)=>{
   setWebHook()
   res.status(200).json({
      OK:true,
      message:"Webhook Set",
   })
})


app.listen(5000, () => {
   console.log(`webhook SET`);
});
