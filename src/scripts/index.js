import { debounce } from './common/debounce';
import { onlyLast } from './common/only-last';
import { searchCity, getScores } from './api/api-provider';
import { SearchHistory, getRenderToHistory } from './components/search-history';
import { getRenderToSuggestions, getSelectSuggestion } from './components/suggestions';
import { getScoresMarkup } from './components/scores';
import { BaseError, ERROR_CODE } from './common/errors';
import { getRenderTo } from './common/utils';

const history = new SearchHistory(100);
const searchBoxElement = document.querySelector('.search-box');
const fieldElement = searchBoxElement.querySelector('.search-box__field');
const suggestionsElement = searchBoxElement.querySelector('.search-box__suggestions-list');
const historyElement = document.querySelector('.history');
const outputElement = document.querySelector('.output');

const renderSuggestions = getRenderToSuggestions(suggestionsElement);
const renderHistory = getRenderToHistory(historyElement);
const renderOutput = getRenderTo(outputElement);
const selectSuggestion = getSelectSuggestion(suggestionsElement);
const onlyLastSearchCity = onlyLast(searchCity);
const onlyLastGetScores = onlyLast(getScores);
const debouncedInputHandler = debounce(inputQueryHandler, 200);
const debounceShowScoresHandler = debounce(showScoresHandler, 200);

searchBoxElement.addEventListener('keydown', suggestionSelectionHandler, true);
searchBoxElement.addEventListener('submit', submitQueryHandler, true);
fieldElement.addEventListener('input', debouncedInputHandler, true);
suggestionsElement.addEventListener('click', suggestionClickHandler);
historyElement.addEventListener('click', historyClickHandler);
document.addEventListener('showScore', debounceShowScoresHandler, true);
window.addEventListener('storage', historyChangeHandler, true);
window.onload = init;

function init() {
    fieldElement.value = '';
    renderHistory(history.getRecentSearchQueries(3));
}
async function inputQueryHandler(event) {
    sessionStorage.setItem('isSubmit', false);
    const query = event.target.value;

    if (!query) {
        renderSuggestions();
        return;
    }

    const [recentSuggestionsId, recentSuggestions] = history.findRecentSearchQueries(query, 5);

    if (recentSuggestions != null) {
        renderSuggestions(recentSuggestions, null, query);
        selectSuggestion('update');
    }

    const [newSuggestions, error] = await onlyLastSearchCity(event.target.value);

    if (JSON.parse(sessionStorage.getItem('isSubmit'))) {
        return;
    }
    if (error) {
        if (!(error instanceof DOMException)) {
            console.error(error);
        }
        return;
    }

    let currentSuggestions;

    if (newSuggestions != null && recentSuggestions != null) {
        const maxSuggestionsCount = 10;
        const maxNewSuggestionsCount = maxSuggestionsCount - recentSuggestions.length;
        currentSuggestions = newSuggestions
            .filter((suggestion) => !recentSuggestionsId.includes(suggestion.id))
            .slice(0, maxNewSuggestionsCount);
    } else if (newSuggestions != null) {
        currentSuggestions = newSuggestions;
    }

    renderSuggestions(recentSuggestions, currentSuggestions, query);
    selectSuggestion('update');
}
async function showScoresHandler(event) {
    renderOutput('Loading...');

    const [scores, error] = await onlyLastGetScores(event.detail);

    if (error instanceof BaseError && error.status === ERROR_CODE.NotFound) {
        renderOutput(error.message);
        return;
    }

    if (error) {
        if (!(error instanceof DOMException)) {
            console.error(error);
        }
        return;
    }
    renderOutput(getScoresMarkup(scores));
}
function suggestionSelectionHandler(event) {
    if (event.code === 'ArrowDown') {
        const current = selectSuggestion('next');

        if (current != null) {
            fieldElement.value = current.dataset.suggestion;
        }
    }
    if (event.code === 'ArrowUp') {
        event.preventDefault();
        const current = selectSuggestion('previous');

        if (current != null) {
            fieldElement.value = current.dataset.suggestion;
        }
    }
}
function submitQueryHandler(event) {
    event.preventDefault();
    sessionStorage.setItem('isSubmit', true);
    let currentSuggestions = selectSuggestion();
    if (currentSuggestions == null) {
        currentSuggestions = selectSuggestion('first');
        if (currentSuggestions == null) {
            fieldElement.value = '';
            return;
        }
    }
    const suggestion = {
        id: currentSuggestions.id,
        link: currentSuggestions.dataset.link,
        suggestion: currentSuggestions.dataset.suggestion,
    };
    document.dispatchEvent(new CustomEvent('showScore', { detail: suggestion.link }));
    history.add(suggestion);
    fieldElement.value = '';
    renderSuggestions();
    selectSuggestion('update');
    renderHistory(history.getRecentSearchQueries(3));
}
function suggestionClickHandler(event) {
    const element = event.target;
    if (element instanceof HTMLLIElement) {
        sessionStorage.setItem('isSubmit', true);
        const suggestion = {
            id: element.id,
            link: element.dataset.link,
            suggestion: element.dataset.suggestion,
        };
        document.dispatchEvent(new CustomEvent('showScore', { detail: suggestion.link }));
        history.add(suggestion);
        fieldElement.value = '';
        renderSuggestions();
        selectSuggestion('update');
        renderHistory(history.getRecentSearchQueries(3));
    }
}
function historyChangeHandler(event) {
    if ((event.key = 'searchHistory')) {
        renderHistory(history.getRecentSearchQueries(3));
    }
}
function historyClickHandler(event) {
    const element = event.target;

    if (element instanceof HTMLLIElement) {
        document.dispatchEvent(new CustomEvent('showScore', { detail: event.target.dataset.link }));
    }
}
