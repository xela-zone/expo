import store from './store.js';

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


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function pointToBox(coords, size = .49) {
  return [[coords[0] - size, coords[1] - size], [coords[0] + size, coords[1] + size]]
}


const contentRoot = document.getElementById("content")
const map = document.getElementById("map")
function loadPage(url) {
  store.commit('page', url)
}

async function _loadPage(url) {
  if (url == "/") {
    contentRoot.style.display = "none"
    map.style.display = "block"
    return
  }
  let page = await fetch(url)
  if (page.ok) {
    contentRoot.innerHTML = await page.text()
    contentRoot.style.display = "block"
    map.style.display = "none"
  } else {
    store.commit('page', '/')
  }
}


store.subscribe('page', _loadPage)

store.subscribe('page', (url) => {
  if (url == "/") {
    window.history.pushState(store.State, null, "#")
  } else {
    window.history.pushState(store.State, null, `#${url}`)
  }
})


window.onpopstate = (event) => {
  if (event.state) {
    console.log(event.state)
    store.State['page'] = event.state['page']
    _loadPage(event.state['page'])
  }
}

function showMap() {
  store.commit('page', '/')
}



window.showMap = showMap
window.loadPage = loadPage


export { stringToColor, pointToBox, loadPage, showMap, shuffleArray };