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