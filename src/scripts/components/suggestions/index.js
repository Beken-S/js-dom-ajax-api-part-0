import { getHide, getShow, getSelectChildrenSequentially, escape } from '../../common/utils';

function cerateSuggestionsOptions({ id, link, suggestion }, query, visited = false) {
    const regex = new RegExp(`(${escape(query)})`, 'i');
    const suggestionOption = document.createElement('li');
    suggestionOption.id = id;
    suggestionOption.dataset.suggestion = suggestion;
    suggestionOption.dataset.link = link;
    suggestionOption.classList.add('search-box__suggestions-item');
    suggestionOption.innerHTML = suggestion.replace(regex, '<span class="bold">$1</span>');

    if (visited) {
        suggestionOption.classList.add('search-box__suggestions-item_visited');
    }

    return suggestionOption;
}

function getSuggestionsOptions(previousSuggestions, currentSuggestions, query) {
    const fragment = document.createDocumentFragment();

    if (previousSuggestions != null) {
        const visitedSuggestionsOptions = previousSuggestions.map((item) =>
            cerateSuggestionsOptions(item, query, true)
        );
        fragment.append(...visitedSuggestionsOptions);
    }

    if (currentSuggestions != null) {
        const newSuggestionsOptions = currentSuggestions.map((item) => cerateSuggestionsOptions(item, query));
        fragment.append(...newSuggestionsOptions);
    }

    return fragment;
}

function getRenderToSuggestions(suggestionsElement) {
    const hide = getHide(suggestionsElement);
    const show = getShow(suggestionsElement);

    return function (previousSuggestions, currentSuggestions, query) {
        if ((previousSuggestions == null && currentSuggestions == null) || !query) {
            suggestionsElement.replaceChildren('');
            hide();
            return;
        }
        suggestionsElement.replaceChildren(getSuggestionsOptions(previousSuggestions, currentSuggestions, query));
        show();
    };
}

function getSelectSuggestion(suggestions) {
    return getSelectChildrenSequentially(suggestions, 'search-box__suggestions-item_selected');
}

export { getRenderToSuggestions, getSelectSuggestion };
