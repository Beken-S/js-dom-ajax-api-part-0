class BaseError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

const ERROR_CODE = {
    BadRequest: 400,
    NotFound: 404,
    InvalidResponse: 1000,
    NetworkError: 1001,
    TypeError: 4000,
    UnexpectedError: 5000,
};

export { ERROR_CODE, BaseError };
