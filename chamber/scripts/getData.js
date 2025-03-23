export async function apiFetch(LATITUDE, LONGITUDE) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&appid=97b94c90bd766a0d0e822ec0e4f34acb&units=metric&cnt=3`;
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