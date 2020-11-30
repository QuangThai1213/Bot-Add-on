const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
var json2xls = require('json2xls');
const json = require('./asset/item.json')

// function getFirstID(item) {
//     let data = item.id.split(',')
//     if (Array.isArray(data) && data.length) {
//         return Number(data[0]);
//     }
//     return 0
// }
// let data = JSON.stringify(json.sort(function (a, b) {
//     return getFirstID(a) - getFirstID(b);
// }));

// fs.writeFileSync('item.json', data);

// const schema = {
//     'ID': {
//         prop: 'id',
//         type: (value) => {
//             return value
//         }
//     },
// }
// // File path.
// readXlsxFile('./asset/test.xlsx', { schema }).then((rows, errors) => {
//     console.log(rows)
// })

// var xls = json2xls(json);

// fs.writeFileSync('data.xlsx', xls, 'binary');
require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet');

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1RBHdyI-yAgvksAlKyQj-RKRACon1DoFVPeXN0Fz_lys');

async function getData() {
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);
    console.log(doc.sheetsByIndex[0])
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    let data = await sheet.getRows()
    await sheet.loadHeaderRow()
}


const { google } = require('googleapis');
const sheets = google.sheets('v4');
const axios = require('axios').default;
async function sortRows() {
    const authClient = await authorize();
    axios({
        method: 'post',
        url: 'https://sheets.googleapis.com/v4/spreadsheets/1RBHdyI-yAgvksAlKyQj-RKRACon1DoFVPeXN0Fz_lys:batchUpdate',
        data: {
            "requests": [
                {
                    "sortRange": {
                        "range": {
                            "sheetId": 1742649376,
                            "startRowIndex": 1
                        },
                        "sortSpecs": [
                            {
                                "sortOrder": "ASCENDING",
                                "dimensionIndex": 5
                            }
                        ]
                    }
                }
            ]
        },
        auth: authClient,
    });
}

async function authorize() {
    // TODO: Change placeholder below to generate authentication credentials. See
    // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
    //
    // Authorize using one of the following scopes:
    //   'https://www.googleapis.com/auth/drive'
    //   'https://www.googleapis.com/auth/drive.file'
    //   'https://www.googleapis.com/auth/spreadsheets'
    let authClient = null;

    if (authClient == null) {
        throw Error('authentication failed');
    }

    return authClient;
}

// getData();
sortRows();





// {
//     "requests": [
//       {
//         "sortRange": {
//           "range": {
//             "sheetId": 1742649376,
//             "startRowIndex": 1
//           },
//           "sortSpecs": [
//             {
//               "sortOrder": "ASCENDING",
//               "dimensionIndex": 5
//             }
//           ]
//         }
//       }
//     ]
//   }