import { debounce } from './common/debounce';
import { onlyLast } from './common/only-last';
import { searchCity, getScores } from './api/api-provider';
import { SearchHistory, getRenderToHistory } from './components/search-history';
import { getRenderToSuggestions, getSelectSuggestion } from './components/suggestions';
import { getScoresMarkup } from './components/scores';
import { BaseError, ERROR_CODE } from './common/errors';

// объект для работы с localStorage
const history = new SearchHistory(100);

const searchBoxElement = document.querySelector('.search-box');
const fieldElement = searchBoxElement.querySelector('.search-box__field');
const suggestionsElement = searchBoxElement.querySelector('.search-box__suggestions-list');
const historyElement = document.querySelector('.history');
const outputElement = document.querySelector('.output');

const renderSuggestions = getRenderToSuggestions(suggestionsElement);
const renderHistory = getRenderToHistory(historyElement);
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

// для обработки ввода с клавиатуры поискового запроса
async function inputQueryHandler(event) {
    // флаг для предотвращения отрисовки предложений после события 'submit'
    sessionStorage.setItem('isSubmit', false);
    const query = event.target.value;

    if (!query) {
        // если null, undefined, ''
        renderSuggestions(); // очистить детей внутри блока с предложениями
        return;
    }

    // найти 5 недавних запросов
    const [recentSuggestionsId, recentSuggestions] = history.findRecentSearchQueries(query, 5);

    if (recentSuggestions != null) {
        renderSuggestions(recentSuggestions, null, query); // отрисовать
        selectSuggestion('update'); // обновить замыкание хранящее первое, последнее и выбранное предложение
    }

    const [newSuggestions, error] = await onlyLastSearchCity(query);

    // если за время ожидания промиса пользователь отправил форму прекратить выполнение функции
    if (JSON.parse(sessionStorage.getItem('isSubmit'))) {
        return;
    }
    if (error) {
        // отфильтровать ошибку возникающую при отмене fetch
        if (!(error instanceof DOMException)) {
            console.error(error);
        }
        return;
    }

    let currentSuggestions;

    if (newSuggestions != null && recentSuggestions != null) {
        const maxSuggestionsCount = 10;
        const maxNewSuggestionsCount = maxSuggestionsCount - recentSuggestions.length;

        // отфильтровать из нового поиска выбранные предыдущие варианты
        currentSuggestions = newSuggestions
            .filter((suggestion) => !recentSuggestionsId.includes(suggestion.id))
            .slice(0, maxNewSuggestionsCount);
    } else if (newSuggestions != null) {
        currentSuggestions = newSuggestions;
    }

    renderSuggestions(recentSuggestions, currentSuggestions, query);
    selectSuggestion('update'); // обновить замыкание хранящее первое, последнее и выбранное предложение
}
async function showScoresHandler(event) {
    outputElement.replaceChildren('Loading...');

    const [scores, error] = await onlyLastGetScores(event.detail);

    if (error instanceof BaseError && error.status === ERROR_CODE.NotFound) {
        outputElement.replaceChildren(error.message);
        return;
    }

    if (error) {
        if (!(error instanceof DOMException)) {
            console.error(error);
        }
        return;
    }
    outputElement.replaceChildren(getScoresMarkup(scores));
}

// для возможность выбора предложения стрелками на клавиатуре
function suggestionSelectionHandler(event) {
    if (event.code === 'ArrowDown') {
        const current = selectSuggestion('next'); // выбрать следующее предложение

        if (current != null) {
            fieldElement.value = current.dataset.suggestion;
        }
    }
    if (event.code === 'ArrowUp') {
        event.preventDefault();
        const current = selectSuggestion('previous'); // выбрать предыдущее предложение

        if (current != null) {
            fieldElement.value = current.dataset.suggestion;
        }
    }
}

// для обработки отправки формы
function submitQueryHandler(event) {
    event.preventDefault();
    sessionStorage.setItem('isSubmit', true);
    let currentSuggestions = selectSuggestion(); // получить текущий пункт
    if (currentSuggestions == null) {
        // если null попробовать получить первый пункт
        currentSuggestions = selectSuggestion('first');
        if (currentSuggestions == null) {
            // если null очистить строку ввода
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
    history.add(suggestion); // добавляем запрос в localStorage
    fieldElement.value = '';
    renderSuggestions(); // удалить дочерние элементы
    selectSuggestion('update'); // // обновить замыкание хранящее первое, последнее и выбранное предложение
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

// для обновления истории поиска на другой вкладке
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
