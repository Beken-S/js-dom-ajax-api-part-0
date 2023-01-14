import { escape } from '../../common/utils';
import { getRenderTo } from '../../common/utils';

class SearchHistory {
    constructor(maxLength) {
        this.maxLength = maxLength;
        if (this.get() == null) {
            localStorage.setItem('searchHistory', JSON.stringify([]));
        }
    }

    get() {
        return JSON.parse(localStorage.getItem('searchHistory'));
    }

    add(query) {
        const history = this.get();

        const index = history.findIndex((item) => item.id === query.id);

        if (index > -1) {
            history.splice(index, 1);
        } else if (history.length > this.maxLength) {
            history.pop();
        }

        localStorage.setItem('searchHistory', JSON.stringify([query, ...history]));
    }

    getRecentSearchQueries(count) {
        const history = this.get();
        return history.slice(0, count);
    }

    findRecentSearchQueries(query, count) {
        const regexp = new RegExp(escape(query), 'i');
        const history = this.get();
        const itemsId = [];
        const items = [];

        if (history.length === 0) {
            return [null, null];
        }

        for (const historyItem of history) {
            if (items.length === count) {
                break;
            }
            if (historyItem.suggestion.search(regexp) > -1) {
                itemsId.push(historyItem.id);
                items.push(historyItem);
            }
        }

        if (items.length === 0) {
            return [null, null];
        }

        return [itemsId, items];
    }
}

function createHistoryItem({ suggestion, link }) {
    const historyItem = document.createElement('li');
    historyItem.classList.add('history__item');
    historyItem.dataset.link = link;
    historyItem.textContent = suggestion;
    return historyItem;
}

function getHistoryItems(suggestions) {
    const fragment = document.createDocumentFragment();
    fragment.append(...suggestions.map(createHistoryItem));
    return fragment;
}

function getRenderToHistory(historyElement) {
    const render = getRenderTo(historyElement);
    return function (suggestions) {
        if (suggestions == null) {
            render('');
            return;
        }
        render(getHistoryItems(suggestions));
    };
}

export { SearchHistory, getRenderToHistory };
