'use strict';

import { map } from './my-map.js';

export async function updateAppBody(ip = '') {
  if (map.exists()) {
    const ipData = await fetchIpData(ip);
    updateElementsContent(ipData);
    map.update(ipData.latitude, ipData.longitude, 14, 'Somewhere around here');
    return;
  }

  map.create(0, 0, 3);
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
