const path = require('path')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/static', express.static('./public'));

app.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

let count = 0;
let list = [

];
app.get('/log', function (req, res) {
    res.send(list.filter(row => row.id > req.query.last));
})

app.post('/send', function (req, res) {
    let row = { id: count, msg: req.body.msg };
    list.push(row);
    count++;
    res.send(row);
})
app.listen(port, function () {
    console.log(`application is listening on port ${port}...`)
})