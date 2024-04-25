export default class {
    constructor(private e: Error) {}

    get message() {
        return this.e.message;
    }
}