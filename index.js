function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}
function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  var earthRadiusKm = 6371;
  var dLat = degreesToRadians(lat2 - lat1);
  var dLon = degreesToRadians(lon2 - lon1);
  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}
function getDistance(lat, long) {
  return distanceInKmBetweenEarthCoordinates(48.907899, 2.24794, lat, long);
}
const additionnalFiltersPerDistance = "&order=distance";
if (window.location.toString().indexOf(additionnalFiltersPerDistance) === -1) {
  window.location = window.location.toString() + additionnalFiltersPerDistance;
} else {
  let temp = [];
  const container = document.getElementsByClassName("row").item(1);
  const promises = [];
  document.getElementsByClassName("item-box__avatar").forEach(a => {
    const id = a.href.match(/\/(\d+)-/)[1];
    const x = document.createElement("a");
    promises.push(
      fetch("https://www.vinted.fr/api/v2/users/" + id).then(res =>
        res.json().then(res => {
          const dist = getDistance(
            res.user.seller_location.latitude,
            res.user.seller_location.longitude
          ).toFixed(4);
          x.textContent = res.user.city + " - " + dist;
          x.href = !res.user.seller_location
            ? ""
            : "https://www.google.com/maps/search/?api=1&query=" +
              res.user.seller_location.latitude +
              "," +
              res.user.seller_location.longitude;
          a.parentNode.appendChild(x);
          temp.push({ element: a.parentNode.parentNode.parentNode, dist });
          container.removeChild(a.parentNode.parentNode.parentNode);
        })
      )
    );
  });
  Promise.all(promises).then(() => {
    temp = temp.sort((a, b) => (a.dist > b.dist ? 1 : -1));
    temp.forEach(x => {
      container.appendChild(x.element);
    });
  });
}
