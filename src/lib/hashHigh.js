const crypto = require("crypto");

const findMatchingHash = (pattern) => {
    if (!pattern) return;
    const start = Date.now()
    let nonce = 0;
    while (true) {
        const data = pattern + nonce;
        const hash = crypto.createHash("sha256").update(data).digest("hex");
        if (hash.startsWith("00000")) {
	    const end = Date.now()
	    const timeTaken = (end-start)/1000
            console.log(`Matching hash found! ${hash}\n Nonce:${nonce} waktu: ${timeTaken}`);
            return { nonce, hash, timeTaken };
        }
        nonce++;
    }
};

const patternUser = async (ctx) => {
    const message = await ctx.message.text.replace("/hashigh", " ").trim();
    if (!message) {
        ctx.reply(
            "masukan pola yang akan dicari hash nonce nya contoh: /hashigh testing"
        );
        return;
    }
    return message;
};

const hash = async (ctx) => {
    const pattern = await patternUser(ctx);
    if (!pattern) return;
    const compute = await ctx.reply(
        `Validasi... \n\n Mohon tunggu Ini memerlukan komputasi yang sangat tinggi 🔵`
    );
    const { nonce, hash, timeTaken } = findMatchingHash(pattern);
    ctx.telegram.editMessageText(
        ctx.chat.id,
        compute.message_id,
        null,
        `Valid!!! 🟢 \n\n NONCE:  ${nonce}\n\n HASH:  ${hash}\n\n Ini adalah hasil komputasi hash yang diawali dengan kriteria 00000\n waktu: ${timeTaken}`
    );
};
module.exports = hash;
