onload = () =>{
        document.body.classList.remove("container");
        
        // Start Sempurna2 music automatically
        const bgMusic2 = document.getElementById('backgroundMusic2');
        if (bgMusic2) {
          bgMusic2.volume = 0.15; // Set to 15% volume (same as from index page)
          bgMusic2.play().catch(e => {
            console.log('Autoplay blocked, will play on first interaction');
            // Fallback: play on first click if autoplay is blocked
            document.body.addEventListener('click', () => {
              bgMusic2.play().catch(err => console.log('Music play failed:', err));
            }, { once: true });
          });
        }
};

// Handle button interactions
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionBox = document.querySelector('.question-box');

// Yes button click
yesBtn.addEventListener('click', () => {
  questionBox.innerHTML = '<h2 class="question-text" style="font-size: 2rem;">🎉 Yay! I\'m so happy! 💕</h2>';
  setTimeout(() => {
    questionBox.style.animation = 'fadeOut 1s ease-out forwards';
    // Redirect to WhatsApp after fade out
    setTimeout(() => {
      window.location.href = 'https://wa.link/0fzy8x';
    }, 1000);
  }, 3000);
});

// No button - runs away when hovered
noBtn.addEventListener('mouseenter', () => {
  const maxX = window.innerWidth - noBtn.offsetWidth - 20;
  const maxY = window.innerHeight - noBtn.offsetHeight - 20;
  
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  
  noBtn.style.position = 'fixed';
  noBtn.style.left = randomX + 'px';
  noBtn.style.top = randomY + 'px';
  noBtn.style.transition = 'all 0.3s ease';
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
  }
`;
document.head.appendChild(style);
