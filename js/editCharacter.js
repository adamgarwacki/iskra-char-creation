'use strict';

let editedCharacterKey = JSON.parse(sessionStorage.getItem('displayedChar'));
let editedCharacter = JSON.parse(localStorage[JSON.parse(sessionStorage.getItem('displayedChar'))]);
// console.log(editedCharacterKey);
let characterEquipment = editedCharacter.charEquipment;
let characterAbilities = editedCharacter.charAbilities;

/* WCZYTYWANIE POSTACI */

const getEditedCharacter = () => {
    document.getElementById('name').value = editedCharacter.charName;
    document.getElementById('concept').value = editedCharacter.charConcept;

    let characterAttributes = editedCharacter.charAttributes;
    let i = 0;
    for (let attributeField of document.getElementsByClassName('character-attribute')) {
        attributeField.value = characterAttributes[i];
        i++;
    }

    let characterEquipment = Object.entries(editedCharacter.charEquipment);

    for (let singleItem of characterEquipment) {
        let singleItemKey = singleItem[0];
        let singleItemInfo = singleItem[1];

        let itemEntry = document.createElement('div');
        itemEntry.id = singleItemKey;

        let itemInfo = document.createElement('p');
        itemInfo.innerHTML = `
            ${singleItemInfo['item-name']}</br>
            Typ: ${singleItemInfo['item-type']} |
            Wymagania: ${singleItemInfo['item-requirements-value']} ${singleItemInfo['item-requirements-attribute']} |
            Obrona / Atak / Obrażenia: ${singleItemInfo['item-defense']} / ${singleItemInfo['item-attack-modifier']} ${singleItemInfo['item-attack-attribute']} / ${singleItemInfo['item-damage']} |
            Trwałość: ${singleItemInfo['item-durability']} |
            Cena: ${singleItemInfo['item-price']}</br>
            Opis: ${singleItemInfo['item-description']}`;

        let itemQuantity = document.createElement('input');
        itemQuantity.setAttribute('type', 'number');
        itemQuantity.setAttribute('onchange', `changeItemQuantity(${singleItemKey})`);
        itemQuantity.value = singleItemInfo['item-quantity'];

        let removeItemEntry = document.createElement('button');
        removeItemEntry.innerText = 'Usuń przedmiot';
        removeItemEntry.setAttribute('type', 'button');
        removeItemEntry.setAttribute('onclick', `removeItemEntry('${singleItemKey}')`)

        itemEntry.appendChild(itemInfo);
        itemEntry.appendChild(itemQuantity);
        itemEntry.appendChild(removeItemEntry);
        document.getElementById('chosen-items').appendChild(itemEntry);
    }

    let characterAbilities = Object.entries(editedCharacter.charAbilities);

    for (let singleAbility of characterAbilities) {
        let singleAbilityKey = singleAbility[0];
        let singleAbilityInfo = singleAbility[1];

        let abilityEntry = document.createElement('div');
        abilityEntry.id = singleAbilityKey;

        let abilityInfo = document.createElement('p');
        abilityInfo.innerHTML = `
            ${singleAbilityInfo['ability-name']} |
            Koszt: ${singleAbilityInfo['ability-cost']}</br>
            Opis: ${singleAbilityInfo['ability-description']}`;

        let removeAbilityEntry = document.createElement('button');
        removeAbilityEntry.innerText = 'Usuń zdolność';
        removeAbilityEntry.setAttribute('type', 'button');
        removeAbilityEntry.setAttribute('onclick', `removeAbilityEntry('${singleAbilityKey}')`)

        abilityEntry.appendChild(abilityInfo);
        abilityEntry.appendChild(removeAbilityEntry);
        document.getElementById('chosen-abilities').appendChild(abilityEntry);
    }
}

const saveChanges = (event) => {
    event.preventDefault();

    let charName = document.getElementById('name').value;
    let charConcept = document.getElementById('concept').value;

    let allAttrValues = [];
    for(let element of document.getElementsByClassName('character-attribute')) {
        allAttrValues.push(element.value);
    }

    console.log(characterEquipment);
    console.log(editedCharacter.charEquipment);

    let charObj = {
        charName:charName,
        charConcept:charConcept,
        charHealth:editedCharacter.charHealth,
        focusPoints:0,
        charAttributes:allAttrValues,
        charEquipment:editedCharacter.charEquipment,
        charAbilities:editedCharacter.charAbilities
    }

    localStorage.setItem(editedCharacterKey, JSON.stringify(charObj));

    location.href = "./characters-list.html";
}

getEditedCharacter();
// console.log(characterEquipment);