import { showMessage } from './helpers.js';
import { updateMap } from './setup-map.js';

export function setSearchEvent() {
  const form = document.getElementById('form');
  form.onsubmit = onSubmit;
}

async function onSubmit() {
  event.preventDefault();

  const ip = document.getElementById('ip-input').value;

  if (isValid(ip)) {
    // // it works
    // const ipData = await fetchData(ip);
    // console.log(JSON.stringify(ipData, null, 2));
    const cachedIpData = getCachedIpData();
    console.log(cachedIpData);

    return;
  }

  showMessage('Invalid IP address, try again');
}

function isValid(ip) {
  // regexp found at https://www.oreilly.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
  const regexp =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/m;

  return ip.match(regexp);
}

async function fetchData(ip) {
  const ipifyUrl =
    `https://geo.ipify.org/api/v1?apiKey=` +
    `${config.ipifyKey}&ipAddress=${ip}`;

  const response = await fetch(ipifyUrl);
  const responseData = await response.json();
  return responseData;
}

function getCachedIpData() {
  return {
    ip: '194.176.167.43',
    location: {
      country: 'RO',
      region: 'Iaşi',
      city: 'Iaşi',
      lat: 47.16667,
      lng: 27.6,
      postalCode: '',
      timezone: '+03:00',
      geonameId: 675810,
    },
    domains: ['c13-2.uaic.ro'],
    as: {
      asn: 12675,
      name: 'UAIC-Network',
      route: '194.176.164.0/22',
      domain: 'uaic.ro',
      type: '',
    },
    isp: 'University "Alexandru Ioan Cuza" Iasi',
    proxy: {
      proxy: false,
      vpn: false,
      tor: false,
    },
  };
}
