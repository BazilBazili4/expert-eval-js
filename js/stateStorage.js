const criteriaKey = 'criteria';
const currentStateKey = 'currentState';

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
    return JSON.parse(localStorage.getItem(criteriaKey));
}