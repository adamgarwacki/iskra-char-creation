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

    let characterAbilitiesContainer = document.getElementById('ability-table');

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
}

loadCharacterInfo();