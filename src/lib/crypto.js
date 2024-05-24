const coinMarketCap = require("coinmarketcap-api");
require("dotenv").config();

const api = "339ac0e7-001a-463a-8e9d-e938a80b1538";
const client = new coinMarketCap(api);

//fungsi untuk mendapatkan simbol crypto dari clien
const inputSymbol = async (ctx) => {
    const inputlower = await ctx.message.text;
    const parseInput = inputlower.split(" ")[1];
    if (!parseInput) {
        return;
    }
    const inputUpper = parseInput.toUpperCase();
    return inputUpper;
};

// fungsi untuk mengirim data
const sendMessage = async (final) => {
    const volume = final.quote.IDR;
    if (!volume) {
        return;
    }
    const price = volume.price;
    const parse = String(price).split(".")[0];
    const resParse = parseInt(parse).toLocaleString("id-ID");
    const send = `
    Name: ${final.name} 🟢
    Simbol : ${final.symbol}
    Price: ${resParse} IDR
    24hr Change: ${volume.percent_change_24h}%
    1hr Change: ${volume.percent_change_1h}%
    Total Supply: ${final.total_supply}
    `;
    return send;
};

// fungsi untuk memproses simbol
const process = async (ctx) => {
    const symbol = await inputSymbol(ctx);

    if (!symbol) {
        ctx.reply("masukan simbol contoh: /c btc");
        return;
    }
    const validasi = await ctx.replyWithHTML("<b>sedang mencari...</b> 🔵");

    // ambil data dari hasil
    const data = await getAPI(symbol);

    if (!data) return;
    if (Object.prototype.hasOwnProperty.call(data, symbol)) {
        const final = data[symbol];
        const send = await sendMessage(final);
        await ctx.telegram.editMessageText(
            ctx.chat.id,
            validasi.message_id,
            null,
            `crypto tersedia\n${send}`
        );
        return;
    } else {
        ctx.telegram.editMessageText(
            ctx.chat.id,
            validasi.message_id,
            null,
            `Tidak ada data yang diminta`
        );
    }
};

// hasil data dari api
const getAPI = async (symbol) => {
    try {
        const res = await client.getQuotes({
            symbol: [symbol],
            convert: "IDR",
        });
        return res.data;
    } catch (error) {
        console.error("error", error);
        return null;
    }
};

module.exports = process;
