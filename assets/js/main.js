import * as params from '@params';
import L from "leaflet";

import { stringToColor, innerText } from "./utils.js"


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
L.imageOverlay(params.image, [[0, 0], [12, 9]]).addTo(map)


map.fitBounds([[0, 0], [12, 9]]);



locations.forEach(location => {
  console.log(`adding ${location.name}..`)
  let rect = L.rectangle(location.coords, { color: stringToColor(location.name) })
  rect.bindPopup(innerText(location))
  rect.bindTooltip(location.name, { permanent: true, direction: 'top' })
  rect.addTo(map)
})



map.on('click', e => console.log("You clicked the map at " + e.latlng));


map.on("zoomend", e => {
  if (zoom && map.getZoom() != zoom) {
    map.setZoom(zoom);
  }
});