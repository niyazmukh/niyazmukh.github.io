document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('app') || document.body;
  const h1 = document.createElement('h1');
  h1.textContent = 'Hi, my name is niyaz';
  el.appendChild(h1);
});
