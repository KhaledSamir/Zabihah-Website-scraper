export default class Business {
    constructor(name, address, addressDetails, phone) {
        this.name = name;
        this.address = address;
        this.street = addressDetails.street;
        this.city = addressDetails.city;
        this.state = addressDetails.state;
        this.zipCode = addressDetails.zipCode;
        this.phone = phone;
    }

    toString() {
        const string = `${this
            .name
            .trim()}, ${this
            .address
            .trim()
            .replaceAll(',', '')},United States,${this
            .state},${this
            .city},${this
            .zipCode},${this
            .phone
            .trim()}\n`

        return string;
    }
}