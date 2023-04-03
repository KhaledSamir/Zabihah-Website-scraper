import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {fileURLToPath} from 'url';
import Parser from './parser.js'

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

app.post("/parse", async(req, res) => {
    const searchParameters = req.body.searchParameters;
    const data = await parser.loadData(searchParameters);
    if (!data) {
        res.send("No data found. Please try to change city or radius.")
    } else 
        res.send(data)
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});