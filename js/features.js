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
        levels: setLevels(levelNames),
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
        names.push(feature.name);
    }
    return names;
}

const setFeatureLevel = (feature, levelName) => {
    feature.levels.push(levelName);
    return feature;
}

const setLevels = (levelsNames) => {
    let levels = [];
    let baseValue = -1;
    levelsNames.forEach(
        levelName => {
            let level = {
                name: levelName,
                value: baseValue += 2
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


