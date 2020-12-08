import L from "leaflet";


console.log(locations)
console.log(locations.length)

let mymap = L.map('mapContainer').setView(locations[0].coords, 14);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

locations.forEach(location => {
  console.log(`adding ${location.name}..`)
  L.marker(location.coords).bindPopup(`<b>${location.name}</b>\n\n${location.lead}\n<a href="${location.link}">read more</a>`).addTo(mymap)
})

function onMapClick(e) {
  console.log("You clicked the map at " + e.latlng);
}

mymap.on('click', onMapClick);