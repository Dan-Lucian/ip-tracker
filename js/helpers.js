export function showMessage(text) {
  console.log('shit has gone wild');

  const message = document.createElement('div');

  message.innerHTML = `<p style="margin: 0;">${text}</p>`;
  message.className = 'pop-up-message';
  document.body.append(message);

  setTimeout(() => message.classList.add('pop-up-message--fade-in'));
  setTimeout(() => {
    message.ontransitionend = () => message.remove();
    message.classList.remove('pop-up-message--fade-in');
  }, 1500);
}

export function vertAlignInfoBody() {
  const container = document.getElementById('app-body');
  container.style.bottom = `-${container.getBoundingClientRect().height / 2}px`;
}
