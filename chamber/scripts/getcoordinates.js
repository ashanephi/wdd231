// import { apiFetch } from "./getData.js";

// const options = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0,
// };

// function success(pos) {
//     const crd = pos.coords;

//     const LATITUDE = crd.latitude;
//     const LONGITUDE = crd.longitude;

//     apiFetch(LATITUDE, LONGITUDE).then(displayWeatherDetails);
// }

// function error(err) {
//     console.warn(`ERROR(${err.code}): ${err.message}`);
    
//     // Default location coordinates for Timbuktu, Mali
//     const DEFAULT_LATITUDE = 16.7735;
//     const DEFAULT_LONGITUDE = -3.0074;

//     apiFetch(DEFAULT_LATITUDE, DEFAULT_LONGITUDE).then(displayWeatherDetails);
// }

// navigator.geolocation.getCurrentPosition(success, error, options);