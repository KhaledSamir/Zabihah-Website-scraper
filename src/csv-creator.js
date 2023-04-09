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
        return 'Listing Title, Listing Address, Listing Country, Listing State, Listing City, Listing Postal Code, Listing Phone\n';
    }
}