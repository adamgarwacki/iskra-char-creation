'use strict';

let characterKey = sessionStorage.getItem('displayedChar');
let characterInfo = JSON.parse(localStorage.getItem(characterKey));

const loadCharacterInfo = () => {

    document.getElementById('character-name').innerText = characterInfo.charName;
    document.getElementById('character-concept').innerText = characterInfo.charConcept;

    let attributeIterator = 0;
    for (let domElement of document.getElementsByClassName('displayed-attribute')) {
        domElement.innerText = characterInfo.charAttributes[attributeIterator];
        attributeIterator++;
    }

    let focusPointsModifierContainer = document.getElementById('focus-points-modifier-container');
    focusPointsModifierContainer.innerText = characterInfo.focusPoints[0];
    let focusPointsContainer = document.getElementById('focus-points-container');
    focusPointsContainer.value = characterInfo.focusPoints[1];

    let healthContainer = document.getElementById('health-container');
    healthContainer.value = characterInfo.charHealth;

    let characterAbilitiesContainer = document.getElementById('table-abilities');

    Object.values(characterInfo.charAbilities).forEach(ability => {

        let abilityEntry = document.createElement('tr');
        let abilityName = document.createElement('td');
        let abilityCost = document.createElement('td');
        let abilityDescription = document.createElement('td');

        abilityName.innerText = ability['ability-name'];
        abilityCost.innerText = ability['ability-cost'];
        abilityDescription.innerText = ability['ability-description'];

        abilityEntry.appendChild(abilityName);
        abilityEntry.appendChild(abilityCost);
        abilityEntry.appendChild(abilityDescription);

        characterAbilitiesContainer.appendChild(abilityEntry);
    });

    let wornEquipment = characterInfo.charEquipmentWorn;
    if (wornEquipment.clothing == 0) {
        document.getElementById('defense-container').innerText = 0;
    } else {
        document.getElementById('defense-container').innerText = characterInfo.charEquipment[wornEquipment.clothing]['item-defense'];
    }

    if (wornEquipment.weapon == 0) {
        document.getElementById('attack-mod-container').innerText = 0;
        document.getElementById('damage-container').innerText = 1;
    } else {
        document.getElementById('attack-mod-container').innerText = characterInfo.charEquipment[wornEquipment.weapon]['item-attack-modifier'];
        document.getElementById('damage-container').innerText = characterInfo.charEquipment[wornEquipment.weapon]['item-damage'];
    }

    let equipmentContainer = document.getElementById('table-equipment');
    Object.entries(characterInfo.charEquipment).forEach(element => {
        let itemKey = element[0];
        let item = element[1];

        let itemEntry = document.createElement('tr');
        let isWorn = document.createElement('td');
        let itemName = document.createElement('td');
        let itemDefense = document.createElement('td');
        let itemAttack = document.createElement('td');
        let itemDamage = document.createElement('td');
        let itemDurability = document.createElement('input');
        let itemDurabilityTd = document.createElement('td');
        let itemDescription = document.createElement('td');
        let itemQuantity = document.createElement('td');

        /* ZAKŁADANIE */

        isWorn.onclick = () => toggleWornEquipment(itemKey);
        isWorn.classList.add('clickable');

        let wornKeys = Object.values(wornEquipment);
        if (item['item-type'] === 'Ubranie' || item['item-type'] === 'Broń') {
            if (wornKeys.includes(itemKey)) {
                isWorn.innerText = 'X';
            }
        } else {
            isWorn.innerText = '---';
        }

        itemName.innerText = item['item-name'];
        itemDefense.innerText = item['item-defense'];
        if (item['item-attack-attribute'] != 'Brak') {
            itemAttack.innerText = `${item['item-attack-attribute']} ${item['item-attack-modifier']}`;
        } else {
            itemAttack.innerText = `---`;
        }

        if (item['item-damage'] == 0) {
            itemDamage.innerText = '---';
        } else {
            itemDamage.innerText = item['item-damage'];
        }

        itemDurability.type = 'number';
        itemDurability.value = item['item-durability'];
        itemDurability.id = `item-dur-${itemKey}`;
        itemDurability.onchange = () => {changeDurability(itemKey)}
        itemDurability.setAttribute('min', 0);
        itemDurability.setAttribute('max', item['item-durability']);
        itemDurabilityTd.appendChild(itemDurability);

        
        
        itemDescription.innerText = item['item-description'];
        itemQuantity.innerText = item['item-quantity'];

        itemEntry.appendChild(isWorn);
        itemEntry.appendChild(itemName);
        itemEntry.appendChild(itemDefense);
        itemEntry.appendChild(itemAttack);
        itemEntry.appendChild(itemDamage);
        itemEntry.appendChild(itemDurabilityTd);
        itemEntry.appendChild(itemDescription);
        itemEntry.appendChild(itemQuantity);
        itemEntry.id = `item-entry-${itemKey}`;

        equipmentContainer.appendChild(itemEntry);
    });

    document.getElementById('character-notes').value = characterInfo.charNotes;
}


const toggleWornEquipment = (key) => {
    let wornEquipment = characterInfo.charEquipmentWorn;

    let itemType = characterInfo.charEquipment[key]['item-type'];

    switch (itemType) {
        case 'Ubranie':
            if (wornEquipment.clothing == key) {
                wornEquipment.clothing = 0;
                document.getElementById('defense-container').innerText = 0;
                document.getElementById(`item-entry-${key}`).firstChild.innerText = '';
            } else if (wornEquipment.clothing == 0) {
                wornEquipment.clothing = key;
                document.getElementById('defense-container').innerText = characterInfo.charEquipment[key]['item-defense'];
                document.getElementById(`item-entry-${key}`).firstChild.innerText = 'X';
                document.getElementById('defense-container').innerText = characterInfo.charEquipment[key]['item-defense'];
            } else {
                // console.log(wornEquipment.clothing);
                document.getElementById(`item-entry-${wornEquipment.clothing}`).firstChild.innerText = '';
                wornEquipment.clothing = key;
                document.getElementById('defense-container').innerText = characterInfo.charEquipment[key]['item-defense'];
                document.getElementById(`item-entry-${key}`).firstChild.innerText = 'X';
            }
            break;

        case 'Broń':
            if (wornEquipment.weapon == key) {
                wornEquipment.weapon = 0;
                document.getElementById('attack-mod-container').innerText = 0;
                document.getElementById('damage-container').innerText = 1;
                document.getElementById(`item-entry-${key}`).firstChild.innerText = '';
            } else if (wornEquipment.weapon == 0) {
                wornEquipment.weapon = key;
                document.getElementById('attack-mod-container').innerText = characterInfo.charEquipment[key]['item-attack-modifier'];
                document.getElementById('damage-container').innerText = characterInfo.charEquipment[key]['item-damage'];
                document.getElementById(`item-entry-${key}`).firstChild.innerText = 'X';
            } else {
                document.getElementById(`item-entry-${wornEquipment.weapon}`).firstChild.innerText = '';
                wornEquipment.weapon = key;
                document.getElementById('attack-mod-container').innerText = characterInfo.charEquipment[key]['item-attack-modifier'];
                document.getElementById('damage-container').innerText = characterInfo.charEquipment[key]['item-damage'];
                document.getElementById(`item-entry-${key}`).firstChild.innerText = 'X';
            }
            break;

        default:
            break;
    }
    
    localStorage.setItem(characterKey, JSON.stringify(characterInfo));
}

const changeDurability = (targetKey) => {
    let val = document.getElementById(`item-dur-${targetKey}`).value;
    characterInfo.charEquipment[targetKey]['item-durability'] = val;
    if (val == 0) {
        document.getElementById(`item-dur-${targetKey}`).classList.add('wrong-number');
    } else {
        document.getElementById(`item-dur-${targetKey}`).classList.remove('wrong-number');
    }

    localStorage.setItem(characterKey, JSON.stringify(characterInfo));
}



const changeHealth = () => {
    characterInfo.charHealth = parseInt(document.getElementById('health-container').value);
    localStorage.setItem(characterKey, JSON.stringify(characterInfo));
}

const changeFocusPoints = () => {
    characterInfo.focusPoints[1] = parseInt(document.getElementById('focus-points-container').value);
    localStorage.setItem(characterKey, JSON.stringify(characterInfo));
}



const hideRollContainer = () => document.getElementById('roll-container').classList.add('hide');

const diceRoll = (targetId) => {
    let rollContainer = document.getElementById('roll-result');
    let targetValue = parseInt(document.getElementById(targetId).innerText);

    let result = 0;
    let resultDetails = '';
    switch (targetId) {
        case 'displayed-attribute-strength':
            resultDetails += '[ Si '; break;
        case 'displayed-attribute-dexterity':
            resultDetails += '[ Zr '; break;
        case 'displayed-attribute-constitution':
            resultDetails += '[ Wyt '; break;
        case 'displayed-attribute-intellect':
            resultDetails += '[ Int '; break;
        case 'displayed-attribute-charisma':
            resultDetails += '[ Cha '; break;
        default:
            break;
    }

    let rand1 = 1 + Math.floor(Math.random() * 6);
    let rand2 = 1 + Math.floor(Math.random() * 6);

    resultDetails += `${targetValue} + 2k6 (${rand1} + ${rand2}) ]`;
    result = targetValue + rand1 + rand2;


    rollContainer.innerHTML = `<span>Wynik: ${result}</span><br>${resultDetails}`;
    document.getElementById('roll-container').classList.remove('hide');
}

const saveCharacterNotes = () => {
    characterInfo.charNotes = document.getElementById('character-notes').value;
    localStorage.setItem(characterKey, JSON.stringify(characterInfo));
}

const downloadCharacter = () => {
    let e = document.createElement('a');
    e.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(characterKey + `:` + JSON.stringify(characterInfo));
    e.setAttribute('download',characterInfo.charName);
    e.style.display = 'none';
    document.body.appendChild(e);
    e.click();
    document.body.removeChild(e);
}

loadCharacterInfo();