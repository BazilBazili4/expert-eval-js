const addInputsForLevels = () => {
    let count = getLevelsCount();
    let featureName = getFeatureName();
    let featureId = getFeatureId();
    let container = document.getElementById('level-inputs');
    container.innerHTML = '';
    let feature = document.createElement("div");

    for (i = 0; i < count; i++) {
        let levelInput = document.createElement("input");
        levelInput.setAttribute("id", featureId + i);
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

const getFeatureName = () => {
    return document.getElementById('feature-name').value;
}

const getFeatureId = () => {
    return transliteration(document.getElementById('feature-name').value);
}

const getFeatureWeight = () => {
    return Number(document.getElementById('feature-weight').value);
}

const getFeatureType = () => {
    return Boolean(document.getElementById('feature-type').value);
}

const getFeatureClass = () => {
    return document.getElementById('feature-class').value;
}

const getLevelsCount = () => {
    return Number(document.getElementById('levels-count').value);
}

const getFeatureLevels = () => {
    let inputs = document.getElementsByClassName('levelInput');
    let levels = [...inputs];

    levels = levels.map(
        level => {
            return level.value;
        }
    );

    return levels;
}

const getFeatureData = () => {
    let feature = {
        id: getFeatureId(),
        name: getFeatureName(),
        weight: getFeatureWeight(),
        type: getFeatureType(),
        class: getFeatureClass(),
        levelsCount: getLevelsCount(),
        levels: getFeatureLevels()
    };
    return feature;
}

function findValueForFeature(featureNuber) {
    let selectId = featureNuber + "featureValue";
    return Number(document.getElementById(selectId).value);
}

function findLevelInputValueForFeature(featureNuber, levelNumber) {
    let inputId = featureNuber + "featureName" + levelNumber;
    return document.getElementById(inputId).value
}

const getLevelNames = () => {
    document.getElementsByClassName('form-control');
}


const transliteration = (str) => {
    
    var ru = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
        'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 
        'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 
        'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 
        'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
    }, n_str = [];
    
    str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');
    
    for ( var i = 0; i < str.length; ++i ) {
       n_str.push(
              ru[ str[i] ]
           || ru[ str[i].toLowerCase() ] == undefined && str[i]
           || ru[ str[i].toLowerCase() ].replace(/^(.)/, function ( match ) { return match.toUpperCase() })
       );
    }
    
    return n_str.join('');
}