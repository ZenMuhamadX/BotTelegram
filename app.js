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
const pairCurrency = require("./src/lib/pairCurrency");
const token = process.env.KEYBOT;
const bot = new Telegraf(token);

let userMessage = {};

bot.use((ctx, next) => {
   if (ctx.message && ctx.message.from) {
      const userId = ctx.from.id;
      const username = ctx.message.from.username;
      const text = ctx.message.text;
      if (!userMessage[userId]) {
         userMessage[userId] = [];
      }
      userMessage[userId].push(ctx.message.message_id);
   }
   return next();
});

bot.command("clear", async (ctx) => {
   const userId = ctx.message.from.id;
   if (userMessage[userId]) {
      for (const messageId of userMessage[userId]) {
         try {
            await ctx.telegram.deleteMessage(ctx.chat.id, messageId);
         } catch (error) {
            console.log(error);
         }
      }
      userMessage[userId] = [];
   } else {
      ctx.reply("you have no message");
   }
});
const start = `
 <b>Selamat datang di bot multifungsi\n</b>
 /c untuk melihat market crypto\n
 /infogempa untuk info gempa\n 
 /cuaca untuk mengecek cuaca\n 
 /donate untuk donasi\n
 /qr untuk membuat qr code\n
 /convert untuk konversi mata uang\n
 /hashigh untuk mengecek nonce hash dengan difculty 0000\n
 /clear untuk menghapus pesan anda\n`

bot.start(async (ctx) => {
   await ctx.replyWithHTML(start);
});

bot.command("convert", async (ctx) => {
   await pairCurrency(ctx);
});

bot.command("update", async (ctx) => {
   const getIdAdmin = ctx.message.from.id;
   const IdAdmin = 6950915910;
   if (getIdAdmin == IdAdmin) {
      await update(ctx);
   } else {
      await ctx.reply("Maaf Anda bukan admin...");
      return;
   }
});

bot.command("hashigh", async (ctx) => {
   const admin = ctx.message.chat.id;
   if (admin === 6950915910) {
      await hashHigh(ctx);
   } else {
      await ctx.reply("Maaf Anda bukan admin...");
   }
});

bot.command("save", (ctx) => {
   ctx.reply("pesan disimpan");
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

bot.launch();
