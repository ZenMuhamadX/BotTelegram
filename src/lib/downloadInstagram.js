const puppeteer = require("puppeteer");
const fs = require("fs");
const axios = require("axios");

const urlInstagramReels = async (ctx) => {
   if (!ctx) {
      return ctx.reply("internal sistem error...");
   }
   const url = await ctx.message.text.replace("/download", " ").trim();
   return url;
};

const main = async (ctx) => {
   if (!ctx) {
      console.error("Internal sistem error...");
      return ctx.reply("internal sistem error...");
   }
   const url = await urlInstagramReels(ctx);
   const idVideo = ctx.chat.id;
   if (!url.startsWith("https://www.instagram.com/reel/")) {
      ctx.reply("URL yang dimasukkan bukan URL Instagram Reels yang valid.");
      return null;
   }
   const loading = await ctx.reply("memproses 🔵");
   try {
      const browser = await puppeteer.launch({
         args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();
      await page.goto(url);
      await page.waitForSelector("video");
      const videoUrl = await page.evaluate(() => {
         const video = document.querySelector("video");
         return video.src;
      });
      if (!videoUrl) {
         throw new Error("Video tidak ditemukan pada halaman.");
      }
      const downloadVieo = fs.createWriteStream(
         `./video/reels${idVideo}.mp4`
      );
      const resVideo = await axios({
         url: videoUrl,
         method: "GET",
         responseType: "stream",
      });
      resVideo.data.pipe(downloadVieo);
      await downloadVieo.on("finish", async () => {
         await browser.close();
         await ctx.replyWithVideo({
            source: `./video/reels${idVideo}.mp4`,
         });
         await ctx.telegram.editMessageText(
            ctx.chat.id,
            loading.message_id,
            null,
            "Download Berhasil 🟢"
         );
         fs.unlinkSync(`./src/video/reels${idVideo}.mp4`);
         await page.close();
      });
   } catch (error) {
      console.error(error);
      ctx.telegram.editMessageText(
         ctx.chat.id,
         loading.message_id,
         null,
         "Terjadi kesalahan saat memproses. Silakan coba lagi."
      );
   }
};
module.exports = main;
