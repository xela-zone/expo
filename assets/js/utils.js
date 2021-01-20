

function stringToColor(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

function innerText(location) {
  return `<b>${location.name}</b><br><br>${location.lead}\n<a ">read more</a>`
}


function pointToBox(coords, size = .49) {
  return [[coords[0] - size, coords[1] - size], [coords[0] + size, coords[1] + size]]
}


const contentRoot = document.getElementById("content")
const map = document.getElementById("map")
const BACK_ELEMENT = `<br><button type="button" class="btn btn-primary" onclick="showMap()">Return to Map</button>`
async function loadPage(url) {
  let page = await fetch(url)
  contentRoot.innerHTML = await page.text()
  contentRoot.innerHTML += BACK_ELEMENT
  contentRoot.style.display = "block"
  map.style.display = "none"
}

function showMap() {
  contentRoot.style.display = "none"
  map.style.display = "block"
}

window.showMap = showMap
window.loadPage = loadPage
export { stringToColor, innerText, pointToBox, loadPage, showMap };