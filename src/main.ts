document.addEventListener('DOMContentLoaded', () => {
  // Set dynamic bits without disturbing the static content
  document.title = 'Niyaz — personal site';
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  // tab behavior for about / blog / projects
  const tabs = Array.from(document.querySelectorAll('.tab')) as HTMLButtonElement[];
  const sections: Record<string, HTMLElement | null> = {
    about: document.getElementById('about'),
    blog: document.getElementById('blog'),
    projects: document.getElementById('projects')
  };
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab || 'about';
      tabs.forEach(t => t.setAttribute('aria-selected', (t === tab).toString()));
      Object.keys(sections).forEach(k => {
        const el = sections[k as keyof typeof sections];
        if (!el) return;
        if (k === target) el.removeAttribute('hidden'); else el.setAttribute('hidden', '');
      });
    });
  });
});
