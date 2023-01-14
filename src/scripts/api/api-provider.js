import { BaseError, ERROR_CODE } from '../common/errors';
import { getData } from '../common/get-data';

const BASE_URL = 'https://api.teleport.org';
const MAIN_PATH = 'api';
const SEARCH_PARAMS = new URLSearchParams([
    ['search', ''],
    ['limit', 10],
]);

function isObject(value) {
    return typeof value === 'object' && value != null;
}
function hasEmbedded(value) {
    return '_embedded' in value;
}
function isLink(value) {
    return isObject(value) && 'href' in value && typeof value.href === 'string';
}
function isLinks(value) {
    return isObject(value) && 'city:item' in value && isLink(value['city:item']);
}
function isSearchItem(value) {
    return (
        isObject(value) &&
        'matching_full_name' in value &&
        '_links' in value &&
        typeof value.matching_full_name === 'string' &&
        isLinks(value._links)
    );
}
function isSearchItemsArray(value) {
    return Array.isArray(value) && value.every(isSearchItem);
}
function isSearchResult(value) {
    return isObject(value) && 'city:search-results' && isSearchItemsArray(value['city:search-results']);
}
function isValidSearchResult(value) {
    return isObject(value) && hasEmbedded(value) && isSearchResult(value._embedded);
}
function isCategory(value) {
    return (
        isObject(value) &&
        'color' in value &&
        'name' in value &&
        'score_out_of_10' in value &&
        typeof value.color === 'string' &&
        typeof value.name === 'string' &&
        typeof value.score_out_of_10 === 'number'
    );
}
function isArrayCategories(value) {
    return Array.isArray(value) && value.every(isCategory);
}
function isUaScores(value) {
    return (
        isObject(value) &&
        'categories' in value &&
        'teleport_city_score' &&
        typeof value.teleport_city_score === 'number' &&
        isArrayCategories(value.categories)
    );
}
function isCityUrbanArea(value) {
    return (
        isObject(value) &&
        hasEmbedded(value) &&
        'full_name' in value &&
        'ua:scores' in value._embedded &&
        typeof value.full_name === 'string' &&
        isUaScores(value._embedded['ua:scores'])
    );
}
function isValidGetScoresResult(value) {
    return (
        isObject(value) &&
        hasEmbedded(value) &&
        'city:urban_area' in value._embedded &&
        isCityUrbanArea(value._embedded['city:urban_area'])
    );
}

async function searchCity(query, signal) {
    const url = new URL(`${MAIN_PATH}/cities`, BASE_URL);
    SEARCH_PARAMS.set('search', query);
    url.search = SEARCH_PARAMS.toString();

    const [data, error] = await getData(url.toString(), signal);

    if (error) {
        return [null, error];
    }

    if (!isValidSearchResult(data)) {
        return [null, new BaseError(ERROR_CODE.InvalidResponse, 'Invalid response.')];
    }

    if (data.count === 0) {
        return [null, null];
    }

    const suggestions = data._embedded['city:search-results'].reduce((acc, item) => {
        acc.push({
            id: item._links['city:item'].href.match(/\d+/)[0],
            link: item._links['city:item'].href,
            suggestion: item.matching_full_name,
        });
        return acc;
    }, []);

    return [suggestions, null];
}

async function getScores(urlString, signal) {
    const url = new URL(urlString);
    SEARCH_PARAMS.set('embed', 'city:urban_area/ua:scores');
    url.search = SEARCH_PARAMS.toString();

    const [data, error] = await getData(url.toString(), signal);

    if (error) {
        return [null, error];
    }

    if (!isValidGetScoresResult(data)) {
        return [null, new BaseError(ERROR_CODE.NotFound, 'There are no statistics for this city.')];
    }

    return [
        {
            name: data._embedded['city:urban_area'].full_name,
            categories: data._embedded['city:urban_area']._embedded['ua:scores'].categories,
            totalScore: data._embedded['city:urban_area']._embedded['ua:scores'].teleport_city_score,
        },
        null,
    ];
}

export { searchCity, getScores };
