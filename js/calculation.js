const calculateAlternativeWeightedValue = (valuesByExpert, weightsByExpert) => {
    let result = 0;
    for (let index = 0; index < valuesByExpert.length; index++) {
        result += valuesByExpert[index] * weightsByExpert[index];
    }
    return result;
}

const calculateAlternativeTotal = (expertCount, values, weights, means = []) => {
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
    let means = getAverageValuesByFeatureExpert(alternatives, expertCount);
    for (let alternative of alternatives) {
        result.push(
            {
                name: alternative.name,
                total: calculationMethod(expertCount, alternative.values, weights, means)
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
    ).sort(
        (a, b) => {
            return b.total - a.total;
        }
    );
}

const getValuesByExpertId = (expertId, values) => {
    return values[expertId - 1];
}
const getWeightsByExpertId = (expertId, weights) => {
    return weights[expertId - 1];
}

const calculateAlternativeAverageTotal = (expertCount, values, weights, means) => {
    let total = 0;
    for (let index = 1; index <= expertCount; index++) {
        let valuesByExpert = getValuesByExpertId(index,values);
        let weightsByExpert = getWeightsByExpertId(index, weights);
        total += calculateAlternativeAverageValue(valuesByExpert, weightsByExpert, means[index -1]);
    }
    return total;
}

const calculateAlternativeAverageValue = (valuesByExpert, weightsByExpert, averageValues) => {
    let result = 0;
    for (let index = 0; index < valuesByExpert.length; index++) {
        result += (valuesByExpert[index] / averageValues[index]) * weightsByExpert[index];
    }
    return result;
}

const calculateArrayAverage = (arr) => {
    return arr.reduce((a, b) => (a + b)) / arr.length;
}

const getArraySquareSum = (arr) => {
    let sum = 0;
    for (let index = 0; index < arr.length; index++) {
        sum += Math.pow(arr[index], 2);
    }
    return Math.sqrt(sum);
}

const getValuesByFeature = (alternatives, expertNumber = 0, featureNumber = 0) => {
    let result = [];
    for (let index = 0; index < alternatives[0].values[expertNumber].length; index++) {
        let altArray = [];

        for (let alternative of alternatives) {
            altArray.push(alternative.values[expertNumber][index]);
        }
        result.push(
            altArray
        ); 
    }
    
    return result; 
}

const getAverageValuesByFeature = (alternatives, expertNumber = 0, featureNumber = 0) => {
    let features = getValuesByFeature(alternatives, expertNumber);
    return features.map(
        feature => {
            return getArraySquareSum(feature);
        }
    ); 
}

const getAverageValuesByFeatureExpert = (alternatives, expertNumber) => {
    let result = [];
    for (let index = 1; index <= expertNumber; index++) {
        result.push(getAverageValuesByFeature(alternatives, index-1));
    }
    return result;
}

const meanAverageValuesMethod = (alternatives, weights, expertCount) => {
    return calculateAlternativesTotals(
        alternatives,
        weights,
        expertCount,
        calculateAlternativeAverageTotal
    ).sort(
        (a, b) => {
            return b.total - a.total;
        }
    );
}

const calculateAlternativeAverage = (expertCount, values, weights, means) => {
    let total = [];
    let expertMeans = getAverageValuesByExpertMeans(means, expertCount);
    for (let index = 1; index <= expertCount; index++) {
        let valuesByExpert = getValuesByExpertId(index,values);
        let weightsByExpert = getWeightsByExpertId(index, weights);
        total.push(calculateAlternativeAverageValueArray(valuesByExpert, weightsByExpert,expertMeans));
    }
    result = total[0];
    for (let row = 1; row < total.length; row++) {
        result = vectorAvg(result, total[row]);
    }
    return result;
}



const calculateAlternativeAverageValueArray = (valuesByExpert, weightsByExpert, averageValues) => {
    let result = [];
    for (let index = 0; index < valuesByExpert.length; index++) {
        result.push((valuesByExpert[index] / averageValues[index]) * weightsByExpert[index]);
    }
    return result;
}

const topsisValues = (alternatives, weights, expertCount) => {
    return calculateAlternativesTotals(
        alternatives,
        weights,
        expertCount,
        calculateAlternativeAverage
    )
}

const getTopsisValuesByFeature = (topsisValues) => {
    let result = [];
    for (let index = 0; index < topsisValues[0].total.length; index++) {
        let altArray = [];

        for (let topsisValue of topsisValues) {
            altArray.push(topsisValue.total[index]);
        }
        result.push(
            altArray
        ); 
    }
    
    return result; 
}

const topsisMethod = (alternatives, weights, expertCount) => {
    let topsisVal = topsisValues(alternatives, weights, expertCount);
    let bestAlt = [];
    let worstAlt = [];
    topsisValuesFeatures = getTopsisValuesByFeature(topsisVal);
    for (let topsisValuesFeature of topsisValuesFeatures) {
        bestAlt.push(Math.max(...topsisValuesFeature));
        worstAlt.push(Math.min(...topsisValuesFeature));   
    }

    result = topsisVal.map(
        item => {
            (distance(bestAlt, item.total) + distance(worstAlt, item.total));
            return {
                name: item.name,
                distanceToBest: distance(bestAlt, item.total),
                distanceToWorst: distance(worstAlt, item.total),
                relativeDistance: distance(worstAlt, item.total) / (distance(bestAlt, item.total) + distance(worstAlt, item.total))
            };
        }
    );

    return result.sort(
        (a, b) => {
            return b.relativeDistance - a.relativeDistance;
        }
    );
}

const distance = (vector1, vector2) => {
    let result = 0;
    for (let index = 0; index < vector1.length; index++) {
        let diff = vector1[index] - vector2[index];
        result += Math.pow(diff, 2);
    }
    return Math.sqrt(result);
}


const getAverageValuesByExpert = (alternatives, expertNumber) => {
    let result = getAverageValuesByFeature(alternatives, 0);

    for (let index = 2; index <= expertNumber; index++) {
        result = vectorAvg(result, getAverageValuesByFeature(alternatives, index-1));
    }
    return result.map(
        item => {
            return item/expertNumber;
        }
    );
}

const getAverageValuesByExpertMeans = (means, expertNumber) => {
    let result = means[0];

    for (let index = 2; index <= expertNumber; index++) {
        result = vectorAvg(result, means[index - 1]);
    }
    return result.map(
        item => {
            return item/expertNumber;
        }
    );
}

const vectorAvg = (vector1, vector2) => {
    let result = [];
    for (let index = 0; index < vector1.length; index++) {
        result[index] = vector1[index] + vector2[index];
    }
    return result;
}
