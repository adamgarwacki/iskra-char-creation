'use strict';

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
    for (let itemProp of allItemFields) {
        allItemValues[itemProp.name] = itemProp.value;
    }
    
    let itemKey = Date.now();
    characterEquipment[itemKey] = allItemValues;

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

    console.log(characterEquipment);
}

const changeItemQuantity = (targetParentId) => {
    characterEquipment[targetParentId]['item-quantity'] = event.target.value;
}

const removeItemEntry = (idtoRemove) => {
    document.getElementById(idtoRemove).remove();
    delete characterEquipment[idtoRemove];
}




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
}