const { google } = require("googleapis");

const getSheets = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./src/keys/sheetKey.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const sheets = google.sheets({
    version: "v4",
    auth: client,
  });

  return sheets;
};

const addRowToSheet = async (data) => {
  const sheets = await getSheets();

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: process.env.GOOGLE_SHEET_NAME,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [data],
    },
  });

  if (response.status !== 200) {
    throw {
      name: "SheetError",
      message: `Wrong statuscode from sheets response! Statuscode ${response.status}`,
    };
  }
  return response;
};

module.exports = { addRowToSheet };
