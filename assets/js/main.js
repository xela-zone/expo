import * as params from '@params';
import L from "leaflet";

import * as utils from "./utils.js"
import store from "./store.js"


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
  console.log(`adding ${location.name} at ${location.coords}..`)
  let rect = L.rectangle(utils.pointToBox(location.coords), { color: utils.stringToColor(location.name) })
  rect.on("click", () => { utils.loadPage(location.link) })
  rect.bindTooltip(location.name, { permanent: true, direction: location.coords[1] % 2 ? 'bottom' : 'top' }).addTo(booths)
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


//  init code for page, will reload the base if no # in url, otherwise use # route to preload the state
if (window.location.hash) {
  if (window.location.hash == "#") {
    window.history.replaceState(store.State, 'Home Page', '#')
  } else {
    loadPage(window.location.hash.substr(1))
    console.log(`loaded ${window.location.hash.substr(1)}`)
    window.history.replaceState(store.State, undefined, `#${window.location.hash.substr(1)}`)
  }
}

let featuredTemplate = document.getElementById('templateFeatured')

let filtered = locations.filter(e => e.hasOwnProperty('img') && e.type == "booth")
utils.shuffleArray(filtered)
for (let i = 0; i < Math.min(3, filtered.length); i++) {
  let clone = featuredTemplate.cloneNode(true)

  clone.id = undefined
  let nodes = Array.from(clone.childNodes)
  let img = nodes.find(elm => elm.nodeName == "IMG")
  img.src = filtered[i].img
  img.alt = filtered[i].alt
  let text = nodes.find(elm => elm.nodeName == "H5")
  text.innerText = filtered[i].name

  clone.addEventListener('click', () => { utils.loadPage(filtered[i].link) })
  clone.style.display = "Block"
  featuredTemplate.parentNode.append(clone)
}


let currSponcer = 0
let sponsorRoot = document.getElementById('sponsorRoot')
utils.shuffleArray(sponcers)
console.log(sponcers)
function nextSponcer() {
  currSponcer++
  if (currSponcer >= sponcers.length) {
    currSponcer = 0
  }
  let embed = document.createElement('img')
  embed.alt = `the ${eventTitle} is proudly sponsered by ${sponcers[currSponcer].title}`
  embed.src = sponcers[currSponcer].image
  embed.addEventListener('click', () => { utils.loadPage(sponcers[currSponcer].link) })
  embed.classList.add('pointer-cursor')
  embed.classList.add('max-height-200')
  let anchor = document.createElement('div')

  anchor.append(embed)
  sponsorRoot.childNodes.forEach(elm => { elm.remove() })
  sponsorRoot.append(anchor)
}
nextSponcer()

setInterval(nextSponcer, 30 * 60 * 1000) // every 30 seconds