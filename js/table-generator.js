let mountains = [
    { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
    { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
    { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Monte Amiata", height: 1738, place: "Siena" }
];
  
const generateTableHead = (table, data, expertId) => {
    let thead = table.createTHead();
    let row = thead.insertRow();
    let firstTh = document.createElement("th");
    let stub = document.createTextNode('Альтернатива');
    firstTh.appendChild(stub);
    row.appendChild(firstTh);

    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key.name);
        th.appendChild(text);
        th.appendChild(createWeightInput(key, expertId));
        row.appendChild(th);
    }
}

const generateFeaturesTable = (headers, features, alternatives, expertId) => {
    let table = document.createElement('table');
    table.setAttribute("class", "table");

    for (let alternative of alternatives) {
        let row = table.insertRow();
        let firstCell = row.insertCell();
        let name = document.createTextNode(alternative);
        firstCell.appendChild(name);
        for (let feature of features) {
            let cell = row.insertCell();
            let cellContent = generateInputForFeature(feature, expertId, alternative);
            cell.appendChild(cellContent);
        }
    }
    generateTableHead(table, headers, expertId);
    return table;
}

const generateInputForFeature = (feature, expertId, alternative) => {
    if (isQuantitative(feature)) {
        return createInput(feature, expertId, alternative);
    } else {
        return createFeatureValueSelect(feature, expertId, alternative);
    }
}


const createFeatureValueSelect = (feature, expertId, alternative) => {
    let levelSelect = document.createElement("select");
    levelSelect.setAttribute("id", generateInputId(feature.id, expertId));
    levelSelect.setAttribute("class", generateInputClass(expertId, alternative));
    for (let level of feature.levels) {
        let option = document.createElement("option");
        option.value = level.value;
        option.text = level.name;
        levelSelect.appendChild(option);
    }
    return levelSelect;
}

const createInput = (feature, expertId, alternative) => {
    var input = document.createElement("input");
    input.setAttribute("id", generateInputId(feature.id, expertId));
    input.setAttribute("class", generateInputClass(expertId, alternative));
    return input;
}

const createWeightInput = (feature, expertId) => {
    var input = document.createElement("input");
    input.setAttribute("id", generateWeightInputId(feature.id, expertId));
    input.setAttribute("class", generateWeightInputClass(expertId));
    input.setAttribute("placeholder", "Вес");
    return input;
}

const generateInputId = (id, expertId) => {
    return id + "featureValue_" + expertId;
}
const generateWeightInputId = (id, expertId) => {
    return id + "featureWeight_" + expertId;
}

const generateInputClass = (expertId, alternative) => {
    return "form-control " + alternative + "_featureValue_" + expertId;
}
const generateWeightInputClass = (id = '', expertId) => {
    return "form-control " + id + "_featureWeight_" + expertId;
}


const getAlternativeValuesByExpert = (alternative, expertId) => {
    let alternativeClass = generateInputClass(expertId,alternative);
    let values = document.getElementsByClassName(alternativeClass);
    let levels = [...values];

    levels = levels.map(
        level => {
            return Number(level.value);
        }
    );

    return levels;
}

const getAlternativeValues = (alternative, expertCount) => {
    let result = [];
    for (let index = 1; index <= expertCount; index++) {
        result.push(getAlternativeValuesByExpert(alternative, index));
    }
    return result;
}

const getWeightValuesByExpert = (expertId) => {
    let inputClass = generateWeightInputClass(expertId);
    let values = document.getElementsByClassName(inputClass);
    let levels = [...values];

    levels = levels.map(
        level => {
            return Number(level.value);
        }
    );

    return levels;
}
const getWeightValues = (expertCount) => {
    let result = [];
    for (let index = 1; index <= expertCount; index++) {
        result.push(getWeightValuesByExpert(index));
    }
    return result;
}

