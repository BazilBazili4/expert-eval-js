const addInputsForLevels = () => {
    let count = document.getElementById('levels-count').value;

    let container = document.getElementById('level-inputs');
    container.innerHTML = '';
    let feature = document.createElement("div");

    for (i = 0; i < count; i++) {
        let levelInput = document.createElement("input");
        levelInput.setAttribute("id", "featureName" + i);
        levelInput.setAttribute("class", "form-control levelInput");
        levelInput.setAttribute("style", "margin-top: 10px;");
        levelInput.required = true;
        feature.appendChild(levelInput);   
    }
    container.appendChild(feature);     
}

const showFeatureLevelCount = () => {
    let featureClass = document.getElementById('feature-class').value;
    let levelsCountBlock = document.getElementById('levels-count-block');
    if (featureClass === '1') {
        levelsCountBlock.setAttribute("style", "margin-top: 20px; display: block");
    } else {
        levelsCountBlock.setAttribute("style", "display: none");
    }
}
