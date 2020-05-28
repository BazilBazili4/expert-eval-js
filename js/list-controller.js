const addFeature = () => {
    let featureData = getFeatureData();
    let feature = createFeature(
        featureData.id,
        featureData.name,
        featureData.weight,
        featureData.type,
        featureData.class,
        featureData.levelsCount,
        featureData.levels
    );
    updateCriteria(feature);
    let listContainer = document.getElementById('feature-list');
    listContainer.innerHTML = '';
    listContainer.appendChild(generateFeatureTable(getCriteria()));


}

const resetList = () => {
    dropCriteria();
    let listContainer = document.getElementById('feature-list');
    listContainer.innerHTML = '';
}

const addAlternatives = () => {
    let alternaives = getAlternativesNames()
    setAlternatives(alternaives);
    console.log(getAlternatives());
}

const resetAlternatives = () => {
    dropAlternatives();
}

const createList = () => {
    let expertsCount = document.getElementById('experts-count').value;
    let listContainer = document.getElementById('list-using');
    let features = getCriteria();
    let alternaives = getAlternatives();
    let featureNames = getFeaturesNames(features);

    console.log(features);
    for (let index = 1; index <= expertsCount; index++) {
        let header = document.createElement("h3");
        header.innerHTML = "Эксперт №" + index;
        header.setAttribute("style", "margin-top: 10px;");
        listContainer.appendChild(header);
        listContainer.appendChild(generateFeaturesTable(featureNames, features, alternaives, index));
    }

}

const calculateResult = () => {
    let alternatives = getAlternatives();
    let expertsCount = document.getElementById('experts-count').value;
    let weights = getWeightValues(expertsCount);
    let alternaivesValues = getAlternativesValues(alternatives, expertsCount);
    let meanValues = meanValuesMethod(alternaivesValues, weights, expertsCount);
    let meanAvgValues = meanAverageValuesMethod(alternaivesValues, weights, expertsCount);
    let topsis = topsisMethod(alternaivesValues, weights, expertsCount);
    console.log(meanValues);
    console.log(meanAvgValues);
    console.log(topsis);
    let listContainer = document.getElementById('list-result');
    listContainer.innerHTML = '';

    let header = document.createElement("h3");
    header.innerHTML = "Усреднение индивидуальных оценок";
    header.setAttribute("style", "margin-top: 10px;");
    listContainer.appendChild(header);
    listContainer.appendChild(generateResultFeaturesTable(meanValues));
    let header1 = document.createElement("h3");
    header1.innerHTML = "Аддитивная свёртка индивидуальных ценностей";
    header1.setAttribute("style", "margin-top: 10px;");
    listContainer.appendChild(header1);
    listContainer.appendChild(generateResultFeaturesTable(meanAvgValues));
    let header2 = document.createElement("h3");
    header2.innerHTML = "Метод ТОПСИС";
    header2.setAttribute("style", "margin-top: 10px;");
    listContainer.appendChild(header2);
    listContainer.appendChild(generateTopsisTable(topsis));
}