'use strict';

class MyMap {
  create(lat, long, zoom) {
    // if mobile then position map off center lower
    if (window.innerWidth < 768) {
      this._map = L.map('mapid').setView([lat + 0.01, long], zoom);
      return;
    }

    this._map = L.map('mapid').setView([lat, long], zoom);
    return;
  }

  exists() {
    return Boolean(this._map);
  }

  update(lat, long, msg, zoom) {
    // set a tooltip for the marker
    if (msg) {
      // update map coords
      this._map.setView([lat, long], zoom)

      // add circle marker
      const circle = L.circle([lat, long], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 1000,
      }).addTo(this._map);

      circle.bindPopup(msg).openPopup();
    }

    // set new zoom
    console.log('zoom = ' + zoom);
    this._map.setZoom(zoom);

    // request the fancy layer
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom: zoom,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: config.mapboxKey,
      }
    ).addTo(this._map);
  }
}

export const map = new MyMap();
