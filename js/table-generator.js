let mountains = [
    { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
    { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
    { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Monte Amiata", height: 1738, place: "Siena" }
];
  
const generateTableHead = (table, data) => {
    let thead = table.createTHead();
    let row = thead.insertRow();
    let firstTh = document.createElement("th");
    let stub = document.createTextNode('Альтернатива');
    firstTh.appendChild(stub);
    row.appendChild(firstTh);

    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

const generateFeaturesTable = (headers, features, alternatives) => {
    let table = document.createElement('table');
    table.setAttribute("class", "table");

    for (let alternative of alternatives) {
        let row = table.insertRow();
        let firstCell = row.insertCell();
        let name = document.createTextNode(alternative);
        firstCell.appendChild(name);
        for (let feature of features) {
            let cell = row.insertCell();
            let cellContent = generateInputForFeature(feature);
            cell.appendChild(cellContent);
        }
    }
    generateTableHead(table, headers);
    return table;
}

const generateInputForFeature = (feature) => {
    if (isQuantitative(feature)) {
        return createInput(feature);
    } else {
        return createFeatureValueSelect(feature);
    }
}


const createFeatureValueSelect = (feature) => {
    let levelSelect = document.createElement("select");
    levelSelect.setAttribute("id", feature.id + "featureValue");
    levelSelect.setAttribute("class", "form-control");
    for (let level of feature.levels) {
        let option = document.createElement("option");
        option.value = level.value;
        option.text = level.name;
        levelSelect.appendChild(option);
    }
    return levelSelect;
}

const createInput = (feature) => {
    var input = document.createElement("input");
    input.setAttribute("id", feature.id + "featureValue");
    input.setAttribute("class", "form-control");
    return input;
}