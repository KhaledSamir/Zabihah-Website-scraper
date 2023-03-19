import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {fileURLToPath} from 'url';
import Parser from './parser.js'
import axios from 'axios';
import fs from 'fs'
import * as blob from 'buffer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
const parser = new Parser();

app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
});

app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, '../public/data.csv'); //
    res.setHeader('Content-Type', 'text/csv'); //
    res.setHeader('Content-Disposition', 'attachment;filename=data.csv')
    res
        .status(200)
        .download(filePath, 'data.csv')
});

// res.download(filePath, (err) => {     console.log(err)     }) })
app.post("/url", async(req, res) => {
    let url = req.body.url;
    const data = await parser.loadFromUrl(url)
    // axios({url: `http://${req.headers.host}/download`, method: 'get', responseType: 'text/csv'}).then((r) => {
    //     res.send(r.data)
    //     file.destroy();
    // })

    res.send(data)

    // axios.get(path.join(__dirname, '../public/data.csv')).then(data => {
    // res.download(data) }); res.download(JSON.stringify(path.join(__dirname,
    // '../public/data.csv'))) if (result) {     axios({url:
    // 'http://localhost:3000/download', method: 'get', responseType:
    // 'blob'}).then((response) => {        // const url = new
    // blob.Blob([response.data])        // res.File(url) res.send(response.data) })
    // res.send(`Hello from NodeJS!! You sent ${url}`)
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});