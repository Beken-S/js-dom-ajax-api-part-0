function createScoresCategory({ name, score_out_of_10 }) {
    const scoreCategory = document.createElement('li');
    const categoryLabel = document.createElement('label');
    const categoryMeter = document.createElement('meter');
    const categoryScore = document.createElement('span');

    scoreCategory.classList.add('scores__category');
    categoryLabel.classList.add('scores__label');
    categoryMeter.classList.add('scores__meter');
    categoryScore.classList.add('scores__score');

    categoryLabel.textContent = `${name}:`;
    categoryLabel.setAttribute('for', name);

    categoryScore.textContent = score_out_of_10.toFixed(1);

    categoryMeter.id = name;
    categoryMeter.setAttribute('max', 10);
    categoryMeter.setAttribute('low', 3);
    categoryMeter.setAttribute('high', 5);
    categoryMeter.setAttribute('optimum', 8);
    categoryMeter.setAttribute('value', score_out_of_10);

    scoreCategory.append(categoryLabel, categoryMeter, categoryScore);

    return scoreCategory;
}
function getScoresCategories(categories) {
    const fragment = document.createDocumentFragment();
    fragment.append(...categories.map(createScoresCategory));
    return fragment;
}
function getScoresMarkup({ name, categories, totalScore }) {
    const scores = document.createElement('div');
    const cityName = document.createElement('h2');
    const categoriesScoreList = document.createElement('ul');
    const totalScoreValue = document.createElement('p');

    scores.classList.add('scores');
    cityName.classList.add('h2');
    categoriesScoreList.classList.add('scores__list');
    totalScoreValue.classList.add('scores__total-score');

    cityName.textContent = name;
    categoriesScoreList.append(getScoresCategories(categories));
    totalScoreValue.textContent = `Total score: ${totalScore.toFixed(1)}`;

    scores.append(cityName, categoriesScoreList, totalScoreValue);

    return scores;
}

export { createScoresCategory, getScoresCategories, getScoresMarkup };
