'use strict';


const btnDesplazamiento = document.querySelector('.btn--scroll-to');
const seccion1 = document.querySelector('#section--1');
const barraNavegacion = document.querySelector('.main-nav');
const pestañas = document.querySelectorAll('.operations__tab');
const contenedorPestañas = document.querySelector('.operations__tab-container');
const contenidoPestañas = document.querySelectorAll('.operations__content');
const seccionImagenes = document.querySelector('.section-testimonials');

// Establecer el año actual
const añoEl = document.querySelector(".year");
const añoActual = new Date().getFullYear();
añoEl.textContent = añoActual;

// Hacer que la navegación móvil funcione
const btnNavEl = document.querySelector(".btn-mobile-nav");
const encabezadoEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  encabezadoEl.classList.toggle("nav-open");
});

// 1. Agregar event listener al elemento padre común
// 2. Determinar qué elemento originó el evento

document.querySelector('.main-nav-list').addEventListener('click', function (e) {
  // Verificar si el enlace es interno o externo
  const isInternalLink = e.target.classList.contains('main-nav-link') && e.target.getAttribute('href').startsWith('#');

  // Si es un enlace interno, realiza el desplazamiento suave
  if (isInternalLink) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

    // Cerrar la navegación móvil
    encabezadoEl.classList.toggle("nav-open");
  }
  // Si es un enlace externo, la navegación predeterminada ocurrirá
});

// Navegación  
const seccionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(

  function (entradas) {
    const entrada = entradas[0];
    console.log(entrada);

    if (entrada.isIntersecting === false) {
      document.body.classList.add("sticky");
      console.log("el elemento es visible");
    }

    if (entrada.isIntersecting === true) {
      document.body.classList.remove("sticky");
      console.log("el elemento no es visible");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(seccionHeroEl);

// Antigua forma
// const coordenadasIniciales = seccion1.getBoundingClientRect();
// console.log(coordenadasIniciales);

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (window.scrollY > coordenadasIniciales.top) barraNavegacion.classList.add('sticky');
//   else barraNavegacion.classList.remove('sticky');
// });

// Estilos de Cookie
const estilosCookie = `
  .cookie-message {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    background-color: #99e9f2;
    color: #bbb;
    z-index: 303000;
    padding: 10px
  }

  .cookie-message p {
    margin: 0 0 1.6rem;
    font-size: 1.6rem;
    line-height: 1.6;
      color: var(--grey-5);

  }

  .cookie-message button {
  display: inline-block;

  text-decoration: none;
  font-size: 2rem;
  font-weight: 600;
  padding: 1.6rem 3.2rem;
  border-radius: 9px;

  /* Solo necesario para .btn */
  border: none;
  cursor: pointer;
  font-family: inherit;

  /* Poner transición en el "estado" original */
  /* transition: background-color 0.3s; */
  transition: all 0.3s;
  }

  .cookie-message button:hover {
  background-color: var(--color-primario);
  color: #fff;
  }
`;

// Agregar estilos de Cookie
const elementoEstilo = document.createElement('style');
elementoEstilo.textContent = estilosCookie;
document.head.append(elementoEstilo);

// Mensaje de Cookie
const piePagina = document.querySelector('.footer');
const mensaje = document.createElement('div');
const parrafo = document.createElement('p');
mensaje.appendChild(parrafo);
mensaje.classList.add('cookie-message');
parrafo.innerHTML = '¡Bienvenido a [Nombre de tu Sitio]! Utilizamos cookies para ofrecerte una experiencia personalizada, mejorar la funcionalidad y realizar análisis de rendimiento. <button class="btn btn--outline btn--close">¡Entendido!</button>';
barraNavegacion.append(mensaje);

// Cerrar mensaje de Cookie
document.querySelector('.btn--close').addEventListener('click', function () {
  mensaje.parentElement.removeChild(mensaje);
});

// Animación de desvanecimiento del menú
const manejarHover = function (e, opacidad) {
  const enlace = e.target;

  if (enlace.classList.contains('main-nav-link')) {
    const hermanos = enlace.closest('.main-nav').querySelectorAll('.main-nav-link');

    hermanos.forEach(el => {
      if (el !== enlace) el.style.opacity = opacidad;
    });
  }
};

// Pasando "argumento" al controlador
barraNavegacion.addEventListener('mouseover', function (e) {
  manejarHover(e, 0.5)
});
barraNavegacion.addEventListener('mouseout', function (e) {
  manejarHover(e, 1)
});

// Revelar secciones
const todasLasSecciones = document.querySelectorAll('.section');
console.log(todasLasSecciones);
const revelarSeccion = function (entradas, observador) {
  const [entrada] = entradas;

  if (!entrada.isIntersecting) return;

  entrada.target.classList.remove('section--hidden');
  observador.unobserve(entrada.target);
};

const observadorSeccion = new IntersectionObserver(revelarSeccion, {
  root: null,
  threshold: 0.15,
});

todasLasSecciones.forEach(function (seccion) {
  observadorSeccion.observe(seccion);
  seccion.classList.add('section--hidden');
});

// Selecciona todas las imágenes de la galería
const imagenesGaleria = document.querySelectorAll('.gallery-item img');

// Función para manejar el evento hover
const manejarHoverImagenes = function (opacidad) {
  imagenesGaleria.forEach(img => {
    img.style.opacity = opacidad;
  });
};

// Agrega el manejador de eventos a cada imagen de la galería
imagenesGaleria.forEach(img => {
  img.addEventListener('mouseover', function () {
    manejarHoverImagenes(1);
  });

  img.addEventListener('mouseout', function () {
    manejarHoverImagenes(0.5);
  });
});


//Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  //replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');

  });
  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));
