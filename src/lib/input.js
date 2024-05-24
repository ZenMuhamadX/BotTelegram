const sheet = require("./sheets.js");
require("dotenv").config();
const validator = require("validator");

const ID = process.env.spreadsheetID;

async function inputSheet(ctx) {
   if (!ctx) {
      console.error("ERR sistem");
      ctx.reply("Sistem Err");
      return;
   }
   const id = ctx.message.from.id;
   const first_name = ctx.message.from.first_name;
   const last_name = ctx.message.from.last_name;
   const message = ctx.message.text.replace("/input", "").trim();
   if (!message || message.length < 11) {
      ctx.reply("Harus Nomor HP!!!");
      return;
   }

   const validData = await ctx.reply("Data sedang di VALIDASI!!!🔵");

   if (validator.isMobilePhone(message, "id-ID") && message !== "") {
      if (message.length > 13) {
         await ctx.telegram.editMessageText(
            ctx.chat.id,
            validData.message_id,
            null,
            "Nomor Tidak Diketahui"
         );
         return;
      }
      try {
         // input ke spreadsheets
         await sheet.spreadsheets.values.append({
            spreadsheetId: ID,
            range: "A:E",
            valueInputOption: "USER_ENTERED",
            resource: {
               values: [[id, message, first_name + last_name, new Date()]],
            },
         });
      } catch (error) {
         console.error({ error: error });
         await ctx.telegram.editMessageText(
            ctx.chat.id,
            validData.message_id,
            null,
            "MAAF SISTEM SEDANG DIPERBAIKI..."
         );
      }
      await ctx.telegram.editMessageText(
         ctx.chat.id,
         validData.message_id,
         null,
         `VALID 🟢\n\nNO HP berhasil ditambahkan: ${message}`
      );
      console.log(
         `ID pengirim: ${id} `,
         `Isi pesan: ${message}`,
         `Name: ${first_name + last_name}`
      );
   } else {
      await ctx.telegram.editMessageText(
         ctx.chat.id,
         validData.message_id,
         null,
         `INVALID \n\n/input harus nomor hp dengan format yang benar`
      );
      return;
   }
}

module.exports = inputSheet;
