// ===== 打字机效果：Hero 副标题 =====
const roles = [
  '游戏编剧 @ 网易雷火《逆水寒》',
  '剧情设计 · 沉浸式体验打造者',
  '网状叙事 · 角色弧光书写者',
  '世界观氛围 · 碎片化叙事设计'
];
const typedEl = document.getElementById('typedRole');
let roleIndex = 0, charIndex = 0, deleting = false;
function typeLoop(){
  if (!typedEl) return;
  const current = roles[roleIndex];
  if (!deleting){
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();
// ===== 展板翻页（每个 .task-showcase 独立计数） =====
document.querySelectorAll('.task-showcase').forEach(showcase => {
  const slides = showcase.querySelectorAll('.task-slide');
  const dots = showcase.querySelectorAll('.task-dot');
  const prevBtn = showcase.querySelector('.task-nav-prev');
  const nextBtn = showcase.querySelector('.task-nav-next');
  let index = 0;
  function goTo(i){
    if (!slides.length) return;
    index = (i + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle('active', idx === index));
    dots.forEach((d, idx) => d.classList.toggle('active', idx === index));
  }
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));
  dots.forEach((dot, idx) => dot.addEventListener('click', () => goTo(idx)));
});
// ===== 游戏图鉴：点击徽章切换展板 =====
document.querySelectorAll('.badge-tile').forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.getAttribute('data-cat');
    document.querySelectorAll('.badge-tile').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.dex-category').forEach(panel => {
      panel.classList.toggle('active', panel.getAttribute('data-cat') === cat);
    });
  });
});
// ===== 侧边栏导航高亮当前区域 =====
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window && navItems.length){
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-20% 0px -60% 0px' });
  sections.forEach(sec => navObserver.observe(sec));
}
// ===== 作品集子导航高亮（剧情设计 / 角色设计 / 世界观设计） =====
const navSubitems = document.querySelectorAll('.nav-subitem');
const portfolioModules = document.querySelectorAll('.portfolio-module');
if ('IntersectionObserver' in window && navSubitems.length){
  const subObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        navSubitems.forEach(item => {
          item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35, rootMargin: '-20% 0px -55% 0px' });
  portfolioModules.forEach(mod => subObserver.observe(mod));
}
