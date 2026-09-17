// --- 1. EFEITO DE NEVE COM PROFUNDIDADE 3D ---
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const numFlakes = 150;
const flakes = [];

for (let i = 0; i < numFlakes; i++) {
  flakes.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 3 + 0.5,
    speed: Math.random() * 1.5 + 0.3,
    opacity: Math.random() * 0.7 + 0.3,
    swing: Math.random() * 0.02
  });
}

function drawSnow() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < numFlakes; i++) {
    const f = flakes[i];
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 240, 255, ${f.opacity})`;
    ctx.shadowBlur = f.radius * 2;
    ctx.shadowColor = '#ff8800';
    ctx.fill();

    f.y += f.speed;
    f.x += Math.sin(f.y * f.swing);

    if (f.y > height) {
      f.y = -5;
      f.x = Math.random() * width;
    }
  }
  requestAnimationFrame(drawSnow);
}
drawSnow();

// --- 2. SISTEMA DE PASTAS RECOLHÍVEIS (ACCORDION) ---
document.querySelectorAll('.folder-title').forEach(folderHeader => {
  folderHeader.addEventListener('click', () => {
    const folder = folderHeader.parentElement;
    folder.classList.toggle('active');
  });
});

// --- 3. BARRA DE PESQUISA EM TEMPO REAL ---
const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('.wiki-card');

searchInput.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase();
  
  cards.forEach(card => {
    const title = card.getAttribute('data-title');
    if (title.includes(value)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// --- 4. LIGHTBOX (ZOOM NAS IMAGENS) ---
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.image-wrapper').forEach(wrapper => {
  wrapper.addEventListener('click', () => {
    const img = wrapper.querySelector('img');
    modal.style.display = 'flex';
    modalImg.src = img.src;
  });
});

closeModal.addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});
