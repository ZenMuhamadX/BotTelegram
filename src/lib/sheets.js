const { google } = require("googleapis");
const credential = "./src/credentials/auth.json";
// auth credential google
const auth = new google.auth.GoogleAuth({
   keyFile: credential,
   scopes: "https://www.googleapis.com/auth/spreadsheets",
});

// Error handling for authentication
auth
   .getClient()
   .then((client) => {
      console.log("Auth API Success...");
   })
   .catch((error) => {
      console.error("Error authenticating", error);
   });

// inisialisasi spreadshetts ID
const authSuces = google.sheets({
   version: "v4",
   auth,
});

module.exports = authSuces;
