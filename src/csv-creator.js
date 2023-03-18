import * as fs from 'fs';

export default class CSVCreator {
    constructor() {
        this.createCSV = this.createCSV;
        // this.__filename = url.fileURLToPath(import.meta.url);
        // this.dirname = path.dirname(this.__filename);
    }

    async createCSV(data) {
        try {
            const fileName = 'public/data.csv';
            const file = fs.createWriteStream(fileName)
            const dataString = data.join('\n')
            file.write('Name, Address, Phone\n');
            file.write(dataString)
            fs.writeFileSync(fileName, dataString, 'utf-8', (err) => {
                if (!err) {
                    return true;
                }
            })
            
        } catch (error) {
            console.error(error);
        }
    }

}