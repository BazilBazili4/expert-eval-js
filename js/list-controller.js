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
    console.log(feature);
    updateCriteria(feature);
    console.log(getCriteria());
}

const resetList = () => {
    dropCriteria();
}

