import { showMessage } from './helpers.js';
import { updateAppBody } from './update-app-body.js';

export function setSearchEvent() {
  const form = document.getElementById('form');
  form.onsubmit = onSubmit;
}

async function onSubmit() {
  event.preventDefault();

  const ip = document.getElementById('ip-input').value;

  if (isEmpty(ip)) {
    // if no ip provided it will access the api without ip
    // no ip will yield client's ip
    updateAppBody();
    return;
  }

  if (isValid(ip)) {
    updateAppBody(ip);
    return;
  }

  showMessage('Invalid IP address, try again');
}

function isEmpty(ip) {
  return !Boolean(ip);
}

function isValid(ip) {
  // regexp found at https://www.oreilly.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
  const regexp =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/m;

  return ip.match(regexp);
}
