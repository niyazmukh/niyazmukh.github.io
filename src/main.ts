document.addEventListener('DOMContentLoaded', () => {
  // Set dynamic bits without disturbing the static content
  document.title = 'Niyaz — personal site';
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});
