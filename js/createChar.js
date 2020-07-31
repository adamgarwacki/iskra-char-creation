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


/* TWORZENIE EKWIPUNKU */
const addNewItem = () => {

    /* TWORZENIE OBIEKTU */

    let allItemValues = {};

    if (!document.getElementById('item-name').value) {
        document.getElementById('item-name').style = 'background-color: #ff6f6f';
        return false;
    } else {
        document.getElementById('item-name').removeAttribute('style');
    }

    let allItemFields = document.getElementsByClassName('item-field');
    for (let itemElem of allItemFields) {
        allItemValues[itemElem.name] = itemElem.value;
    }
    
    let itemKey = Date.now();
    characterEquipment[itemKey] = allItemValues;
    console.log(characterEquipment);

    /* WYŚWIETLANIE OBIEKTU */
    let itemEntry = document.createElement('div');
    itemEntry.id = itemKey;

    let itemInfo = document.createElement('p');
    itemInfo.innerHTML = `
        ${allItemValues['item-name']}</br>
        Typ: ${allItemValues['item-type']} | 
        Wymagania: ${allItemValues['item-requirements-value']} ${allItemValues['item-requirements-attribute']} | 
        Obrona / Atak / Obrażenia: ${allItemValues['item-defense']} / ${allItemValues['item-attack-modifier']} ${allItemValues['item-attack-attribute']} / ${allItemValues['item-damage']} | 
        Trwałość: ${allItemValues['item-durability']} | 
        Cena: ${allItemValues['item-price']}</br>
        Opis: ${allItemValues['item-description']}`;


    let itemQuantity = document.createElement('input');
    itemQuantity.setAttribute('type', 'number');
    itemQuantity.setAttribute('onchange', `changeItemQuantity(${itemKey})`);
    itemQuantity.value = allItemValues['item-quantity'];

    let removeItemEntry = document.createElement('button');
    removeItemEntry.innerText = 'Usuń przedmiot';
    removeItemEntry.setAttribute('type', 'button');
    removeItemEntry.setAttribute('onclick', `removeItemEntry('${itemKey}')`)

    itemEntry.appendChild(itemInfo);
    itemEntry.appendChild(itemQuantity);
    itemEntry.appendChild(removeItemEntry);
    document.getElementById('chosen-items').appendChild(itemEntry);

    
}

const changeItemQuantity = (targetParentId) => {
    characterEquipment[targetParentId]['item-quantity'] = event.target.value;
    console.log(characterEquipment);
}

const removeItemEntry = (idtoRemove) => {
    document.getElementById(idtoRemove).remove();
    delete characterEquipment[idtoRemove];
    console.log(characterEquipment);
}


/* DODAWANIE ZDOLNOŚCI */

const addNewAbility = () => {

    let allAbilityValues = {};

    if (!document.getElementById('ability-name').value) {
        document.getElementById('ability-name').style = 'background-color: #ff6f6f';
        return false;
    } else {
        document.getElementById('ability-name').removeAttribute('style');
    }

    let allAbilityFields = document.getElementsByClassName('ability-field');
    for (let abilityElem of allAbilityFields) {
        allAbilityValues[abilityElem.name] = abilityElem.value;
    }
    
    let abilityKey = Date.now();
    characterAbilities[abilityKey] = allAbilityValues;
    console.log(characterAbilities);

    /* WYŚWIETLANIE OBIEKTU */
    let abilityEntry = document.createElement('div');
    abilityEntry.id = abilityKey;

    let abilityInfo = document.createElement('p');
    abilityInfo.innerHTML = `
        ${allAbilityValues['ability-name']} | 
        Koszt: ${allAbilityValues['ability-cost']}</br>
        Opis: ${allAbilityValues['ability-description']}`;

    let removeAbilityEntry = document.createElement('button');
    removeAbilityEntry.innerText = 'Usuń zdolność';
    removeAbilityEntry.setAttribute('type', 'button');
    removeAbilityEntry.setAttribute('onclick', `removeAbilityEntry('${abilityKey}')`)

    abilityEntry.appendChild(abilityInfo);
    abilityEntry.appendChild(removeAbilityEntry);
    document.getElementById('chosen-abilities').appendChild(abilityEntry);
}

const removeAbilityEntry = (idtoRemove) => {
    document.getElementById(idtoRemove).remove();
    delete characterAbilities[idtoRemove];
    console.log(characterAbilities);
}


/* ZAPISYWANIE POSTACI */
const saveCharacter = (event) => {
    event.preventDefault();

    // PRZEROBIĆ NA PĘTLĘ!!!

    let charName = document.getElementById('name').value;
    let charConcept = document.getElementById('concept').value;
    // let charAttrStr = document.getElementById('attribute-strength').value;
    // let charAttrDex = document.getElementById('attribute-dexterity').value;
    // let charAttrCon = document.getElementById('attribute-constitution').value;
    // let charAttrInt = document.getElementById('attribute-intellect').value;
    // let charAttrCha = document.getElementById('attribute-charisma').value;

    let allAttrValues = [];
    for(let element of document.getElementsByClassName('character-attribute')) {
        allAttrValues.push(element.value);
    }

    let charObj = {
        charName:charName,
        charConcept:charConcept,
        // charAttributes: {
        //     charAttrStr: charAttrStr,
        //     charAttrDex: charAttrDex,
        //     charAttrCon: charAttrCon,
        //     charAttrInt: charAttrInt,
        //     charAttrCha: charAttrCha
        // },
        charAttributes:allAttrValues,
        charEquipment:characterEquipment,
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