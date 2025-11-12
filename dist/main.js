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
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.dataset.tab || 'about';
      tabs.forEach(function (t) { return t.setAttribute('aria-selected', (t === tab).toString()); });
      Object.keys(sections).forEach(function (k) {
        var el = sections[k];
        if (!el)
          return;
        if (k === target)
          el.removeAttribute('hidden');
        else
          el.setAttribute('hidden', '');
      });
    });
  });
});
