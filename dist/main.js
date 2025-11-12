document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('app') || document.body;
  var h1 = document.createElement('h1');
  h1.textContent = 'Hi, my name is niyaz';
  el.appendChild(h1);
});
