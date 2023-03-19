import * as fs from 'fs';

export default class CSVCreator {
    constructor() {
        this.createCSV = this.createCSV;
        // this.__filename = url.fileURLToPath(import.meta.url);
        // this.dirname = path.dirname(this.__filename);
    }

    createCSV(data) {
        try {
            // const fileName = 'public/data.csv';
            // const file = fs.createWriteStream(fileName)
            const dataString = data.join('\n')
            let entireString = 'Name, Address, Phone\n';
            entireString += dataString;
            // fs.writeFileSync(fileName, dataString, { encoding: 'utf-8'})
            
            // file.close();
            return entireString
        } catch (error) {
            console.error(error);
        }
    }

}