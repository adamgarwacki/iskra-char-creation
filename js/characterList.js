'use strict';

const deleteCharacter = (key) => {
    let charName = JSON.parse(localStorage.getItem(key)).charName;
    let confirmMessage = confirm(`Czy na pewno chcesz usunąć tę postać? (${charName})`);
    if (confirmMessage) {
        localStorage.removeItem(key);
        location.reload();
    }
}

const loadChars = () => {
    let allKeys = Object.keys(localStorage);

    allKeys.forEach(key => {

        let charInfo = JSON.parse(localStorage.getItem(key));

        let charNameEntry = document.createElement('a');
        charNameEntry.innerText = charInfo.charName;

        let charConceptEntry = document.createElement('p');
        if (charInfo.charConcept === "") {
            charConceptEntry.innerText = "nie podano konceptu";
        } else {
            charConceptEntry.innerText = charInfo.charConcept;
        }

        let charNameContainer = document.createElement('div');
        charNameContainer.classList.add('character-name-container');
        charNameContainer.setAttribute('id', key);
        charNameEntry.setAttribute('href', './character-sheet.html');
        charNameEntry.onclick = () => sessionStorage.setItem("displayedChar", key);
        let deleteCharButton = document.createElement('button');
        deleteCharButton.innerText = 'Usuń postać';
        deleteCharButton.onclick = () => deleteCharacter(key);


        charNameContainer.appendChild(charNameEntry);
        charNameContainer.appendChild(charConceptEntry);
        charNameContainer.appendChild(deleteCharButton);

        document.getElementById('created-characters').prepend(charNameContainer);
    })
}

const deleteData = () => {
    let confirmMessage = confirm('Czy na pewno chcesz usunąć wszystkie dane aplikacji?');
    if (confirmMessage) {
        console.log('localStorage.clear()');
    }
}

loadChars();