const axios = require('axios');

const get = async (ctx) => {
    try {
        const url = 'https://data.bmkg.go.id/DataMKG/TEWS/'

        const response = await axios(url + 'autogempa.json')

        const data = response.data

        const gempa = data.Infogempa.gempa

        const image = url + gempa.Shakemap

        const result = `
    Waktu:${gempa.Jam} | ${gempa.Tanggal}
    Magnitude:${gempa.Magnitude}
    Wilayah:${gempa.Wilayah}
    Potensi:${gempa.Potensi}
    Kedalaman:${gempa.Kedalaman}
    `
        await ctx.replyWithPhoto({ url: image }, { caption: result })
        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = get

