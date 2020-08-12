'use strict';

/* INIT */
let currentAttrValues = [-2, -2, -2, -2, -2];
let characterEquipment = {};
let characterAbilities = {};


/* WARTOŚCI ATRYBUTÓW */
const changeAttrValue = (targetAttrId) => {
    let currentAttrValue = parseInt(document.getElementById(targetAttrId).value);
    switch (targetAttrId) {
        case 'attribute-strength':
            currentAttrValues[0] = currentAttrValue; break;
        case 'attribute-dexterity':
            currentAttrValues[1] = currentAttrValue; break;
        case 'attribute-constitution':
            currentAttrValues[2] = currentAttrValue; break;
        case 'attribute-intellect':
            currentAttrValues[3] = currentAttrValue; break;
        case 'attribute-charisma':
            currentAttrValues[4] = currentAttrValue; break;
        default: break;
    }
    let totalValue = 0;
    currentAttrValues.forEach(e => {
        totalValue += e;
    });

    document.getElementById('available-attribute-points').value = 7 - (10 + totalValue);

    if (7 - (10 + totalValue) < 0) {
        document.getElementById('available-points-container').classList.add('wrong-number');
    } else {
        document.getElementById('available-points-container').classList.remove('wrong-number');
    }
}

/* ZAPISYWANIE POSTACI */
const saveCharacter = (event) => {
    event.preventDefault();

    // PRZEROBIĆ NA PĘTLĘ!!!

    let charName = document.getElementById('name').value;
    let charConcept = document.getElementById('concept').value;

    let allAttrValues = [];
    for(let element of document.getElementsByClassName('character-attribute')) {
        allAttrValues.push(element.value);
    }

    let charObj = {
        charName:charName,
        charConcept:charConcept,
        charHealth:5,
        focusPoints:[0,0],
        charAttributes:allAttrValues,
        charEquipment:characterEquipment,
        charEquipmentWorn:{
            clothing:0,
            weapon:0,
        },
        charAbilities:characterAbilities
    }

    // charKey = Date.now();
    let charKey = Date.now();
    let charKeyList = JSON.parse(localStorage.getItem('charKeyList'));
    charKeyList.push(charKey);
    localStorage.setItem('charKeyList', JSON.stringify(charKeyList));

    localStorage.setItem(charKey, JSON.stringify(charObj));

    location.href = "./characters-list.html";
}