async function getTime() {
  const location = document.getElementById("countryInput").value.trim();
  const locationDisplay = document.getElementById("locationName");
  const timeDisplay = document.getElementById("time");
  if (!location) {
    locationDisplay.innerText = "Please enter a location!";
    timeDisplay.innerText = "";
    return;
  }
  try {
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`);
    const geoData = await geoRes.json();
    if (geoData.length === 0) {
      locationDisplay.innerText = "Location not found!";
      timeDisplay.innerText = "";
      return;
    }
    const lat = geoData[0].lat;
    const lon = geoData[0].lon;
    const apiKey = 'Q03E0V1OUS6W'; 
    const timeRes = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`);
    const timeData = await timeRes.json();
    if (timeData.status !== 'OK') {
      locationDisplay.innerText = "Error getting time!";
      timeDisplay.innerText = "";
      return;
    }
    locationDisplay.innerText = `Current Time in ${timeData.zoneName}`;
    timeDisplay.innerText = timeData.formatted;
  } catch (error) {
    locationDisplay.innerText = "Error fetching data!";
    timeDisplay.innerText = "";
    console.error(error);
  }
}
