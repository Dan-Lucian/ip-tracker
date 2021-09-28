'use strict';

import { map } from './my-map.js';

export async function updateAppBody(ip = '') {
  addLoadingAnimation();

  if (map.exists()) {
    const ipData = await fetchIpData(ip);
    updateElementsContent(ipData);

    map.setLat(ipData.latitude);
    map.setLong(ipData.longitude);
    map.update(13, 'Somewhere around here');
    removeLoadingAnimation();

    return;
  }

  map.setLat(53);
  map.setLong(15);
  map.create(3); // zoom
  removeLoadingAnimation();
}

async function fetchIpData(ip) {
  const geoiplookup = 'https://json.geoiplookup.io/' + ip;
  const response = await fetch(geoiplookup);
  const responseData = await response.json();
  return responseData;
}

function updateElementsContent(ipData) {
  document.getElementById('ip-address').innerHTML = ipData.ip;
  document.getElementById('timezone').innerHTML = ipData.timezone_name;
  document.getElementById('isp').innerHTML = ipData.isp;
  document.getElementById('location').innerHTML =
    `${ipData.country_name}, ` + ` ${ipData.region}, ${ipData.city}`;
}

function addLoadingAnimation() {
  document.getElementById('loading-animation').style.display = 'inline-block';
}

function removeLoadingAnimation() {
  document.getElementById('loading-animation').style.display = 'none';
}
