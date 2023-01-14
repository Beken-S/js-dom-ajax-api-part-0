// для отмены предыдущего fetch если следующи выполнился раньше него
function onlyLast(callee) {
    let controller = new AbortController();
    let isOverPreviousCall = true;

    return async function (...args) {
        if (!isOverPreviousCall) {
            controller.abort();
            controller = new AbortController();
        }

        isOverPreviousCall = false;
        try {
            const response = await callee(...args, controller.signal);
            isOverPreviousCall = true;
            return response;
        } catch (error) {
            isOverPreviousCall = true;
            throw error;
        }
    };
}

export { onlyLast };
