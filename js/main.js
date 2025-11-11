onload = () =>{
        document.body.classList.remove("container");
        
        // Start Sempurna2 music automatically and resume from saved position if available
        const bgMusic2 = document.getElementById('backgroundMusic2');
        if (bgMusic2) {
          // Target volume
          const targetVolume = 0.8; // desired final volume
          bgMusic2.volume = 0; // start from 0 as requested

          // If a saved playback position exists, resume from there
          try {
            const saved = localStorage.getItem('sempurna2_saved')
            const savedTime = parseFloat(localStorage.getItem('sempurna2_time') || '0')
            if (saved && !isNaN(savedTime)) {
              // Some browsers restrict setting currentTime until metadata is loaded
              bgMusic2.addEventListener('loadedmetadata', function trySetTime() {
                try {
                  bgMusic2.currentTime = Math.min(savedTime, bgMusic2.duration || savedTime)
                } catch (e) {
                  console.log('Could not set sempurna2 currentTime:', e)
                }
                bgMusic2.removeEventListener('loadedmetadata', trySetTime)
              })
              // Remove stored values so we don't reuse them repeatedly
              localStorage.removeItem('sempurna2_saved')
              localStorage.removeItem('sempurna2_time')
            }
          } catch (e) {
            console.log('Error reading saved sempurna2 time:', e)
          }

          const fadeInDuration = 1000 // ms
          const fadeInterval = 50
          const fadeSteps = fadeInDuration / fadeInterval
          const fadeStepAmount = targetVolume / fadeSteps

          function startAndFadeIn() {
            bgMusic2.play().then(() => {
              // Gradually increase volume to target
              const fadeTimer = setInterval(() => {
                if (bgMusic2.volume + fadeStepAmount < targetVolume) {
                  bgMusic2.volume = Math.min(targetVolume, bgMusic2.volume + fadeStepAmount)
                } else {
                  bgMusic2.volume = targetVolume
                  clearInterval(fadeTimer)
                }
              }, fadeInterval)
            }).catch(err => {
              console.log('Sempurna2 play failed:', err)
            })
          }

          // Try to start and fade in immediately, fallback to click if autoplay blocked
          startAndFadeIn()
          document.body.addEventListener('click', () => {
            // If user interaction is needed, start fade-in on first click
            if (bgMusic2.paused) startAndFadeIn()
          }, { once: true })
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
