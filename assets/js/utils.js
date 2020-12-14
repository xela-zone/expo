

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
  return `<b>${location.name}</b><br><br>${location.lead}\n<a href="${location.link}">read more</a>`
}


function pointToBox(coords, size = .49) {
  return [[coords[0] - size, coords[1] - size], [coords[0] + size, coords[1] + size]]
}

export { stringToColor, innerText, pointToBox }