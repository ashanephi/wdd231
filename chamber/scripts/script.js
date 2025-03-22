const API_KEY = "97b94c90bd766a0d0e822ec0e4f34acb";

const dateModifier = document.querySelector("#lastModified");
dateModifier.textContent = document.lastModified;

const weatherDetails = document.querySelector(".details");

function displayWeatherDetails(data)
{
    const container = document.createElement("div");
    const img = document.createElement("img");
    let desc = data.weather[0].description;
    img.setAttribute("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    img.setAttribute("alt", desc);
    img.setAttribute("width", "100");
    container.appendChild(img);
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    const randomDiv = document.createElement("div");
    randomDiv.innerHTML = `
        <p><strong>${data.main.temp}</strong> &deg;C</p>
        <p>${desc}</p>
        <p>High: ${Math.round(data.main.temp_max, 0)}</p>
        <p>Low: ${Math.round(data.main.temp_min, 0)}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Sunrise: ${sunrise}</p>
        <p>Sunset: ${sunset}</p>    
    `;

    weatherDetails.innerHTML = "";
    weatherDetails.appendChild(container);
    weatherDetails.appendChild(randomDiv);
}


async function apiFetch(LATITUDE, LONGITUDE) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`;
    try {
        let response = await fetch(url);
        if(response.ok)
        {
            let data = await response.json();
            return data;
        }
        else {
            throw Error(await response.text());
        }

    }   
    catch (error) {
        console.error(error);
    }
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
    const crd = pos.coords;
    console.log(`${crd.latitude}, ${crd.longitude}`);

    const LATITUDE = crd.latitude;
    const LONGITUDE = crd.longitude;

    apiFetch(LATITUDE, LONGITUDE).then(displayWeatherDetails);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

async function getMembersData() {
    const result = await fetch("members.json");
    const data = await result.json();
    return data;
}

// Initial load in grid view
getMembersData().then(displayMembers);

function displayMembers(members) {
    const directory = document.querySelector(".container");
    directory.innerHTML = "";
    directory.classList.remove("list-view");

    members.forEach(member => {
        let card = document.createElement("section");
        card.classList.add("member-card");
        card.innerHTML = `
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
        `;
        directory.appendChild(card);
    });
}

function displayMembersList(members) {
    const directory = document.querySelector(".container");
    directory.innerHTML = "";
    directory.classList.add("list-view");

    let table = document.createElement("table");
    table.classList.add("table-view");

    const isMobileView = window.innerWidth <= 434;

    if (isMobileView) {
        // Render only Name & Website in small screens
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Website</th>
                </tr>
            </thead>
            <tbody id="member-list">
            </tbody>
        `;
    } else {
        // Render full details in larger screens
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Website</th>
                </tr>
            </thead>
            <tbody id="member-list">
            </tbody>
        `;
    }

    const tbody = table.querySelector("#member-list");

    members.forEach(member => {
        let row = document.createElement("tr");

        if (isMobileView) {
            // Mobile version with only Name & Website
            row.innerHTML = `
                <td>${member.name}</td>
                <td><a href="${member.website}" target="_blank">${member.website}</a></td>
            `;
        } else {
            //Gives Full version of details for larger screens
            row.innerHTML = `
                <td>${member.name}</td>
                <td>${member.address}</td>
                <td>${member.phone}</td>
                <td><a href="${member.website}" target="_blank">${member.website}</a></td>
            `;
        }

        tbody.appendChild(row);
    });

    directory.appendChild(table);
}

// This function checks screen size and update the list view dynamically
function updateListViewOnResize() {
    if (document.querySelector(".list-view")) {
        getMembersData().then(displayMembersList);
    }
}

// This listens for window resize and update the list view when necessary
window.addEventListener("resize", updateListViewOnResize);

function getMembershipLevel(level) {
    return level === 1 ? "Member" : level === 2 ? "Silver" : "Gold";
}

function setGridView() {
    const container = document.querySelector(".container");
    container.style.display = "grid";
    container.style.gridTemplateColumns = "1fr 1fr 1fr";
    container.style.gap = "1rem";
    container.style.padding = "10px";
    getMembersData().then(displayMembers);
}

function setListView() {
    const container = document.querySelector(".container");
    container.style.display = "grid";
    container.style.gridTemplateColumns = "1fr";
    container.style.gap = "1rem";
    container.style.padding = "10px";

    getMembersData().then(displayMembersList);
}

// This toggles Menu for Mobile
document.querySelector(".hamburger").addEventListener("click", function() {
    document.querySelector(".nav-links").classList.toggle("active");
    document.querySelector(".hamburger").classList.toggle("active");
});
