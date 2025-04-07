import { places } from "./data.mjs";

const cards = document.querySelector(".places");

places.forEach((place) => {
    const card = document.createElement("section");
    card.classList.add("place-card");
    const title = document.createElement("h2");
    title.textContent = place.name;

    const img = document.createElement("img");
    img.src = place.imageurl;
    img.loading = "lazy";
    img.width = 300;
    img.height = 200; 
    img.alt = place.name;

    const address = document.createElement("address");
    address.textContent = place.address;

    const paragraph = document.createElement("p");
    paragraph.textContent = place.description;
    
    const learnMoreBtn = document.createElement("div");
    learnMoreBtn.textContent = "Learn More";
    learnMoreBtn.classList.add("learn-more-text");    
    
    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(address);
    card.appendChild(paragraph);
    card.appendChild(learnMoreBtn);
    learnMoreBtn.addEventListener("click", () => {
        window.location.href = `place.html?name=${encodeURIComponent(place.name)}`;
    });
    cards.append(card);
});
