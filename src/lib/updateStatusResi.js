const sheet = require("./sheets");
require("dotenv").config();

const getResi = async (spreadsheetId, ranges) => {
   const response = await sheet.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges,
   });
   return await response.data.valueRanges.map((Range) => Range.values || []);
};

const updateResi = async (spreadsheetId, range, values) => {
   await sheet.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: {
         values,
      },
   });
};

const updateStatusResi = async (ctx) => {
   const spreadsheetId = process.env.spreadsheetID;
   const message = await ctx.message.text.split(" ");
   if (message.length < 3) {
      return ctx.reply("Id Resi Tidak valid");
   }
   const idToUpdate = message[1];
   const newUpdate = message.slice(2).join(" ");
   try {
      const loading = await ctx.reply("Mencari...");
      const [idResi, values] = await getResi(spreadsheetId, [
         "Data Order!G:G",
         "Data Order!H:H",
      ]);
      let updated = false;
      for (let i = 0; i < idResi.length; i++) {
         if (idResi[i][0] === idToUpdate) {
            if (values[i]) {
               values[i][0] = newUpdate;
            } else {
               values[i] = [newUpdate];
            }
            updated = true;
            break;
         }
      }
      if (!updated) {
         return ctx.telegram.editMessageText(
            ctx.chat.id,
            loading.message_id,
            null,
            `RESI ${idToUpdate} Tidak ditemukan`
         );
      }
      await updateResi(spreadsheetId, "Data Order!H:H", values);
      ctx.telegram.editMessageText(
         ctx.chat.id,
         loading.message_id,
         null,
         `Status Pengiriman ${idToUpdate} diperbarui`
      );
   } catch (error) {
      console.error("error", error);
      return ctx.reply("kesalahan Sistem....");
   }
};
module.exports = updateStatusResi;
