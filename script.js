// Custom cursor
const customCursor = document.createElement('div');
customCursor.classList.add('custom-cursor');
document.body.appendChild(customCursor);

// Cursor trail
const trailCount = 10;
const trails = [];

for (let i = 0; i < trailCount; i++) {
  const trail = document.createElement('div');
  trail.classList.add('cursor-trail');
  trail.style.opacity = (1 - i / trailCount) * 0.6;
  trails.push(trail);
  document.body.appendChild(trail);
}

let mouseX = 0;
let mouseY = 0;
let trailPositions = Array(trailCount).fill().map(() => ({x: 0, y: 0}));

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Update cursor position
  customCursor.style.left = mouseX + 'px';
  customCursor.style.top = mouseY + 'px';
});

function updateTrails() {
  // Shift positions
  for (let i = trailCount - 1; i > 0; i--) {
    trailPositions[i] = {x: trailPositions[i-1].x, y: trailPositions[i-1].y};
  }

  trailPositions[0] = {x: mouseX, y: mouseY};

  // Update trail positions
  trails.forEach((trail, index) => {
    trail.style.left = trailPositions[index].x + 'px';
    trail.style.top = trailPositions[index].y + 'px';
  });

  requestAnimationFrame(updateTrails);
}

updateTrails();

// Cursor hover effects
document.addEventListener('mouseover', (e) => {
  if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' ||
      e.target.classList.contains('btn') || e.target.classList.contains('project-card')) {
    customCursor.style.transform = 'scale(1.5)';
    customCursor.style.mixBlendMode = 'normal';
    customCursor.style.background = 'rgba(0, 255, 255, 0.5)';
  }
});

document.addEventListener('mouseout', (e) => {
  if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' ||
      e.target.classList.contains('btn') || e.target.classList.contains('project-card')) {
    customCursor.style.transform = 'scale(1)';
    customCursor.style.mixBlendMode = 'difference';
    customCursor.style.background = 'var(--neon-blue)';
  }
});

// Background floating elements
const floatingContainer = document.querySelector('.floating-elements');
const elements = [
  {shape: 'sphere-5398311_1280.png', size: 80},
  {shape: 'sphere-9628508_1280.png', size: 150},
  {shape: 'abstract-7731737_1280.jpeg', size: 120},
  {shape: 'cubes-2803223_1280.jpeg', size: 100},
  {shape: 'hud-3149462_1280.png', size: 200}
];

for (let i = 0; i < 5; i++) {
  const element = elements[i % elements.length];
  const floatingEl = document.createElement('div');
  floatingEl.classList.add('floating-element');

  const img = document.createElement('img');
  img.src = element.shape;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'contain';

  floatingEl.appendChild(img);
  floatingEl.style.width = element.size + 'px';
  floatingEl.style.height = element.size + 'px';
  floatingEl.style.top = Math.random() * 90 + 5 + 'vh';
  floatingEl.style.left = Math.random() * 90 + 5 + 'vw';
  floatingEl.style.animationDelay = (Math.random() * 5) + 's';
  floatingEl.style.animationDuration = (Math.random() * 10 + 10) + 's';

  floatingContainer.appendChild(floatingEl);
}

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

fadeElements.forEach(element => {
  observer.observe(element);
});

// Mode toggle between engineer and fitness
let fitnessMode = false;
const modeToggle = document.querySelector('.mode-toggle');
const body = document.querySelector('body');

// Engineer and fitness content
const engineerContent = {
  profileImg: 'nrcds5xpf7.jpg',
  title: {
    main: 'エンジニア',
    sub: 'ライフ'
  },
  subtitle: '学生時代に学生団体の立ち上げからWebサービスの開発まで経験し、そこで得た「アプリケーションで世界を変える」という確信を胸に、大手テックカンパニーに就職。現在は3年目のバックエンドエンジニアとして革新的なプロダクトを開発しています。'
};

const fitnessContent = {
  profileImg: 'u35monalpx.jpg',
  title: {
    main: 'フィットネス',
    sub: 'ライフ'
  },
  subtitle: '筋トレ歴5年。エンジニアとしての仕事と並行して、「健全な心は健全な体に宿る」という信念のもと、日々体を鍛えています。テクノロジーと体作りを融合させ、より効率的なトレーニング方法を追求しています。'
};

modeToggle.addEventListener('click', () => {
  // Disable further clicks during animation
  modeToggle.style.pointerEvents = 'none';

  // Toggle fitness mode
  fitnessMode = !fitnessMode;

  // Create multiple layers for epic transition
  const transitionLayers = [];

  // Layer 1: Radial explosion
  const radialLayer = document.createElement('div');
  radialLayer.style.position = 'fixed';
  radialLayer.style.top = '50%';
  radialLayer.style.left = '50%';
  radialLayer.style.width = '0px';
  radialLayer.style.height = '0px';
  radialLayer.style.borderRadius = '50%';
  radialLayer.style.backgroundColor = fitnessMode ? 'var(--fitness-orange)' : 'var(--neon-blue)';
  radialLayer.style.zIndex = '9999';
  radialLayer.style.transform = 'translate(-50%, -50%)';
  radialLayer.style.transition = 'width 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55), height 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
  document.body.appendChild(radialLayer);
  transitionLayers.push(radialLayer);

  // Layer 2: Screen overlay with gradient
  const overlayLayer = document.createElement('div');
  overlayLayer.style.position = 'fixed';
  overlayLayer.style.top = '0';
  overlayLayer.style.left = '0';
  overlayLayer.style.width = '100vw';
  overlayLayer.style.height = '100vh';
  overlayLayer.style.background = `linear-gradient(45deg, 
        ${fitnessMode ? 'var(--fitness-orange)' : 'var(--neon-blue)'} 0%, 
        ${fitnessMode ? 'var(--fitness-red)' : 'var(--electric-purple)'} 50%, 
        ${fitnessMode ? 'var(--fitness-gold)' : 'var(--cyber-pink)'} 100%)`;
  overlayLayer.style.zIndex = '10000';
  overlayLayer.style.opacity = '0';
  overlayLayer.style.transition = 'opacity 0.6s ease';
  document.body.appendChild(overlayLayer);
  transitionLayers.push(overlayLayer);

  // Layer 3: Particle explosion
  const particleContainer = document.createElement('div');
  particleContainer.style.position = 'fixed';
  particleContainer.style.top = '0';
  particleContainer.style.left = '0';
  particleContainer.style.width = '100vw';
  particleContainer.style.height = '100vh';
  particleContainer.style.zIndex = '10001';
  particleContainer.style.pointerEvents = 'none';
  document.body.appendChild(particleContainer);
  transitionLayers.push(particleContainer);

  // Create particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 8 + 4 + 'px';
    particle.style.height = particle.style.width;
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = fitnessMode ? 'var(--fitness-gold)' : 'var(--cyber-pink)';
    particle.style.left = '50%';
    particle.style.top = '50%';
    particle.style.transform = 'translate(-50%, -50%)';
    particle.style.opacity = '0';

    const angle = (Math.PI * 2 * i) / 30;
    const distance = Math.random() * 300 + 200;
    const targetX = Math.cos(angle) * distance;
    const targetY = Math.sin(angle) * distance;

    particle.style.transition = `transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1.2s ease`;
    particleContainer.appendChild(particle);

    setTimeout(() => {
      particle.style.opacity = '1';
      particle.style.transform = `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) scale(0)`;
    }, 300);
  }

  // Main transition icon with dramatic effects
  const iconContainer = document.createElement('div');
  iconContainer.style.position = 'fixed';
  iconContainer.style.top = '50%';
  iconContainer.style.left = '50%';
  iconContainer.style.transform = 'translate(-50%, -50%)';
  iconContainer.style.zIndex = '10002';
  iconContainer.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
  document.body.appendChild(iconContainer);
  transitionLayers.push(iconContainer);

  const icon = document.createElement('div');
  icon.style.fontSize = '8rem';
  icon.style.color = 'white';
  icon.style.textShadow = `0 0 30px ${fitnessMode ? 'var(--fitness-orange)' : 'var(--neon-blue)'}`;
  icon.style.transform = 'scale(0) rotate(0deg)';
  icon.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55), text-shadow 0.8s ease';
  icon.innerHTML = fitnessMode ? '<i class="fas fa-dumbbell"></i>' : '<i class="fas fa-laptop-code"></i>';
  iconContainer.appendChild(icon);

  // Screen shake effect
  document.body.style.animation = 'screenShake 0.6s ease-in-out';

  // Start animation sequence
  setTimeout(() => {
    // Radial explosion
    radialLayer.style.width = '300vw';
    radialLayer.style.height = '300vh';

    // Overlay fade in
    setTimeout(() => {
      overlayLayer.style.opacity = '0.9';
    }, 100);

    // Icon animation
    setTimeout(() => {
      icon.style.transform = 'scale(1.2) rotate(360deg)';
      icon.style.textShadow = `0 0 50px ${fitnessMode ? 'var(--fitness-gold)' : 'var(--cyber-pink)'}`;
    }, 200);

    // Apply mode changes
    setTimeout(() => {
      if (fitnessMode) {
        body.classList.add('fitness-mode');
        modeToggle.innerHTML = '<i class="fas fa-laptop-code"></i>';
        document.querySelector('.engineer-only').style.display = 'none';
        document.querySelector('.fitness-only').style.display = 'block';
      } else {
        body.classList.remove('fitness-mode');
        modeToggle.innerHTML = '<i class="fas fa-dumbbell"></i>';
        document.querySelector('.engineer-only').style.display = 'block';
        document.querySelector('.fitness-only').style.display = 'none';
      }

      // Update content with dramatic effect
      const content = fitnessMode ? fitnessContent : engineerContent;
      const heroImage = document.getElementById('hero-profile-img');
      const titleMain = document.querySelector('.title-main');
      const titleSub = document.querySelector('.title-sub');
      const heroSubtitle = document.querySelector('.hero-subtitle');

      // Dramatic content transition
      [heroImage, titleMain, titleSub, heroSubtitle].forEach((element, index) => {
        if (element) {
          element.style.transform = 'scale(0.8) rotateY(90deg)';
          element.style.transition = 'transform 0.5s ease';

          setTimeout(() => {
            if (element === heroImage) {
              element.src = content.profileImg;
              element.style.objectPosition = fitnessMode ? '20% center' : 'center center';
            } else if (element === titleMain) {
              element.textContent = content.title.main;
            } else if (element === titleSub) {
              element.textContent = content.title.sub;
            } else if (element === heroSubtitle) {
              element.textContent = content.subtitle;
            }

            element.style.transform = 'scale(1) rotateY(0deg)';
          }, 250 + index * 100);
        }
      });

      // Progress bars animation
      if (fitnessMode) {
        setTimeout(() => initProgressBars(), 800);
      }

    }, 600);

    // Clean up transition
    setTimeout(() => {
      // Fade out all layers
      transitionLayers.forEach((layer, index) => {
        setTimeout(() => {
          if (layer === overlayLayer) {
            layer.style.opacity = '0';
          } else if (layer === iconContainer) {
            layer.style.transform = 'translate(-50%, -50%) scale(0)';
          } else if (layer === radialLayer) {
            layer.style.opacity = '0';
          } else {
            layer.style.opacity = '0';
          }
        }, index * 100);
      });

      // Remove all transition elements
      setTimeout(() => {
        transitionLayers.forEach(layer => {
          if (layer.parentNode) {
            layer.parentNode.removeChild(layer);
          }
        });

        // Re-enable toggle button
        modeToggle.style.pointerEvents = 'auto';
        document.body.style.animation = '';
      }, 800);
    }, 1200);

  }, 100);
});

// Initialize progress bars with animation
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  progressBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    setTimeout(() => {
      bar.style.width = width;
    }, 300);
  });
}

// Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loader-wrapper').style.opacity = '0';
    setTimeout(() => {
      document.querySelector('.loader-wrapper').style.display = 'none';
    }, 800);
  }, 1500);

  // Initialize progress bars if in fitness mode
  if (body.classList.contains('fitness-mode')) {
    initProgressBars();
  }
});

// Initialize - Hide fitness section by default
document.querySelector('.fitness-only').style.display = 'none';