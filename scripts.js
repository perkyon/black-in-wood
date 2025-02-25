document.addEventListener('DOMContentLoaded', () => {
  console.log('Структура лендинга загружена');

  const catalogItems = document.querySelectorAll('.catalog-item');
  const modal = document.getElementById('product-modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');

  // Слайдер
  const sliderTrack = document.querySelector('.slider-track');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  let currentSlide = 0;

  // Функция показа модалки
  function openModal() {
    modal.classList.add('show');
  }

  // Функция скрытия модалки
  function closeModal() {
    modal.classList.remove('show');
  }

  // Навешиваем клики на товары
  catalogItems.forEach(item => {
    item.addEventListener('click', () => {
      // Можно тут подставлять разные данные в модалку
      // в зависимости от data-product и т.д.
      openModal();
    });
  });

  // Закрытие по оверлею
  modalOverlay.addEventListener('click', closeModal);
  // Закрытие по кнопке
  modalClose.addEventListener('click', closeModal);

  // Слайдер-логика
  function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide <= 0) ? slides.length - 1 : currentSlide - 1;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  });

});
