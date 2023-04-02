export default class CSVCreator {
    constructor() {
        this.createCSV = this.createCSV;
    }

    createCSV(data) {
        try {
            const dataString = data.join('')
            let entireString = this.createHeader(); //'Name, Address, Phone\n'; //createHeader();
            entireString += dataString;
            return entireString
        } catch (error) {
            console.error(error);
        }
    }

    createHeader() {
        return 'Name, Address, Phone\n';
    }
}