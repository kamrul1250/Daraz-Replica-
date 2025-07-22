document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideInterval = setInterval(nextSlide,2000);

  if (totalSlides === 0) {
    console.warn('No slides found!');
    return;
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    console.log('Showing slide', index);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  }

  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
    console.log('Auto slide started');
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
      console.log('Auto slide stopped');
    }
  }

  showSlide(currentIndex);
  startAutoSlide();

  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      console.log('Right arrow clicked');
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  } else {
    console.warn('Right arrow not found!');
  }

  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      console.log('Left arrow clicked');
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  } else {
    console.warn('Left arrow not found!');
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const flashSaleContainer = document.getElementById('flashSaleProducts');
  const flashLeft = document.querySelector('.flash-left');
  const flashRight = document.querySelector('.flash-right');

  if (!flashSaleContainer) return;

  const productWidth = 170; // width of one product card
  const gap = 16;           // gap between cards
  const scrollAmount = productWidth + gap;

  let scrollPosition = 0;
  let maxScroll = flashSaleContainer.scrollWidth - flashSaleContainer.clientWidth;
  let autoSlideInterval;

  function slideNext() {
    scrollPosition += scrollAmount;
    if (scrollPosition > maxScroll) {
      scrollPosition = 0; // loop back to start
    }
    flashSaleContainer.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  }

  function slidePrev() {
    scrollPosition -= scrollAmount;
    if (scrollPosition < 0) {
      scrollPosition = maxScroll; // loop to end
    }
    flashSaleContainer.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  }

  // Auto slide every 4 seconds
  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(slideNext, 2000);
  }

  function stopAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
  }

  // Arrow click events
  if (flashRight) {
    flashRight.addEventListener('click', () => {
      slideNext();
      stopAutoSlide();
      startAutoSlide();
    });
  }

  if (flashLeft) {
    flashLeft.addEventListener('click', () => {
      slidePrev();
      stopAutoSlide();
      startAutoSlide();
    });
  }

  // Update maxScroll on window resize
  window.addEventListener('resize', () => {
    maxScroll = flashSaleContainer.scrollWidth - flashSaleContainer.clientWidth;
  });

  // Start auto sliding
  startAutoSlide();
});
