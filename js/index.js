const title = document.querySelector('.title')

// Array of texts to display in sequence
const texts = [
  'Hi kakkk',
  'Ada beberapa hal',
  'Yang perlu saya ungkapkan',
  'Entah mengapa setiap kali',
  'Melihatmu sorot mataku selalu jujur',
  'Untuk melihatmu dengan',
  'Kekaguman yang membisu',
  'Billions of eyes, but I only want to look in yours'
]

// Create container for better responsive layout
title.style.display = 'flex'
title.style.flexWrap = 'wrap'
title.style.justifyContent = 'center'
title.style.gap = '0.5rem'
title.style.alignContent = 'center'
title.style.alignItems = 'center'
title.style.padding = '0 20px'
title.style.cursor = 'pointer'
title.style.wordBreak = 'keep-all'
title.style.whiteSpace = 'normal'

let currentTextIndex = 0
let isAnimating = false
let canClick = false

// Auto-start background music with fade in effect
window.addEventListener('load', () => {
  const bgMusic = document.getElementById('backgroundMusic')
  if (bgMusic) {
  bgMusic.volume = 0 // Start from 0 volume
  const targetVolume = 0.8 // Target volume 80% (increased per request)
    
    // Ensure seamless looping by using the 'ended' event
    bgMusic.addEventListener('ended', function() {
      this.currentTime = 0
      this.play()
    }, false)
    
    // Set preload to auto for seamless playback
    bgMusic.preload = 'auto'
    
    // Try to play, if blocked by browser, will play on first interaction
    bgMusic.play().then(() => {
      // Fade in effect
      const fadeInInterval = setInterval(() => {
        if (bgMusic.volume < targetVolume - 0.01) {
          bgMusic.volume = Math.min(targetVolume, bgMusic.volume + 0.01)
        } else {
          bgMusic.volume = targetVolume
          clearInterval(fadeInInterval)
        }
      }, 100) // Increase volume every 100ms
    }).catch(e => {
      console.log('Autoplay blocked, will play on first interaction')
      // Fallback: play on first click if autoplay is blocked
      document.body.addEventListener('click', () => {
        bgMusic.play().then(() => {
          // Fade in effect on first click
          const fadeInInterval = setInterval(() => {
            if (bgMusic.volume < targetVolume - 0.01) {
              bgMusic.volume = Math.min(targetVolume, bgMusic.volume + 0.01)
            } else {
              bgMusic.volume = targetVolume
              clearInterval(fadeInInterval)
            }
          }, 100)
        }).catch(err => console.log('Music play failed:', err))
      }, { once: true })
    })
  }
})

function showText(textIndex) {
  if (textIndex >= texts.length) {
    // All texts shown, redirect to flower page
    title.style.transition = 'opacity 1s ease-out';
    title.style.opacity = '0';
    
    setTimeout(() => {
      window.location.href = 'flower.html';
    }, 1000);
    
    isAnimating = false
    canClick = false
    return;
  }
  
  isAnimating = true
  canClick = false
  const words = texts[textIndex].split(' ')
  title.innerHTML = ''
  
  // Check if this is the last special text
  const isLastText = textIndex === texts.length - 1
  
  // Adjust gap based on text length
  if (texts[textIndex].length > 25) {
    title.style.gap = '0.2rem' // Smaller gap for longer text
  } else {
    title.style.gap = '0.5rem' // Normal gap for shorter text
  }
  
  if (isLastText) {
    // Special styling for last text
    const isMobile = window.innerWidth < 768
    title.style.fontSize = isMobile ? '1rem' : '1.5rem'
    title.style.fontWeight = 'bold'
    title.style.textShadow = '0 0 30px rgba(255, 255, 255, 1), 0 0 40px rgba(147, 51, 234, 0.8)'
    title.style.letterSpacing = isMobile ? '2px' : '3px'
    
    // Lower background music volume for last text
    const bgMusic = document.getElementById('backgroundMusic')
    if (bgMusic) {
      bgMusic.volume = 0.05 // Reduce to 5% for last text
    }
    
    // Create typing effect for the whole sentence
    const fullText = texts[textIndex]
    const textSpan = document.createElement('span')
    textSpan.style.whiteSpace = 'pre-wrap'
    textSpan.style.textAlign = 'center'
    textSpan.className = `special-text-${textIndex}`
    title.appendChild(textSpan)
    
    // Get and play typewriter sound with higher volume
    const typewriterSound = document.getElementById('typewriterSound')
    if (typewriterSound) {
      typewriterSound.volume = 0.8 // Increase to 80% for more prominent effect
      typewriterSound.currentTime = 0 // Start from beginning
      typewriterSound.play().catch(e => console.log('Audio play failed:', e))
    }
    
    let charIndex = 0
    const typingInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        textSpan.textContent += fullText[charIndex]
        charIndex++
      } else {
        clearInterval(typingInterval)
        // Stop typewriter sound when typing completes
        if (typewriterSound) {
          typewriterSound.pause()
          typewriterSound.currentTime = 0
        }
        // Enable click after typing completes
        setTimeout(() => {
          canClick = true
        }, 500)
      }
    }, 80) // 80ms per character for typing effect
    
  } else {
    // Normal text styling
    title.style.fontSize = ''
    title.style.fontWeight = ''
    title.style.textShadow = '0 0 20px white'
    title.style.letterSpacing = ''
    
    // Add words (each word wrapped to prevent breaking)
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span')
      wordSpan.style.display = 'inline-flex'
      wordSpan.style.whiteSpace = 'nowrap'
      
      // Add characters for each word
      for (let charIndex = 0; charIndex < word.length; charIndex++) {
        const charSpan = document.createElement('span')
        charSpan.textContent = word[charIndex]
        charSpan.className = `text-${textIndex}`
        const randomDelay = Math.random() * 2
        charSpan.style.setProperty('--delay', `${randomDelay}s`)
        charSpan.style.opacity = '0'
        charSpan.style.animation = `typing 1s ease forwards`
        charSpan.style.animationDelay = `${randomDelay}s`
        wordSpan.appendChild(charSpan)
      }
      
      title.appendChild(wordSpan)
      
      // Add space between words (except after last word)
      if (wordIndex < words.length - 1) {
        const spaceSpan = document.createElement('span')
        spaceSpan.style.width = '0.5rem'
        spaceSpan.style.display = 'inline-block'
        title.appendChild(spaceSpan)
      }
    })
    
    // Enable click after animation completes
    setTimeout(() => {
      canClick = true
    }, 2000) // Wait for animation to complete
  }
}

function skipToNext() {
  if (!canClick || currentTextIndex >= texts.length) return;
  
  canClick = false
  
  // Check if this is the last text
  const isLastText = currentTextIndex === texts.length - 1
  
  if (isLastText) {
    // Special fade out for last text before redirecting to flower page
    const specialText = document.querySelector(`.special-text-${currentTextIndex}`);
    if (specialText) {
      specialText.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out';
      specialText.style.opacity = '0';
      specialText.style.transform = 'scale(0.8) translateY(-20px)';
    }
    
    // Fade out Sempurna17 and fade in Sempurna2 at the same time
    const bgMusic = document.getElementById('backgroundMusic')
    const bgMusic2 = document.getElementById('backgroundMusic2')
    
    if (bgMusic) {
      // Only fade out Sempurna17 here. Do NOT start Sempurna2 on this page.
  const transitionDuration = 400 // 0.4 seconds (shorter fade-out)
  const intervalTime = 50 // Update every 50ms
      const steps = transitionDuration / intervalTime
      const fadeOutStep = bgMusic.volume / steps

      const musicFadeOutInterval = setInterval(() => {
        if (bgMusic.volume > fadeOutStep) {
          bgMusic.volume = Math.max(0, bgMusic.volume - fadeOutStep)
        } else {
          bgMusic.volume = 0
          bgMusic.pause()
          clearInterval(musicFadeOutInterval)
        }
      }, intervalTime)

      // Before redirecting, mark that Sempurna2 should start on flower page
      // but do not play it here. Save time=0 so flower page will start from beginning.
      setTimeout(() => {
        try {
          localStorage.setItem('sempurna2_saved', '1')
          localStorage.setItem('sempurna2_time', '0')
        } catch (e) {
          console.log('Could not save sempurna2 flag:', e)
        }

        try {
          // Remove and unload Sempurna17 to free resources
          bgMusic.pause()
          bgMusic.src = ''
          bgMusic.load()
          if (bgMusic.parentNode) bgMusic.parentNode.removeChild(bgMusic)
        } catch (e) {
          console.log('Error removing Sempurna17 element:', e)
        }

        window.location.href = 'flower.html';
      }, transitionDuration); // Wait for transitionDuration (1.5s)
    } else {
      // If one of the tracks is missing, still redirect after the same delay
      setTimeout(() => {
        window.location.href = 'flower.html';
      }, 1500);
    }
    
  } else {
    // Normal fade out for other texts
    const textElements = document.querySelectorAll(`.title span.text-${currentTextIndex}`);
    textElements.forEach((element) => {
      element.style.transition = 'opacity 0.5s ease-out';
      element.style.opacity = '0';
    });
    
    // Show next text
    setTimeout(() => {
      currentTextIndex++;
      showText(currentTextIndex);
    }, 500);
  }
}

// Add click event to skip to next text
document.body.addEventListener('click', skipToNext);

// Start the sequence
showText(0);