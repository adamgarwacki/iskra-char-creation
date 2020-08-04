'use strict';

let characterInfo;

const loadCharacterInfo = () => {
    let characterKey = sessionStorage.getItem('displayedChar');
    characterInfo = JSON.parse(localStorage.getItem(characterKey));
    console.log(characterInfo);

    document.getElementById('character-name').innerText = characterInfo.charName;
    document.getElementById('character-concept').innerText = characterInfo.charConcept;

    let attributeIterator = 0;
    for (let domElement of document.getElementsByClassName('displayed-attribute')) {
        domElement.innerText = characterInfo.charAttributes[attributeIterator];
        attributeIterator++;
    }

    let focusPointsContainer = document.getElementById('focus-points-container');
    focusPointsContainer.value = characterInfo.focusPoints;


    let characterAbilitiesContainer = document.getElementById('table-abilities');

    Object.entries(characterInfo.charAbilities).forEach(ability => {
        
        let abilityEntry = document.createElement('tr');
        let abilityName = document.createElement('td');
        let abilityCost = document.createElement('td');
        let abilityDescription = document.createElement('td');

        abilityName.innerText = ability[1]['ability-name'];
        abilityCost.innerText = ability[1]['ability-cost'];
        abilityDescription.innerText = ability[1]['ability-description'];

        abilityEntry.appendChild(abilityName);
        abilityEntry.appendChild(abilityCost);
        abilityEntry.appendChild(abilityDescription);
        
        characterAbilitiesContainer.appendChild(abilityEntry);
    });



    let equipmentContainer = document.getElementById('table-equipment');
    // console.log(equipmentContainer);

    Object.entries(characterInfo.charEquipment).forEach(item => {
        let itemEntry = document.createElement('tr');
        let itemName = document.createElement('td');
        let itemDefense = document.createElement('td');
        let itemAttack = document.createElement('td');
        let itemDamage = document.createElement('td');
        let itemDurability = document.createElement('td');
        let itemDescription = document.createElement('td');
        let itemQuantity = document.createElement('td');

        itemName.innerText = item[1]['item-name'];
        itemDefense.innerText = item[1]['item-defense'];
        if (item[1]['item-attack-attribute'] != 'Brak') {
            itemAttack.innerText = `${item[1]['item-attack-attribute']} ${item[1]['item-attack-modifier']}`;
        } else {
            itemAttack.innerText = `---`;
        }
        itemDamage.innerText = item[1]['item-damage'];
        itemDurability.innerText = item[1]['item-durability'];
        itemDescription.innerText = item[1]['item-description'];
        itemQuantity.innerText = item[1]['item-quantity'];

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

const showMenu = () => {
    document.getElementById('blending-curtain').classList.toggle('show');
}

loadCharacterInfo();