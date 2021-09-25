'use strict';

class MyMap {
  create(lat, long) {
    // if mobile then position map off center lower
    if (window.innerWidth < 768) {
      this._map = L.map('mapid').setView([lat + 0.01, long], 13);
      return;
    }

    this._map = L.map('mapid').setView([lat, long], 13);
    return;
  }

  exists() {
    return Boolean(this._map);
  }

  update(lat, long) {
    // add circle marker
    var circle = L.circle([lat, long], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 1000,
    }).addTo(this._map);

    // set a tooltip for the marker
    circle.bindPopup('Somewhere around here').openPopup();

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: config.mapboxKey,
      }
    ).addTo(this._map);
  }
}

export const map = new MyMap();
