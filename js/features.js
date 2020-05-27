const createFeature = (featureId, featureName, featureWeight, featureType, featureClass, levelCount, levelNames) => {
    let feature = {
        id: featureId,
        name: featureName,
        weight: Number(featureWeight),
        type: featureType,
        class: featureClass,
        featureRank: 0,
        levelUnit: 0,
        levelValue: 0,
        levelsCount: Number(levelCount),
        levels: setLevels(levelNames, featureType),
        value: 0,
        // setFeatureRank(normalizingCoef) {
        //     this.featureRank = normalizingCoef * this.weight;
        //     return this;
        // },
        // setLevelUnit() {
        //     this.levelUnit = this.featureRank / (this.levelsCount - 1);
        //     return this;
        // },
    };
    return feature;
}

const getFeaturesNames = (features) => {
    let names = [];
    for (let feature of features) {

        names.push(
            {
                id: feature.id,
                name: feature.name
            }
        );
    }
    return names;
}

const setFeatureLevel = (feature, levelName) => {
    feature.levels.push(levelName);
    return feature;
}

const setLevels = (levelsNames, featureType) => {
    let levels = [];
    let levelPosValues = [9, 7, 5, 3, 1];
    let levelNegValues = [1, 3, 5, 7, 9];
    let values = [];
    if (featureType) {
        values = levelPosValues;
    } else {
        values = levelNegValues;
    }
    levelsNames.forEach(
        (levelName, index) => {
            let level = {
                name: levelName,
                value: values[index]
            };
            levels.push(level);
        }
    );

    return levels;
}

const isPositive = (feature) => {
    return feature.type === "true";
}

const isQuantitative = (feature) => {
    if (feature.class == '2') {
        return true;
    } else {
        return false;
    }
}

