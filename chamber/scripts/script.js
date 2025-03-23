import { apiFetch } from "./getData.js";

// Default location coordinates for Timbuktu, Mali
const DEFAULT_LATITUDE = 16.7735;
const DEFAULT_LONGITUDE = -3.0074;

// Update the last modified date
const dateModifier = document.querySelector("#lastModified");

// Select weather details container
const weatherDetails = document.querySelector(".details");

apiFetch(DEFAULT_LATITUDE, DEFAULT_LONGITUDE).then(displayWeatherDetails);

dateModifier.textContent = document.lastModified;

// Helper function to create an element with attributes
function createElement(tag, attributes = {}, content = "") {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    if (content) element.innerHTML = content;
    return element;
}

// Display weather details
function displayWeatherDetails(data) {
    const container = createElement("div");
    const img = createElement("img", {
        src: `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`,
        alt: data.list[0].weather[0].description,
        width: "100"
    });
    container.appendChild(img);

    const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString();

    const weatherInfo = `
        <p><strong>${data.list[0].main.temp}</strong> &deg;C</p>
        <p>${data.list[0].weather[0].description}</p>
        <p>High: ${Math.round(data.list[0].main.temp_max)}</p>
        <p>Low: ${Math.round(data.list[0].main.temp_min)}</p>
        <p>Humidity: ${data.list[0].main.humidity}%</p>
        <p>Sunrise: ${sunrise}</p>
        <p>Sunset: ${sunset}</p>
    `;
    const randomDiv = createElement("div", {}, weatherInfo);

    weatherDetails.innerHTML = "";
    weatherDetails.appendChild(container);
    weatherDetails.appendChild(randomDiv);

    const forecast = `
        <h2>Weather Forecast</h2>
        <div>
            <p>Today: <strong>${data.list[0].main.temp}&deg;C</strong></p>
            <p>Wednesday: <strong>${data.list[1].main.temp}&deg;C</strong></p>
            <p>Thursday: <strong>${data.list[2].main.temp}&deg;C</strong></p>
        </div>
    `;
    document.querySelector(".forecast").innerHTML = forecast;
}

// Fetch members data
async function getMembersData() {
    const response = await fetch("members.json");
    const data = await response.json();
    return shuffleArray(data); // Randomize the data
}

// A utility function that helps shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Display members in grid view
function displayMembers(members) {
    const directory = document.querySelector(".container");
    directory.innerHTML = "";
    directory.classList.remove("list-view");

    members.slice(0, 3).forEach(member => { 
        const card = createElement("section", { class: "member-card" }, `
            <h2>${member.name}</h2>
            <p>${member.tagline}</p>
            <div class="contact">
                <div class="business-profile-image">
                    <img src="${member.image}" alt="${member.name}">
                </div>
                <div class="information">
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                    <p><strong>Membership:</strong> ${getMembershipLevel(member.membership)}</p>
                </div>
            </div>
        `);
        directory.appendChild(card);
    });
}

// Display members in list view
function displayMembersList(members) {
    const directory = document.querySelector(".container");
    directory.innerHTML = "";
    directory.classList.add("list-view");

    const isMobileView = window.innerWidth <= 434;
    const tableHeaders = isMobileView
        ? `<tr><th>Name</th><th>Website</th></tr>`
        : `<tr><th>Name</th><th>Address</th><th>Phone</th><th>Website</th></tr>`;

    const table = createElement("table", { class: "table-view" }, `
        <thead>${tableHeaders}</thead>
        <tbody id="member-list"></tbody>
    `);

    const tbody = table.querySelector("#member-list");
    members.slice(0, 3).forEach(member => { 
        const rowContent = isMobileView
            ? `<td>${member.name}</td><td><a href="${member.website}" target="_blank">${member.website}</a></td>`
            : `<td>${member.name}</td><td>${member.address}</td><td>${member.phone}</td><td><a href="${member.website}" target="_blank">${member.website}</a></td>`;
        const row = createElement("tr", {}, rowContent);
        tbody.appendChild(row);
    });

    directory.appendChild(table);
}

// Update list view on window resize
function updateListViewOnResize() {
    if (document.querySelector(".list-view")) {
        getMembersData().then(displayMembersList);
    }
}
window.addEventListener("resize", updateListViewOnResize);

// Gets membership level
function getMembershipLevel(level) {
    return level === 1 ? "Member" : level === 2 ? "Silver" : "Gold";
}

// Sets grid view
function setGridView() {
    getMembersData().then(displayMembers);
}

// Sets list view
function setListView() {
    getMembersData().then(displayMembersList);
}

// Toggles the mobile menu
document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("active");
    document.querySelector(".hamburger").classList.toggle("active");
});

// Initial load in grid view
getMembersData().then(displayMembers);
