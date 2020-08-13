'use strict';

// console.log('dzyń');

// let characterKeyList = [1597312204542, 1597312290677];
// localStorage.setItem('charKeyList', JSON.stringify(characterKeyList));

const deleteCharacter = (key) => {

    // console.log(characterKeyList.indexOf(1597311509295));
    let charName = JSON.parse(localStorage.getItem(key)).charName;
    let confirmMessage = confirm(`Czy na pewno chcesz usunąć tę postać? (${charName})`);
    if (confirmMessage) {
        localStorage.removeItem(key);
        let characterKeyList = JSON.parse(localStorage.getItem('charKeyList'));
        let index = characterKeyList.indexOf(key);
        console.log(key);
    
        characterKeyList.splice(index, 1);
        console.log(characterKeyList);
        localStorage.setItem('charKeyList', JSON.stringify(characterKeyList));
        location.reload();
    }
}

const loadChars = () => {
    if (!localStorage.charKeyList) {
        localStorage.setItem('charKeyList', JSON.stringify([]));

    } else {

        let allKeys = JSON.parse(localStorage.getItem('charKeyList'));
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
            // charNameEntry.setAttribute('onclick', `sessionStorage.setItem("displayedChar", "${key}")`);
            let deleteCharButton = document.createElement('button');
            deleteCharButton.innerText = 'Usuń postać';
            deleteCharButton.onclick = () => deleteCharacter(key);


            charNameContainer.appendChild(charNameEntry);
            charNameContainer.appendChild(charConceptEntry);
            charNameContainer.appendChild(deleteCharButton);

            document.getElementById('created-characters').prepend(charNameContainer);
        })
    }
}

const deleteData = () => {
    console.log('usunięto');
}

loadChars();