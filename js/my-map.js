'use strict';

class MyMap {
  create(lat, long, zoom) {
    // if mobile then position map off center lower
    if (window.innerWidth < 768) {
      this._isMobileScreen = true;
    }

    this._map = L.map('mapid').setView([lat, long], zoom);

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

  update(lat, long, zoom, msg) {
    // add circle marker
    const circle = L.circle([lat, long], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.2,
      radius: 1000,
    }).addTo(this._map);

    // set a tooltip for the marker
    circle.bindPopup(msg).openPopup();

    // if mobile screen position map a bit lower and with less zoom
    if (this._isMobileScreen) {
      zoom -= 1;
      lat += 0.005; // offset is grades
    }

    // update map coords
    this._map.setView([lat, long], zoom);

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

  exists() {
    return Boolean(this._map);
  }
}

export const map = new MyMap();
