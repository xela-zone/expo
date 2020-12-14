import * as params from '@params';
import L from "leaflet";

import { stringToColor, innerText, pointToBox } from "./utils.js"


console.log(params)
console.log(locations)
console.log(locations.length)

let map = L.map('mapContainer', {
  crs: L.CRS.Simple,
  minZoom: -1,
  zoomControl: false,
  dragging: false,
  touchZoom: false,
  doubleClickZoom: false,
  scrollWheelZoom: false,
  keyboard: false
})


let booths = L.featureGroup()
let images = L.featureGroup()
locations.forEach(location => {
  console.log(`adding ${location.name}..`)
  let rect = L.rectangle(pointToBox(location.coords), { color: stringToColor(location.name) })
  rect.bindPopup(innerText(location))
  rect.bindTooltip(location.name, { permanent: true, direction: 'top' }).addTo(booths)
  L.imageOverlay(params.image, rect.getBounds()).addTo(images)
})

booths.addTo(map)
images.addTo(map)
map.fitBounds(booths.getBounds());


map.on('click', e => console.log("You clicked the map at " + e.latlng));


map.on("zoomend", e => {
  if (zoom && map.getZoom() != zoom) {
    map.setZoom(zoom);
  }
});