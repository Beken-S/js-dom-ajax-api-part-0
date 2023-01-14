const searchBox = document.querySelector(".search-box");
const field = searchBox.querySelector(".search-box__field");
const suggestions = searchBox.querySelector(".search-box__suggestions-list");
const selectSuggestion = selectChildrenSequentially(suggestions, "search-box__suggestions-item_selected");
function selectChildrenSequentially(element, className) {
    let firstChild = element.firstElementChild;
    let lastChild = element.lastElementChild;
    let currentChild;
    return function(direction) {
        if (!firstChild) firstChild = element.firstElementChild;
        if (!lastChild) lastChild = element.lastElementChild;
        if (direction === "down") {
            const nextChild = currentChild?.nextElementSibling;
            if (currentChild && nextChild) {
                currentChild.classList.remove(className);
                nextChild.classList.add(className);
                currentChild = nextChild;
                return currentChild;
            }
            if (currentChild) currentChild.classList.remove(className);
            firstChild.classList.add(className);
            currentChild = firstChild;
            return currentChild;
        }
        if (direction === "up") {
            const previousChild = currentChild?.previousElementSibling;
            if (currentChild && previousChild) {
                currentChild.classList.remove(className);
                previousChild.classList.add(className);
                currentChild = previousChild;
                return currentChild;
            }
            if (currentChild) currentChild.classList.remove(className);
            lastChild.classList.add(className);
            currentChild = lastChild;
            return currentChild;
        }
        return currentChild;
    };
}
searchBox.addEventListener("keydown", (e)=>{
    if (e.code === "ArrowDown") {
        const currentSuggestions = selectSuggestion("down");
        field.value = currentSuggestions.textContent;
    }
    if (e.code === "ArrowUp") {
        e.preventDefault();
        const currentSuggestions1 = selectSuggestion("up");
        field.value = currentSuggestions1.textContent;
    }
});
const test = [
    {
        visited: true,
        value: "test 1"
    },
    {
        visited: true,
        value: "test 2"
    },
    {
        visited: true,
        value: "test 3"
    },
    {
        visited: true,
        value: "test 4"
    },
    {
        visited: true,
        value: "test 5"
    },
    {
        visited: false,
        value: "test 6"
    },
    {
        visited: false,
        value: "test 7"
    },
    {
        visited: false,
        value: "test 8"
    },
    {
        visited: false,
        value: "test 9"
    },
    {
        visited: false,
        value: "test 10"
    }
];
function getSuggestionsOptions(suggestions) {
    const fragment = document.createDocumentFragment();
    suggestions.forEach((suggestion)=>{
        const suggestionOption = document.createElement("li");
        suggestionOption.textContent = suggestion.value;
        suggestionOption.classList.add("search-box__suggestions-item");
        if (suggestion.visited) suggestionOption.classList.add("search-box__suggestions-item_visited");
        fragment.append(suggestionOption);
    });
    return fragment;
}
function render(to, markup) {
    to.replaceChildren(markup);
}
render(suggestions, getSuggestionsOptions(test));
setTimeout(()=>{
    test[1] = {
        visited: false,
        value: "test 11"
    };
    render(suggestions, getSuggestionsOptions(test));
}, 3000);

//# sourceMappingURL=index.6a31943b.js.map
