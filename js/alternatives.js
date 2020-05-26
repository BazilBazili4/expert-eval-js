const addInputsForAlternatives = () => {
    let count = getAlternativesCount();
    let container = document.getElementById('alternatives-inputs');
    container.innerHTML = '';
    let feature = document.createElement("div");

    for (i = 0; i < count; i++) {
        let levelInput = document.createElement("input");
        levelInput.setAttribute("id", 'alternativeName' + i);
        levelInput.setAttribute("class", "form-control alternativeInput");
        levelInput.setAttribute("style", "margin-top: 10px;");
        levelInput.required = true;
        feature.appendChild(levelInput);   
    }
    container.appendChild(feature);     
}
const getAlternativesCount = () => {
    return Number(document.getElementById('alternatives-count').value);
}

const getAlternativesNames = () => {
    let inputs = document.getElementsByClassName('alternativeInput');
    let names = [...inputs];

    names = names.map(
        name => {
            return name.value;
        }
    );

    return names;
}