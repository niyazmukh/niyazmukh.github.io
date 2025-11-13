document.addEventListener('DOMContentLoaded', () => {
  // Set dynamic bits without disturbing the static content
  document.title = 'im niyaz';
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

  // modal for blog posts
  const modal = document.getElementById('post-modal');
  const modalBody = document.getElementById('post-modal-body');
  const closeBtn = modal?.querySelector('[data-close]') as HTMLButtonElement | null;
  const postLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.post-link'));
  let lastFocused: HTMLElement | null = null;

  const isModalOpen = () => modal?.getAttribute('aria-hidden') === 'false';

  const closeModal = () => {
    if (!modal || !modalBody) return;
    modal.setAttribute('aria-hidden', 'true');
    modalBody.innerHTML = '';
    document.body.classList.remove('modal-open');
    if (lastFocused) {
      lastFocused.focus();
      lastFocused = null;
    }
  };

  const openModal = (templateId: string, trigger: HTMLElement) => {
    if (!modal || !modalBody) return;
    const tpl = document.getElementById(templateId) as HTMLTemplateElement | null;
    if (!tpl) return;
    modalBody.innerHTML = '';
    const cloned = tpl.content.cloneNode(true);
    modalBody.appendChild(cloned);
    lastFocused = trigger;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    if (closeBtn) closeBtn.focus(); else modalBody.focus();
  };

  postLinks.forEach(link => {
    link.addEventListener('click', evt => {
      const templateId = link.dataset.postTemplate;
      if (!templateId) return;
      evt.preventDefault();
      openModal(templateId, link);
    });
  });

  closeBtn?.addEventListener('click', () => closeModal());

  modal?.addEventListener('click', event => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isModalOpen()) {
      closeModal();
    }
  });
});
