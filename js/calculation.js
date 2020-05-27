const calculateAlternativeWeightedValue = (valuesByExpert, weightsByExpert) => {
    let result = 0;
    for (let index = 0; index < valuesByExpert.length; index++) {
        result += valuesByExpert[index] * weightsByExpert[index];
    }
    return result;
}

const calculateAlternativeTotal = (expertCount, values, weights) => {
    let total = 0;
    for (let index = 1; index <= expertCount; index++) {
        let valuesByExpert = getValuesByExpertId(index,values);
        let weightsByExpert = getWeightsByExpertId(index, weights);
        total += calculateAlternativeWeightedValue(valuesByExpert, weightsByExpert);
    }
    return total;
}

const calculateAlternativesTotals = (alternatives, weights, expertCount, calculationMethod) => {
    let result = [];

    for (let alternative of alternatives) {
        console.log(alternative);
        result.push(
            {
                name: alternative.name,
                total: calculationMethod(expertCount, alternative.values, weights)
            }
        );
    }
    return result;
}

const meanValuesMethod = (alternatives, weights, expertCount) => {
    return calculateAlternativesTotals(
        alternatives,
        weights,
        expertCount,
        calculateAlternativeTotal
    )
}

const getValuesByExpertId = (expertId, values) => {
    return values[expertId - 1];
}
const getWeightsByExpertId = (expertId, weights) => {
    return weights[expertId - 1];
}

const getValuesByFeature = (alternatives, featureNumber) => {
    let result = [];

    for (let alternative of alternatives) {
        result.push(
            {
                name: alternative.name,
                total: calculationMethod(expertCount, alternative.values, weights)
            }
        );
    }
}

const calculateAverageValue = () => {}