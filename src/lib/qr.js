const qr = require("qrcode");
const fs = require("fs");
const data = async (ctx) => {
   if (!ctx) {
      return;
   }
   const message = await ctx.message.text.replace("/qr", " ").trim();
   return message;
};

const generateQr = async (ctx) => {
   const inputUser = await data(ctx);
   if (!inputUser) {
      ctx.reply("masukan data contoh: /qr tes");
      return;
   }
   ctx.reply;
   const option = {
      type: "png",
      scale: 50,
      margin: 2,
      width: 10,
   };
   const loading = await ctx.reply("mohon tunggu sebentar... 🔵");
   const uniqueFileName = `qr_${ctx.from.id}.png`;
   qr.toFile(
      `./src/image/qr/${uniqueFileName}`,
      inputUser,
      option,
      async (err) => {
         if (err) {
            console.log(err);
            ctx.reply("Sistem ERROR!");
            return;
         } else {
            const image = `./src/image/qr/${uniqueFileName}`;
            await ctx.replyWithPhoto({ source: image });
            await ctx.telegram.editMessageText(
               ctx.chat.id,
               loading.message_id,
               null,
               "QR Code Berhasil Dibuat"
            );
         }
      }
   );
};
module.exports = generateQr;
