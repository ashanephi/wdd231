const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

const displayProphets = (prophetsData) => {
    cards.innerHTML = ''; // Clears the previous content
    prophetsData.forEach((prophet) => {
        const card = document.createElement("section");
        const fullName = document.createElement("h2");
        const portrait = document.createElement("img");

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${fullName.textContent} - ${prophet.order} Latter-day President`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "340");
        portrait.setAttribute("height", "440");

        card.appendChild(fullName);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
};

const filterByUtah = (prophetsData) => prophetsData.filter(prophet => prophet.birthplace === "Utah");

const filterByOutsideUS = (prophetsData) => prophetsData.filter(prophet => 
    !["Utah", "Idaho", "Vermont", "Ohio", "Missouri", "Connecticut"].includes(prophet.birthplace)
);

const filterByAge95Plus = (prophetsData) => prophetsData.filter(prophet => {
    let birthYear = parseInt(prophet.birthdate.split(" ").pop());
    let deathYear = prophet.death ? parseInt(prophet.death.split(" ").pop()) : new Date().getFullYear();
    return (deathYear - birthYear) >= 95;
});

const filterByChildren10 = (prophetsData) => prophetsData.filter(prophet => prophet.numofchildren >= 10);

const filterByServed15 = (prophetsData) => prophetsData.filter(prophet => prophet.length >= 15);

async function getProphetData(criteria = null) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");

        let data = await response.json();
        let prophetsData = data.prophets;

        if (criteria === "utah") displayProphets(filterByUtah(prophetsData));
        else if (criteria === "outsideUS") displayProphets(filterByOutsideUS(prophetsData));
        else if (criteria === "lived95") displayProphets(filterByAge95Plus(prophetsData));
        else if (criteria === "children10") displayProphets(filterByChildren10(prophetsData));
        else if (criteria === "served15") displayProphets(filterByServed15(prophetsData));
        else { displayProphets(prophetsData);} // Shows all data if there's no criteria
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Load all prophets on initial page load
getProphetData("all");
