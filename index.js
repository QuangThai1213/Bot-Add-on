// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 8080 });
// wss.on('connection', function connection(ws) {
//     ws.on('message', function incoming(message) {
//         jsonMessage = JSON.parse(message);
//         console.log(message)
//         console.log(jsonMessage)
//         var clientResponse = {
//             "status": 200,
//         };
//         clientResponse.message = [];
//         // clientResponse.message.push(jsonMessage);
//         ws.send(clientResponse);
//     });
// });
const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
var json2xls = require('json2xls');
const json = require('./asset/item.json')

function getFirstID(item) {
    let data = item.id.split(',')
    if (Array.isArray(data) && data.length) {
        return Number(data[0]);
    }
    return 0
}
let data = JSON.stringify(json.sort(function (a, b) {
    return getFirstID(a) - getFirstID(b);
}));

fs.writeFileSync('item.json', data);

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

var xls = json2xls(json);

fs.writeFileSync('data.xlsx', xls, 'binary');
