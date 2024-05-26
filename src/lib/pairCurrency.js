const axios = require("axios");
require("dotenv").config();
const dayjs = require("dayjs");
const token = "2b0fcfd645b2bd3fdd27a280";
const isValidCurrency = require("../../validatorCodeCurrency");

const userCurrencyPair = async (ctx) => {
   try {
      const message = await ctx.message.text.split(" ");
      if (message.length < 4) {
         return;
      }
      const amount = message[1];
      const currency = message[2];
      const target = message[3];
      if (!amount || !currency || !target) {
         ctx.reply("masukan format yang benar contoh \n/convert 5 USD IDR");
         return;
      }
      const baseCurrencyParse = currency.toUpperCase();
      const targetCurrencyParse = target.toUpperCase();

      return { amount, baseCurrencyParse, targetCurrencyParse };
   } catch (error) {
      console.log(error);
   }
};

const result = async (ctx) => {
   const messageUser = await userCurrencyPair(ctx);
   if (!messageUser) {
      ctx.reply("masukan format yang benar contoh \n/convert 5 USD IDR");
      return;
   }
   const amount = messageUser.amount;
   if (isNaN(amount)) {
      ctx.reply("masukan jumlah yang valid");
      return;
   }
   const baseCurrency = messageUser.baseCurrencyParse;
   if (!isValidCurrency(baseCurrency)) {
      ctx.reply("masukan format yang benar contoh \n/convert 20 USD IDR");
      return;
   }
   const target = messageUser.targetCurrencyParse;
   if (!isValidCurrency(target)) {
      ctx.reply("masukan format yang benar contoh \n/convert 5 USD IDR");
      return;
   }
   try {
      const loading = await ctx.reply("Mencari... 🔵");
      const resFromApi = await axios.get(
         `https://v6.exchangerate-api.com/v6/${token}/pair/${baseCurrency}/${target}/${amount}`
      );
      const response = resFromApi.data;
      const kurs = response.conversion_rate;
      const resultConvert = response.conversion_result;
      const date = dayjs().format("DD MM YYYY");
      const time = dayjs().format(" HH:mm:ss");
      const messageToUser = `
    <b>Konversi Mata Uang Berhasil! 🟢</b>
   <b>Mata uang asal</b> : ${baseCurrency}
   <b>Mata uang tujuan</b> : ${target}
   <b>Jumlah asal</b> : ${amount} ${baseCurrency}
   <b>Hasil Konversi</b> : ${resultConvert} ${target}
   <b>Kurs 1</b> ${baseCurrency} = ${kurs} ${target}
   <b>Tanggal</b>: ${date}
   <b>Waktu</b> : ${time}

   <i><b>Sumber : www.exchangerate-api.com</b></i>`;
      await ctx.replyWithHTML(messageToUser);
      await ctx.telegram.editMessageText(
         ctx.chat.id,
         loading.message_id,
         null,
         "Success 🟢"
      );
   } catch (error) {
      console.error(error);
   }
};

module.exports = result;
