import { ERROR_CODE, BaseError } from './errors';

async function getData(url, signal) {
    let response;
    try {
        response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            signal,
        });
    } catch (error) {
        if (error instanceof DOMException) {
            return [null, error];
        }
        return [null, new BaseError(ERROR_CODE.NetworkError, error.message)];
    }

    if (response.ok) {
        return [await response.json(), null];
    }
    if (response.status === 400) {
        return [null, new BaseError(ERROR_CODE.BadRequest, 'Некорректный запрос.')];
    }
    if (response.status === 404) {
        return [null, new BaseError(ERROR_CODE.NotFound, 'Информация не найдена.')];
    }
    return [null, new BaseError(ERROR_CODE.UnexpectedError, 'Что-то пошло не так.')];
}

export { getData };
