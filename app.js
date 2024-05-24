const { Telegraf } = require("telegraf");
const gempa = require("./src/lib/bmkg");
const inputSheet = require("./src/lib/input");
const cuaca = require("./src/lib/cuaca");
const usdt = require("./src/lib/donate");
const crypto = require("./src/lib/crypto");
const qr = require("./src/lib/qr");
const hashHigh = require("./src/lib/hashHigh");
const update = require("./src/lib/updateStatusResi");
const download = require("./src/lib/downloadInstagram");
const token = process.env.KEYBOT;
const bot = new Telegraf(token);

// let messages = [];
// // Handler untuk semua jenis pesan
// bot.on("message", (ctx, next) => {
//    // Simpan ID pesan yang diterima
//    messages.push({ chatId: ctx.chat.id, messageId: ctx.message.message_id });
//    next();
// });

// // Handler untuk perintah /clear
// bot.command("clear", async (ctx) => {
//    const chatId = ctx.chat.id;

//    // Hapus semua pesan yang disimpan di array
//    for (const { chatId, messageId } of messages) {
//       try {
//          await ctx.telegram.deleteMessage(chatId, messageId);
//       } catch (err) {
//          console.log(
//             `Gagal menghapus pesan ${messageId} di chat ${chatId}:`,
//             err
//          );
//       }
//    }

//    // Bersihkan array setelah penghapusan
//    messages.length = 0;

//    // Kirim pesan konfirmasi dan hapus pesan konfirmasi itu sendiri setelah beberapa detik
//    ctx.reply("Semua pesan telah dihapus.").then((sentMessage) => {
//       setTimeout(() => {
//          ctx.telegram
//             .deleteMessage(sentMessage.chat.id, sentMessage.message_id)
//             .catch((err) => {
//                console.log("Gagal menghapus pesan konfirmasi:", err);
//             });
//       }, 5000); // 5 detik
//    });
// });
const start =
   "Selamat datang di bot multifungsi\n /c untuk melihat market crypto\n /infogempa untuk info gempa\n /cuaca untuk mengecek cuaca\n /donate untuk donasi";
bot.start((ctx) => ctx.reply(start));

bot.command("update", async (ctx) => {
   const getIdAdmin = ctx.message.from.id;
   const IdAdmin = 6950915910;
   if (getIdAdmin == IdAdmin) {
      await update(ctx);
   } else {
      return await ctx.reply("Maaf Anda bukan admin...");
   }
});

bot.command("download", async (ctx) => {
   await download(ctx);
});

bot.command("infogempa", async (ctx) => {
   await gempa(ctx);
});

bot.command("c", async (ctx) => {
   await crypto(ctx);
});

bot.command("qr", async (ctx) => {
   await qr(ctx);
});

bot.command("input", async (ctx) => {
   await inputSheet(ctx);
});

bot.command("cuaca", async (ctx) => {
   await cuaca(ctx);
});

bot.command("donate", async (ctx) => {
   await usdt(ctx);
});

bot.command("hashigh", async (ctx) => {
   const admin = ctx.message.chat.id;
   if (admin === 6950915910) {
      await hashHigh(ctx);
   } else {
      await ctx.reply("Maaf Anda bukan admin...");
   }
});

bot.launch();
