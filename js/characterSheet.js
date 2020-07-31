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
}

loadCharacterInfo();