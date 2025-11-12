document.addEventListener('DOMContentLoaded', function () {
  document.title = 'Niyaz — personal site';
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});
