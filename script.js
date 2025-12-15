/* MOBILE MENU */
function toggleMenu(){
  const ul = document.querySelector('nav ul');
  if(!ul) return;
  ul.style.display = ul.style.display === 'flex' ? 'none' : 'flex';
  ul.style.flexDirection = 'column';
}

/* DARK MODE */
(function(){
  const btn = document.getElementById('theme-toggle');
  if(localStorage.getItem('theme') === 'dark'){
    document.body.classList.add('dark');
  }
  if(btn){
    btn.textContent = document.body.classList.contains('dark') ? 'Light' : 'Dark';
    btn.onclick = ()=>{
      document.body.classList.toggle('dark');
      localStorage.setItem(
        'theme',
        document.body.classList.contains('dark') ? 'dark' : 'light'
      );
      btn.textContent = document.body.classList.contains('dark') ? 'Light' : 'Dark';
    };
  }
})();

/* GALLERY MODAL — YOUR STRUCTURE KEPT */
function openModal(html){
  const modal = document.getElementById('modal');
  modal.querySelector('.modal-card').innerHTML = html;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  const modal = document.getElementById('modal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('click', e=>{
  const item = e.target.closest('.gallery-item');
  if(item){
    const title = item.dataset.title || '';
    const img = item.querySelector('img')?.src || '';
    const desc = item.dataset.desc || '';
    openModal(`
      <button onclick="closeModal()" style="float:right;font-size:20px;border:0;background:none">✕</button>
      <h2>${title}</h2>
      <img src="${img}" style="width:100%;border-radius:8px;margin:10px 0">
      <p class="small">${desc}</p>
    `);
  }
});

document.addEventListener('keydown',e=>{
  if(e.key === 'Escape') closeModal();
});
document.getElementById('modal')?.addEventListener('click',e=>{
  if(e.target.id === 'modal') closeModal();
});

/* COUNTERS */
const counters = document.querySelectorAll('[data-counter]');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el = entry.target;
      const target = Number(el.dataset.counter);
      let start = 0;
      const step = ()=>{
        start += target / 60;
        if(start >= target){
          el.textContent = target;
        }else{
          el.textContent = Math.floor(start);
          requestAnimationFrame(step);
        }
      };
      step();
      observer.unobserve(el);
    }
  });
},{threshold:.4});
counters.forEach(c=>observer.observe(c));

/* CONTACT FORM */
document.addEventListener('submit',e=>{
  if(e.target.id === 'contactForm'){
    e.preventDefault();
    alert('Form submitted (demo)');
    e.target.reset();
  }
});

