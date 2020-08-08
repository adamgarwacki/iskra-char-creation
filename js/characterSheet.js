'use strict';

// let characterInfo;
let characterKey = sessionStorage.getItem('displayedChar');
let characterInfo = JSON.parse(localStorage.getItem(characterKey));

const loadCharacterInfo = () => {
    // console.log(characterInfo);

    document.getElementById('character-name').innerText = characterInfo.charName;
    document.getElementById('character-concept').innerText = characterInfo.charConcept;

    let attributeIterator = 0;
    for (let domElement of document.getElementsByClassName('displayed-attribute')) {
        domElement.innerText = characterInfo.charAttributes[attributeIterator];
        attributeIterator++;
    }

    let focusPointsContainer = document.getElementById('focus-points-container');
    focusPointsContainer.value = characterInfo.focusPoints;

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
    // console.log(equipmentContainer);

    Object.values(characterInfo.charEquipment).forEach(item => {
        let itemEntry = document.createElement('tr');
        let itemName = document.createElement('td');
        let itemDefense = document.createElement('td');
        let itemAttack = document.createElement('td');
        let itemDamage = document.createElement('td');
        let itemDurability = document.createElement('td');
        let itemDescription = document.createElement('td');
        let itemQuantity = document.createElement('td');

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

        itemEntry.appendChild(itemName);
        itemEntry.appendChild(itemDefense);
        itemEntry.appendChild(itemAttack);
        itemEntry.appendChild(itemDamage);
        itemEntry.appendChild(itemDurability);
        itemEntry.appendChild(itemDescription);
        itemEntry.appendChild(itemQuantity);

        equipmentContainer.appendChild(itemEntry);
    });
}

const changeHealth = () => {
    characterInfo.charHealth = parseInt(document.getElementById('health-container').value);
    localStorage.setItem(characterKey, JSON.stringify(characterInfo));
}

const changeFocusPoints = () => {
    characterInfo.focusPoints = parseInt(document.getElementById('focus-points-container').value);
    localStorage.setItem(characterKey, JSON.stringify(characterInfo));
}

const hideRollContainer = () => document.getElementById('roll-container').classList.add('hide');

const diceRoll = (targetId) => {
    let rollContainer = document.getElementById('roll-result');
    let targetValue =  parseInt(document.getElementById(targetId).innerText);
    let result = 2 + Math.floor(Math.random()*6) + Math.floor(Math.random()*6);
    rollContainer.innerText = result + targetValue;
    
    document.getElementById('roll-container').classList.remove('hide');
}

const toggleMenu = () => {
    document.getElementById('blending-curtain').classList.toggle('hide');
}

loadCharacterInfo();