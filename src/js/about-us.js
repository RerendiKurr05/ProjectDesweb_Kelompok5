document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  let currentSlide = 0;

  // BUG: The slides are not arranged in a row, so translateX does not work as expected.
  // FIX: Set slider-wrapper to display flex so slides are in a row.
  if (slider) {
    slider.style.display = "flex";
    slider.style.transition = "transform 0.4s cubic-bezier(.4,2,.3,1)";
    slider.style.willChange = "transform";
  }

  function updateSliderPosition() {
    const slideWidth = slides[0] ? slides[0].clientWidth : 0;
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
      updateSliderPosition();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
      updateSliderPosition();
    });
  }

  window.addEventListener("resize", updateSliderPosition);

  // Initialize position on load
  updateSliderPosition();
});
