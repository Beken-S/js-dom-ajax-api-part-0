function debounce(callee, timeoutMs) {
    let timer;

    return function perform(...args) {
        if (timer != null) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => callee(...args), timeoutMs);
    };
}

export { debounce };
