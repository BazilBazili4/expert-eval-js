setCurrentState('create');
console.log(getCurrentState('create'));

setCriteria(
    [
        {
            name: 'name'
        },
        {
            name: 'name2'
        }
    ]
);

console.log(getCriteria());