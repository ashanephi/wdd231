const API_KEY = "97b94c90bd766a0d0e822ec0e4f34acb";
const LATITUDE = 49.74937832305819;
const LONGITUDE = 6.638457800757393;

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

    apiFetch(LATITUDE, LONGITUDE).then(displayResults);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);
  

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

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

function displayResults(data) {
    console.log(data);
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}

// let result = await apiFetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`);

displayResults();