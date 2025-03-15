const dateModifier = document.querySelector("#lastModified");
dateModifier.textContent = document.lastModified;

fetch("members.json")
.then(response => response.json())
.then(data => displayMembers(data));

function displayMembers(members) {
    const directory = document.querySelector(".container");

    directory.innerHTML = "";

    members.forEach(member => {
        let card = document.createElement("section");
        card.classList.add("member-card");
        card.innerHTML = `
        <h2>${member.name}</h2>
        <p>${member.tagline}</p>
        <hr>
        <div class="contact">
            <div class="business-profile-image">
                <img src="${member.image}" alt="${member.name}" width="100">
            </div>
            <div class="information">
                <p><strong>ADDRESS: </strong>${member.address}</p>
                <p><strong>PHONE: </strong>${member.phone}</p>
                <p><strong>URL: </strong><a href="${member.website}" target="_blank">${member.website}</a></p>          
                <p><strong>MEMBERSHIP: </strong>Platinum</p>                
            </div>
        </div>
        `;

        directory.appendChild(card);
    })

}

function toggleMenu(element) {
    const navMenu = document.querySelector("nav ul");

    navMenu.classList.toggle("active");
    element.classList.toggle("active");
}