import { places } from "./data.mjs";

const cards = document.querySelector(".places");

places.forEach((place) => {
    const card = document.createElement("section");
    card.classList.add("place-card");
    const title = document.createElement("h2");
    title.textContent = place.name;

    const img = document.createElement("img");
    img.src = "images/shops/amazon-cafe.webp"; 
    img.alt = place.name;

    const address = document.createElement("address");
    address.textContent = place.address;

    const paragraph = document.createElement("p");
    paragraph.textContent = place.description;
    
    
    
    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(address);
    card.appendChild(paragraph);
    cards.append(card);
});
