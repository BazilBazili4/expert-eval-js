const generateResultTableHead = (table) => {
    let headers = [
        'Вариант',
        'Результат'
    ];
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of headers) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
}

const generateResultFeaturesTable = (alternatives) => {
    let table = document.createElement('table');
    table.setAttribute("class", "table");
    for (let element of alternatives) {
        let row = table.insertRow();
        for (key in element) {
          let cell = row.insertCell();
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
        }
      }
      generateResultTableHead(table);
    return table;
}

const generateTopsisTableHead = (table) => {
    let thead = table.createTHead();
    let row = thead.insertRow();
    let headers = [
        'Вариант',
        'Расстояние до наилучшего опорного варианта',
        'Расстояние до наихудшего опорного варианта',
        'Относительная удалённость от наихудшего опорного варианта'
    ];
    for (let key of headers) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
}

const generateTopsisTable = (alternatives) => {
    let table = document.createElement('table');
    table.setAttribute("class", "table");
    for (let element of alternatives) {
        let row = table.insertRow();
        for (key in element) {
          let cell = row.insertCell();
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
        }
      }
      generateTopsisTableHead(table);
    return table;
}
