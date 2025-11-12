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
  // initialize tabs state
  tabs.forEach(t => {
    const isActive = t.dataset.tab === 'about';
    t.setAttribute('aria-selected', String(isActive));
    t.tabIndex = isActive ? 0 : -1;
  });

  const activateTab = (tab: HTMLButtonElement) => {
    const target = tab.dataset.tab || 'about';
    tabs.forEach(t => {
      const selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
    });
    Object.keys(sections).forEach(k => {
      const el = sections[k as keyof typeof sections];
      if (!el) return;
      if (k === target) el.removeAttribute('hidden'); else el.setAttribute('hidden', '');
    });
    tab.focus();
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (e: KeyboardEvent) => {
      const idx = tabs.indexOf(tab);
      if (e.key === 'ArrowRight') {
        const next = tabs[(idx + 1) % tabs.length];
        activateTab(next);
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
        activateTab(prev);
        e.preventDefault();
      } else if (e.key === 'Home') {
        activateTab(tabs[0]);
        e.preventDefault();
      } else if (e.key === 'End') {
        activateTab(tabs[tabs.length - 1]);
        e.preventDefault();
      } else if (e.key === 'Enter' || e.key === ' ') {
        activateTab(tab);
        e.preventDefault();
      }
    });
  });
});
