import { showMessage } from './helpers.js';
import { updateAppInfo } from './load-client-ip.js';

export function setSearchEvent() {
  const form = document.getElementById('form');
  form.onsubmit = onSubmit;
}

async function onSubmit() {
  event.preventDefault();

  const ip = document.getElementById('ip-input').value;

  if (isValid(ip)) {
    updateAppInfo(ip);
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
