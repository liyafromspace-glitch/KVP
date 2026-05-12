// Loads shared nav, sets active state per page-route attribute on <body>.
(async function () {
  const slot = document.getElementById('nav-slot');
  if (!slot) return;
  try {
    const res = await fetch('nav.html');
    const html = await res.text();
    slot.outerHTML = html;
  } catch (e) {
    console.error('nav load failed', e);
  }

  const route = document.body.dataset.route;
  document.querySelectorAll('.nav-item').forEach(li => {
    if (li.dataset.route === route) li.classList.add('active');
    li.addEventListener('click', () => {
      const r = li.dataset.route;
      const map = {
        dashboard: 'dashboard.html',
        form: 'form.html',
        table: 'table.html',
        kvp: 'kvp.html',
        design: 'design-system.html',
      };
      if (map[r]) location.href = map[r];
    });
  });

  // segmented toggle
  document.querySelectorAll('.nav-toggle button').forEach(b => {
    b.addEventListener('click', () => {
      b.parentElement.querySelectorAll('button').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
    });
  });

  // keyboard / hover collapse not built in this v
})();
