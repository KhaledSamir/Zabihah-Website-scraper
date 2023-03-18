export default class Business {
    constructor(name, address, phone) {
        this.name = name;
        this.address = address;
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