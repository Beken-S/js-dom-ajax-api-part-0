function escape(string) {
    const regexp = /[.*+?^${}()|[\]\\]/g;
    return string.replace(regexp, '\\$&');
}

function getHide(element) {
    return function () {
        element.classList.add('hidden');
    };
}

function getShow(element) {
    return function () {
        element.classList.remove('hidden');
    };
}

function getSelectChildrenSequentially(element, addedClassName) {
    let currentChild = null;

    return function (action) {
        const firstChild = element.firstElementChild;
        const lastChild = element.lastElementChild;

        function update() {
            if (currentChild != null) {
                currentChild.classList.remove(addedClassName);
                currentChild = null;
            }
        }
        function selectFirst() {
            currentChild = firstChild;

            if (currentChild != null) {
                currentChild.classList.add(addedClassName);
            }
        }
        function selectNext() {
            if (firstChild == null && lastChild == null) {
                return;
            }
            if (currentChild == null) {
                currentChild = firstChild;
            }

            const nextChild = currentChild?.nextElementSibling;

            currentChild.classList.remove(addedClassName);

            if (nextChild != null) {
                currentChild = nextChild;
            } else {
                currentChild = firstChild;
            }
            currentChild.classList.add(addedClassName);
        }
        function selectPrevious() {
            if (firstChild == null && lastChild == null) {
                return;
            }
            if (currentChild == null) {
                currentChild = lastChild;
            }

            const previousChild = currentChild?.previousElementSibling;

            currentChild.classList.remove(addedClassName);

            if (previousChild != null) {
                currentChild = previousChild;
            } else {
                currentChild = lastChild;
            }
            currentChild.classList.add(addedClassName);
        }

        switch (action) {
            case 'update':
                update();
                break;
            case 'first':
                selectFirst();
                break;
            case 'next':
                selectNext();
                break;
            case 'previous':
                selectPrevious();
                break;
        }

        return currentChild;
    };
}

export { getHide, getShow, getSelectChildrenSequentially, escape };
