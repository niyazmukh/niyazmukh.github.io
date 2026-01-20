document.addEventListener('DOMContentLoaded', () => {
    // Set dynamic bits without disturbing the static content
    document.title = 'im niyaz';
    const yearEl = document.getElementById('year');
    if (yearEl)
        yearEl.textContent = String(new Date().getFullYear());
    // tab behavior for about / blog / projects
    const tabs = Array.from(document.querySelectorAll('.tab'));
    const sections = {
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
    const activateTab = (tab) => {
        const target = tab.dataset.tab || 'about';
        tabs.forEach(t => {
            const selected = t === tab;
            t.setAttribute('aria-selected', String(selected));
            t.tabIndex = selected ? 0 : -1;
        });
        Object.keys(sections).forEach(k => {
            const el = sections[k];
            if (!el)
                return;
            if (k === target)
                el.removeAttribute('hidden');
            else
                el.setAttribute('hidden', '');
        });
        tab.focus();
    };
    tabs.forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab));
        tab.addEventListener('keydown', (e) => {
            const idx = tabs.indexOf(tab);
            if (e.key === 'ArrowRight') {
                const next = tabs[(idx + 1) % tabs.length];
                activateTab(next);
                e.preventDefault();
            }
            else if (e.key === 'ArrowLeft') {
                const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
                activateTab(prev);
                e.preventDefault();
            }
            else if (e.key === 'Home') {
                activateTab(tabs[0]);
                e.preventDefault();
            }
            else if (e.key === 'End') {
                activateTab(tabs[tabs.length - 1]);
                e.preventDefault();
            }
            else if (e.key === 'Enter' || e.key === ' ') {
                activateTab(tab);
                e.preventDefault();
            }
        });
    });
    // modal for blog posts
    const modal = document.getElementById('post-modal');
    const modalBody = document.getElementById('post-modal-body');
    const appRoot = document.getElementById('app');
    const closeBtn = modal === null || modal === void 0 ? void 0 : modal.querySelector('[data-close]');
    const postLinks = Array.from(document.querySelectorAll('.post-link'));
    let lastFocused = null;
    const isModalOpen = () => (modal === null || modal === void 0 ? void 0 : modal.getAttribute('aria-hidden')) === 'false';
    const getFocusableInModal = () => {
        if (!modal)
            return [];
        const focusables = modal.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');
        return Array.from(focusables).filter(el => {
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && style.visibility !== 'hidden';
        });
    };
    const closeModal = () => {
        if (!modal || !modalBody)
            return;
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-labelledby');
        modalBody.innerHTML = '';
        document.body.classList.remove('modal-open');
        if (appRoot)
            appRoot.removeAttribute('aria-hidden');
        if (lastFocused) {
            lastFocused.focus();
            lastFocused = null;
        }
    };
    const openModal = (templateId, trigger) => {
        if (!modal || !modalBody)
            return;
        const tpl = document.getElementById(templateId);
        if (!tpl)
            return;
        modalBody.innerHTML = '';
        const cloned = tpl.content.cloneNode(true);
        modalBody.appendChild(cloned);
        const heading = modalBody.querySelector('h1, h2, h3');
        if (heading) {
            heading.id = heading.id || 'post-modal-title';
            modal.setAttribute('aria-labelledby', heading.id);
        }
        lastFocused = trigger;
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        if (appRoot)
            appRoot.setAttribute('aria-hidden', 'true');
        if (closeBtn)
            closeBtn.focus();
        else
            modalBody.focus();
    };
    postLinks.forEach(link => {
        link.addEventListener('click', evt => {
            const mouseEvt = evt;
            if (mouseEvt.button !== 0 || mouseEvt.metaKey || mouseEvt.ctrlKey || mouseEvt.shiftKey || mouseEvt.altKey) {
                return;
            }
            const templateId = link.dataset.postTemplate;
            if (!templateId)
                return;
            evt.preventDefault();
            openModal(templateId, link);
        });
    });
    closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', () => closeModal());
    modal === null || modal === void 0 ? void 0 : modal.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal();
        }
    });
    document.addEventListener('keydown', event => {
        if (!isModalOpen())
            return;
        if (event.key === 'Escape') {
            closeModal();
            return;
        }
        if (event.key === 'Tab') {
            const focusables = getFocusableInModal();
            if (focusables.length === 0) {
                event.preventDefault();
                return;
            }
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            const active = document.activeElement;
            if (event.shiftKey) {
                if (!active || active === first || !(modal === null || modal === void 0 ? void 0 : modal.contains(active))) {
                    last.focus();
                    event.preventDefault();
                }
            }
            else {
                if (active === last) {
                    first.focus();
                    event.preventDefault();
                }
            }
        }
    });
});
