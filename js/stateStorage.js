const criteriaKey = 'criteria';
const currentStateKey = 'currentState';
const alternativesKey = 'alternatives';
const setCurrentState = (currentState) => {
    localStorage.setItem(currentStateKey, currentState);
}

const getCurrentState = () => {
    return localStorage.getItem(currentStateKey);
}

const setCriteria = (criteria) => {
    localStorage.setItem(criteriaKey, JSON.stringify(criteria));
}

const getCriteria = () => {
    let items = localStorage.getItem(criteriaKey);
    if (items) {
        return JSON.parse(localStorage.getItem(criteriaKey));
    } else {
        return [];
    }
}

const updateCriteria = (criterion) => {
    let criteria = getCriteria();
    
    criteria.push(criterion);
    setCriteria(criteria);
}

const dropCriteria = () => {
    localStorage.removeItem(criteriaKey);
}

const setAlternatives = (alternatives) => {
    localStorage.setItem(alternativesKey, JSON.stringify(alternatives));
}

const getAlternatives = () => {
    let items = localStorage.getItem(alternativesKey);
    if (items) {
        return JSON.parse(localStorage.getItem(alternativesKey));
    } else {
        return [];
    }
}

// const updateAlternatives = (alternatives) => {
//     let criteria = getCriteria();
    
//     criteria.push(criterion);
//     setCriteria(criteria);
// }

const dropAlternatives = () => {
    localStorage.removeItem(alternativesKey);
}
