'use strict';

import { map } from './my-map.js';

export async function updateAppInfo(ip) {
  const ipData = await fetchIpData(ip);
  updateInfoBody(ipData);

  if (map.exists()) {
    map.update(ipData.latitude, ipData.longitude);
  } else {
    map.create(ipData.latitude, ipData.longitude);
    map.update(ipData.latitude, ipData.longitude);
  }
}

export async function fetchIpData(ip) {
  const geoiplookup = ip
    ? 'https://json.geoiplookup.io/' + ip
    : 'https://json.geoiplookup.io/';
  const response = await fetch(geoiplookup);
  const responseData = await response.json();
  return responseData;
}

export function updateInfoBody(ipData) {
  document.getElementById('ip-address').innerHTML = ipData.ip;
  document.getElementById('timezone').innerHTML = ipData.timezone_name;
  document.getElementById('isp').innerHTML = ipData.isp;
  document.getElementById('location').innerHTML =
    `${ipData.country_name}, ` + ` ${ipData.region}, ${ipData.city}`;
}
