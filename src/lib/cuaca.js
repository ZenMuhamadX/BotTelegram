const axios = require("axios");
require("dotenv").config();
const APIKey = "1bab54b801bb29427b5a1a90163342c0";

const cuaca = async (ctx) => {
   const message = await ctx.message.text.replace("/cuaca", "").trim();
   if (!message) {
      ctx.reply("Masukan nama kota contoh /cuaca jakarta");
      return;
   }
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${message}&appid=${APIKey}&units=metric`;
   const get = await axios.get(url).catch((error) => {
      ctx.reply("gagal mengambil data");
      return null;
   });
   if (!get) {
      return;
   }
   const res = get.data;
   if (res.cod === 404) {
      return ctx.reply("gagal mengambil data");
   }
   try {
      const sendmessage = `

        Cuaca Di ${res.name}\n
        Negara : ${res.sys.country}
        Temperature : ${res.main.temp}°C
        Temperature min : ${res.main.temp_min}°C
        Temperature max : ${res.main.temp_max}°C
        Weather : ${res.weather[0].main}
        Wind : ${res.wind.speed} m/s
        Kelembapan : ${res.main.humidity}%
        penglihatan : ${res.visibility}m

    `;
      await ctx.reply(sendmessage);
   } catch (error) {
      console.error(error);
      return ctx.telegram.editMessageText("Maaf Terjadi Kesalahan Sistem");
   }
};

module.exports = cuaca;
