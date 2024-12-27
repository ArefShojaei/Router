export class InvalidArgumentTypeError extends Error {
    constructor(message) {
        super(message)
        this.name = "Invalid argument error"
    }
}