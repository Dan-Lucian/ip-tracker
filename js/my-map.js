'use strict';
/*
  Class API

  Properties
    => lat            - latitude
    => long           - longitude
    => map            - map itself
    => events         - array of custom events
    => circle         - enclosing circle
    => isMobileScreen - if is mobile screen

*/

class MyMap {
  create(zoom) {
    this._currentLat = this._potentialLat;
    this._currentLong = this._potentialLong;

    // if mobile then position map off center lower
    if (window.innerWidth < 768) {
      this._isMobileScreen = true;
    }

    this._map = L.map('mapid');
    this._map.setView([this._currentLat, this._currentLong], zoom);
    this.render(zoom);
  }

  update(zoom, msg) {
    // if mobile screen position map a bit lower and with less zoom
    if (this._isMobileScreen) {
      zoom -= 1;
      this._currentLat += 0.005; // offset is grades
    }

    // if map didn't move then return
    if (this.areCoordsSame()) return;

    this._currentLat = this._potentialLat;
    this._currentLong = this._potentialLong;

    // remove old circle
    if (this._circle) this._map.removeLayer(this._circle);

    // add circle marker
    this._circle = L.circle([this._currentLat, this._currentLong], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.2,
      radius: 1000,
    }).addTo(this._map);

    // set a tooltip for the marker
    this._circle.bindPopup(msg).openPopup();

    // update map coords
    this._map.setView([this._currentLat, this._currentLong], zoom);

    // request the fancy layer
    this.render(zoom);
  }

  render(zoom) {
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

  areCoordsSame() {
    return (
      this._currentLat === this._potentialLat &&
      this._currentLong === this._potentialLong
    );
  }

  setLong(long) {
    this._potentialLong = long;
  }

  setLat(lat) {
    this._potentialLat = lat;
  }
}

export const map = new MyMap();
