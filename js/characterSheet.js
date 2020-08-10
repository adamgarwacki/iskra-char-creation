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
        let itemDurability = document.createElement('td');
        let itemDescription = document.createElement('td');
        let itemQuantity = document.createElement('td');

        // let currentDefenseValue = parseInt(document.getElementById('defense-container').value);
        // let currentAttackModifier = parseInt(document.getElementById('attack-mod-container').value);

        if (!characterInfo.charEquipmentWorn.includes(itemKey)) {
            isWorn.innerText = ' ';
        } else {
            let currentDefenseValue = parseInt(document.getElementById('defense-container').value) + parseInt(item['item-defense']);
            let currentAttackModifier = parseInt(document.getElementById('attack-mod-container').value) + parseInt(item['item-attack-modifier']);

            document.getElementById('defense-container').value = currentDefenseValue;
            document.getElementById('attack-mod-container').value = currentAttackModifier;

            isWorn.innerText = 'O';
        }

        itemName.innerText = item['item-name'];
        itemDefense.innerText = item['item-defense'];
        if (item['item-attack-attribute'] != 'Brak') {
            itemAttack.innerText = `${item['item-attack-attribute']} ${item['item-attack-modifier']}`;
        } else {
            itemAttack.innerText = `---`;
        }
        itemDamage.innerText = item['item-damage'];
        itemDurability.innerText = item['item-durability'];
        itemDescription.innerText = item['item-description'];
        itemQuantity.innerText = item['item-quantity'];

        itemEntry.appendChild(isWorn);
        itemEntry.appendChild(itemName);
        itemEntry.appendChild(itemDefense);
        itemEntry.appendChild(itemAttack);
        itemEntry.appendChild(itemDamage);
        itemEntry.appendChild(itemDurability);
        itemEntry.appendChild(itemDescription);
        itemEntry.appendChild(itemQuantity);
        itemEntry.id = `${itemKey}`;
        itemEntry.onclick = () => toggleWornEquipment(itemKey);

        equipmentContainer.appendChild(itemEntry);
    });
}


const toggleWornEquipment = (key) => {
    let wornEquipment = characterInfo.charEquipmentWorn;

    let currentDefenseValue = parseInt(document.getElementById('defense-container').value);
    let currentAttackModifier = parseInt(document.getElementById('attack-mod-container').value);

    if (!wornEquipment.includes(key)) {
        wornEquipment.push(key);

        currentDefenseValue += parseInt(characterInfo.charEquipment[key]['item-defense']);
        document.getElementById('defense-container').value = currentDefenseValue;

        currentAttackModifier += parseInt(characterInfo.charEquipment[key]['item-attack-modifier']);
        document.getElementById('attack-mod-container').value = currentAttackModifier;


        document.getElementById(key).firstChild.innerText = 'O';
    } else {
        let newWornEquipment = wornEquipment.filter(e => e != key);
        wornEquipment = newWornEquipment;

        currentDefenseValue -= parseInt(characterInfo.charEquipment[key]['item-defense']);
        document.getElementById('defense-container').value = currentDefenseValue;

        currentAttackModifier -= parseInt(characterInfo.charEquipment[key]['item-attack-modifier']);
        document.getElementById('attack-mod-container').value = currentAttackModifier;

        document.getElementById(key).firstChild.innerText = ' ';
    }

    characterInfo.charEquipmentWorn = wornEquipment;
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

const toggleMenu = () => document.getElementById('blending-curtain').classList.toggle('hide');



loadCharacterInfo();