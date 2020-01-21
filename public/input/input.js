function submitLocation() {
    if ('geolocation' in navigator) {
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(async position => {
            // Variables to hold form information.
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const superhero = document.getElementById('superhero').value;

            // Display to DOM.
            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;
            
            // API
            const data = {lat, lon, superhero};
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('/api', options);
            const json = await response.json();
            console.log(json);
        });
    } else {
        console.log('geolocation not available');
    }
}