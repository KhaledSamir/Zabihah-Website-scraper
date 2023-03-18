import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {fileURLToPath} from 'url';
import * as request from 'request'
import Parser from './parser.js'
import axios from 'axios';

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
    const filePath = path.join(__dirname, '../public/data.csv');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment;filename=data.csv')
    res.status(200).sendFile(filePath)
})
app.post("/url", async(req, res) => {
    let url = req.body.url;
    const result = await parser.loadFromUrl(url)
    if (result) {
        axios.get('http://localhost:3000/download', { method: 'get'})
    }
    // res.send(`Hello from NodeJS!! You sent ${url}`)
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});