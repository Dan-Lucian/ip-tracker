'use strict';

import { map } from './my-map.js';

export async function updateAppBody(ip) {
  const ipData = await fetchIpData(ip);
  updateElementsContent(ipData);

  if (map.exists()) {
    map.update(ipData.latitude, ipData.longitude, 'Somewhere around here', 18);
  } else {
    map.create(ipData.latitude, ipData.longitude);
    map.update(0, 0, null, 3);
  }
}

async function fetchIpData(ip) {
  const geoiplookup = ip
    ? 'https://json.geoiplookup.io/' + ip
    : 'https://json.geoiplookup.io/';
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
