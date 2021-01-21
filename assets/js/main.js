import * as params from '@params';
import L from "leaflet";

import * as utils from "./utils.js"



console.log(params)
console.log(locations)
console.log(locations.length)

let map = L.map('map', {
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
  let rect = L.rectangle(utils.pointToBox(location.coords), { color: utils.stringToColor(location.name) })
  rect.on("click", () => { utils.loadPage(location.link) })
  rect.bindTooltip(location.name, { permanent: true, direction: 'top' }).addTo(booths)
  L.imageOverlay(params.image, rect.getBounds()).addTo(images)
})


booths.addTo(map)
images.addTo(map)
map.fitBounds(booths.getBounds());
let zoom = map.getZoom()


map.on('click', e => console.log("You clicked the map at " + e.latlng));


map.on("zoomend", e => {
  if (zoom && map.getZoom() != zoom) {
    map.setZoom(zoom);
  }
});