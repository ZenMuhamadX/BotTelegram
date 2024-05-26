const fs = require("fs");
const path = "validasiCurrency/validCode.json";
const getCurrencyFromFile = () => {
   try {
      const rawData = fs.readFileSync(path, "utf8");
      const parseRawData = JSON.parse(rawData);
      return parseRawData.codes;
   } catch (error) {
      console.error("error parsing Data", error);
      return [];
   }
};
const currencyCodes = getCurrencyFromFile();

const isValidCurrency = (IdCurrency) => currencyCodes.includes(IdCurrency);

module.exports = isValidCurrency;
