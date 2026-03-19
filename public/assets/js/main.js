(() => {
  const setActive = () => {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(a => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href.endsWith(path));
    });
  };
  const THEME_KEY = 'portfolio.theme';
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'light' ? 'Темная' : 'Светлая';
  };
  const initTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(saved || (prefersLight ? 'light' : 'dark'));
  };
  const bindToggle = () => {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  };
  document.addEventListener('DOMContentLoaded', () => {
    setActive();
    initTheme();
    bindToggle();
  });
})();
