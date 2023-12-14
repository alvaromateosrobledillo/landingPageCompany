
'use strict';


// Seleccionar elementos del DOM

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');



// Configurar el año actual en el footer
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Hacer que la navegación móvil funcione
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// Navegación suave al hacer clic en enlaces internos

document.querySelector('.main-nav-list').addEventListener('click', function (e) {
  // Verificar si el enlace es interno o externo
  const isInternalLink = e.target.classList.contains('main-nav-link') && e.target.getAttribute('href').startsWith('#');

  // Si es un enlace interno, realiza el desplazamiento suave
  if (isInternalLink) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

    // Cerrar la navegación móvil después del desplazamiento
    encabezadoEl.classList.toggle("nav-open");
  }
  // Si es un enlace externo, la navegación predeterminada ocurrirá
});



// Configuración del componente de pestañas (Tabbed Component)


tabsContainer.addEventListener('click', function (e) {
  // Obtener la pestaña clickeada o la más cercana dentro de '.operations__tab'

  const clicked = e.target.closest('.operations__tab');

  // Guard clause: Si no se clickeó una pestaña, salir de la función
  if (!clicked) return;

  // quitar clases activas de todas las pestañas y contenido
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activar la pestaña clickeada añadiendo la clase 'operations__tab--active'



  clicked.classList.add('operations__tab--active');

  // Activar el área de contenido correspondiente usando el atributo 'data-tab'
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});





// Funciones

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;
  // Crear puntos (dots) según la cantidad de slides

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  // Activar el punto correspondiente al slide actual

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  // Mover los slides para simular el cambio de slide

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Función para ir al próximo slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };
  // Función para ir al slide anterior

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  // Inicializar el slider al cargar la página

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Clic en el botón derecho para ir al próximo slide
  btnRight.addEventListener('click', nextSlide);
  // Clic en el botón izquierdo para ir al slide anterior

  btnLeft.addEventListener('click', prevSlide);
  // Evento de teclado: Flecha izquierda para slide anterior, flecha derecha para próximo slide

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
  // Clic en los dots para ir al slide correspondiente

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();



