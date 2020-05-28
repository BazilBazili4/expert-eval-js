const generateFeatureTableHead = (table) => {
    let thead = table.createTHead();
    let row = thead.insertRow();
    let headers = [
        'id',
        'Название',
        'Вес',
    ];
    for (let key of headers) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

const generateFeatureTable = (features) => {
    let table = document.createElement('table');
    table.setAttribute("class", "table");
    for (let element of features) {
        let row = table.insertRow();
        let count = 0;

        for (key in element) {
            if (count == 3) {
                break;
            }
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
            count++;
        }
      }
      generateFeatureTableHead(table);
    return table;
}
