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
}

const resetList = () => {
    dropCriteria();
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
    console.log(meanValuesMethod(alternaivesValues, weights, expertsCount));
    console.log(meanAverageValuesMethod(alternaivesValues, weights, expertsCount));
    console.log(topsisMethod(alternaivesValues, weights, expertsCount));





}