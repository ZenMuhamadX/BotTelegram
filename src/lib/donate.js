const qr = require("qrcode");

const usdt = async (ctx) => {
   try {
      const option = {
         type: "png",
         scale: 50,
         margin: 2,
         width: 10,
      };
      await qr.toFile(
         "./src/image/USDT.png",
         "0xe3b445e7a5a99c6a31f955a569936b69e9b2b3a4",
         option
      );
      const image = "./src/image/USDT.png";
      const text = `
      USDT
        Jaringan : BEP20
        `;
      // Pastikan ctx.sendPhoto telah diimpor atau didefinisikan dengan benar sebelum digunakan
      await ctx.replyWithPhoto({ source: image }, { caption: text });
   } catch (error) {
      // Tangani kesalahan di sini, misalnya:
      console.error(error);
      // throw error; // Jika Anda ingin melemparkan pesan kesalahan
   }
};

module.exports = usdt;
