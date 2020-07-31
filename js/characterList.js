'use strict';

const loadChars = () => {
    if (!localStorage.charKeyList) {
        // console.log('działa');
        localStorage.setItem('charKeyList', JSON.stringify([]));

    } else {

        let allKeys = JSON.parse(localStorage.getItem('charKeyList'));
        allKeys.forEach(key => {

            

            // console.log(Date.now());

            // zamiast imienia postaci niechg id będzie unikalnym kodem!!! data na przykład ...?

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
            charNameContainer.setAttribute('class', 'character-name-container');
            charNameContainer.setAttribute('id', key);
            charNameEntry.setAttribute('href', './character-sheet.html');
            charNameEntry.setAttribute('onclick', `sessionStorage.setItem("displayedChar", "${key}")`);
            charNameContainer.appendChild(charNameEntry);
            charNameContainer.appendChild(charConceptEntry);

            document.getElementById('created-characters').prepend(charNameContainer);
        })
    }
    
    // console.log('dzyń');
    // let pathToJSON = window.location.pathname.split('/');
    // pathToJSON[pathToJSON.length - 1] = 'data/items.json';
    // console.log(pathToJSON.join('/'));

    // console.log(itemList);
    // window.open(pathToJSON);

    
    // let response = fetch(pathToJSON);
    // let allOfMyData = response.json();
    // console.log(allOfMyData);

    // let itemsJSONFile = new XMLHttpRequest();

    // itemsJSONFile.open('GET', pathToJSON);
    // itemsJSONFile.send();
    // console.log(itemsJSONFile);




    // let allKeys = Object.keys(localStorage);


    // if (localStorage.charList.value != undefined) {
    //     console.log('dzyń');



    // }
}

// localStorage.setItem("displayed-char", `${key}`)