document.addEventListener("DOMContentLoaded", () => {
  console.log("Структура лендинга загружена");

  const catalogItems = document.querySelectorAll(".catalog-item");
  const modal = document.getElementById("product-modal");
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalContent = document.querySelector(".modal-content");
  const modalClose = document.querySelector(".modal-close");
  const sliderTrack = document.querySelector(".slider-track");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");
  let currentSlide = 0;

  // База товаров
  const products = {
      "classic": {
          title: "Стул «Classic»",
          price: "12 000 руб.",
          size: "45 × 45 × 90 см",
          materials: "Дуб, кожаная обивка",
          legend: "Классический стул, который идеально дополнит интерьер.",
          images: ["img/стул2 ракурс1.jpg", "img/стул2 ракурс1.jpg", "img/стул2 ракурс2.jpg"]
      },
      "modern": {
          title: "Стул «Modern»",
          price: "14 500 руб.",
          size: "50 × 50 × 95 см",
          materials: "Ясень, текстиль",
          legend: "Современный дизайн, удобная посадка и премиальные материалы.",
          images: ["img/stul-modern1.jpg", "img/stul-modern2.jpg", "img/stul-modern3.jpg"]
      },
      "relax": {
          title: "Кресло «Relax»",
          price: "18 900 руб.",
          size: "60 × 70 × 100 см",
          materials: "Орех, бархат",
          legend: "Комфортное кресло для отдыха с мягкой текстильной обивкой.",
          images: ["img/kreslo1.jpg", "img/kreslo2.jpg", "img/kreslo3.jpg"]
      }
  };

  // Функция открытия модального окна
  function openModal(productKey) {
      const product = products[productKey];

      if (product) {
          document.querySelector(".modal-right h2").textContent = product.title;
          document.querySelector(".product-price").textContent = "Цена: " + product.price;
          document.querySelector(".product-size").textContent = "Габариты: " + product.size;
          document.querySelector(".product-materials").textContent = "Материалы: " + product.materials;
          document.querySelector(".product-legend").textContent = product.legend;

          // Очищаем слайды перед добавлением новых
          sliderTrack.innerHTML = "";
          product.images.forEach((imgSrc) => {
              const slide = document.createElement("div");
              slide.classList.add("slide");
              slide.innerHTML = `<img src="${imgSrc}" alt="${product.title}">`;
              sliderTrack.appendChild(slide);
          });

          // Сброс слайдера в начало
          currentSlide = 0;
          updateSlider();

          modal.classList.add("show");
      }
  }

  // Функция закрытия модального окна
  function closeModal() {
      modal.classList.remove("show");
  }

  // Функция обновления слайдера
  function updateSlider() {
      const slides = document.querySelectorAll(".slide");
      if (slides.length > 0) {
          sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      }
  }

  // Открытие модалки по клику на товар
  catalogItems.forEach((item) => {
      item.addEventListener("click", () => {
          const productKey = item.getAttribute("data-product");
          openModal(productKey);
      });
  });

  // Закрытие модалки по крестику
  modalClose.addEventListener("click", closeModal);

  // Закрытие модалки при клике ВНЕ `.modal-content`
  modal.addEventListener("click", (event) => {
      if (!modalContent.contains(event.target)) {
          closeModal();
      }
  });

  // Листание влево
  prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide === 0) ? document.querySelectorAll(".slide").length - 1 : currentSlide - 1;
      updateSlider();
  });

  // Листание вправо
  nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % document.querySelectorAll(".slide").length;
      updateSlider();
  });
});
