const express = require("express");
const app = express();
const bot = require("./command");

app.use(express.json());
// WEBHOOK
app.post("/", (req, res) => {
   bot.handleUpdate(req.body, res);
});

app.get("/",(req,res)=>{
   res.status(200).json({
      OK:true,
      message:"Webhook Set",
   })
})


app.listen(5000, () => {
   console.log(`webhook SET`);
});
