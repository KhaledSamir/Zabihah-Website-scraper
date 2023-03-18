export default class Business {
    constructor(name, address, phone) {
        this.name = name;
        this.address = address;
        // let split = this     .address     .split(',') this.street = split[0];
        // this.city = split[1]; this.restOfString = split[2].trim().split(' ');
        // this.state = this.restOfString[0]; this.zipCode = this.restOfString[1];
        this.phone = phone;
    }

    toString() {
        const string = `${this
            .name
            .trim()}, ${this
            .address
            .trim()
            .replaceAll(',', '')}, ${this
            .phone
            .trim()}\n`

        return string;
    }
}