const main_content = document.getElementById("characters-container");
let allCharacters = [];
let filtered = [];
let currentIndex = 0;
const charactersPerPage = 16;

function fetchCharacters(){
        // 1- git url Api
    fetch("https://hp-api.onrender.com/api/characters")
    .then((response) => {
        // 2- git status the url and convarter the json data
        console.log("Test get response : ",response);
        return response.json();
    })
    .then(Characters => {
        // 3- git data as opject
        console.log("Test get Characters : ",Characters);
        allCharacters = Characters; 
        renderFilteredCharacters("All"); 
    })
    .catch((e) => {
        // if found error 
        console.error("Error : ",e)
        main_content.innerHTML="<p>Error happened in the catch method</p>"
    })
}

function renderCharacters(){
    const nextCharacters = filtered.slice(currentIndex, currentIndex + charactersPerPage);
    nextCharacters.forEach(element => {

        // 1- create Element
        const card = document.createElement("div");
        card.className = "card-content";    

        // 2- insert the data using innerHTML
        card.innerHTML = `
        <img src="${element.image || 'images/not-found.png'}">
        <h3>${element.name || 'Unknown'}</h3>
        <p>${element.house || 'Unknown'}</p>
        <p>${element.dateOfBirth || 'Unknown'}</p>
        `;

        // 3- append the elemnet
        main_content.appendChild(card);
    });

    currentIndex += charactersPerPage;

    // if not found data
    if (currentIndex >= filtered.length) {
        document.getElementById("loadMoreBtn").style.display = "none";
    } else {
        document.getElementById("loadMoreBtn").style.display = "block";
    }
}


document.getElementById("loadMoreBtn").addEventListener("click", function () {
    renderCharacters();
});


document.getElementById("houseFilter").addEventListener("change",function(){
    const selectedHouse=this.value;
    renderFilteredCharacters(selectedHouse);
});

function renderFilteredCharacters(selectedHouse) {
    currentIndex = 0;
    main_content.innerHTML = "";

    if (selectedHouse === "All") {
        filtered = allCharacters;
    } else {
        filtered = allCharacters.filter(c => c.house === selectedHouse);
    }
    renderCharacters();
}

fetchCharacters();