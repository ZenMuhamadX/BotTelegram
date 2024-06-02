// fase DEVELOPMENT!!!!!

const axios = require("axios");
const get = async (ctx) => {
   try {
      const res = await axios("http://localhost:3500");
      const parse = res.data.user.forEach((user) => {
         const message = `Data di database :
       ID: ${user.id}
       Name: ${user.name}
       `;
         ctx.reply(message);
      });
   } catch (error) {
      console.log("Database Kosong");
      ctx.reply("Database kosong");
   }
};
module.exports = get;
