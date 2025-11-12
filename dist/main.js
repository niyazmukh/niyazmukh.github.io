document.addEventListener('DOMContentLoaded', function () {
  document.title = 'Niyaz — personal site';
  var yearEl = document.getElementById('year');
  if (yearEl)
    yearEl.textContent = String(new Date().getFullYear());
  // tab behavior for about / blog / projects
  var tabs = Array.from(document.querySelectorAll('.tab'));
  var sections = {
    about: document.getElementById('about'),
    blog: document.getElementById('blog'),
    projects: document.getElementById('projects')
  };
  // initialize tabs state
  tabs.forEach(function (t) {
    var isActive = t.dataset.tab === 'about';
    t.setAttribute('aria-selected', String(isActive));
    t.tabIndex = isActive ? 0 : -1;
  });
  var activateTab = function (tab) {
    var target = tab.dataset.tab || 'about';
    tabs.forEach(function (t) {
      var selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
    });
    Object.keys(sections).forEach(function (k) {
      var el = sections[k];
      if (!el)
        return;
      if (k === target)
        el.removeAttribute('hidden');
      else
        el.setAttribute('hidden', '');
    });
    tab.focus();
  };
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () { return activateTab(tab); });
    tab.addEventListener('keydown', function (e) {
      var idx = tabs.indexOf(tab);
      if (e.key === 'ArrowRight') {
        var next = tabs[(idx + 1) % tabs.length];
        activateTab(next);
        e.preventDefault();
      }
      else if (e.key === 'ArrowLeft') {
        var prev = tabs[(idx - 1 + tabs.length) % tabs.length];
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
});
