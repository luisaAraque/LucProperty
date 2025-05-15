

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);
 /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;

    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    // ✅ Botones (Todos, Venta, Arriendo)
    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Clase activa
        isotopeItem.querySelector('.filter-active')?.classList.remove('filter-active');
        this.classList.add('filter-active');

        // 🔁 Limpiar todos los selects
        isotopeItem.querySelectorAll('.filtro').forEach(select => select.value = "");

        // Filtro por botón
        const filtro = this.getAttribute('data-filter');
        initIsotope.arrange({ filter: filtro });

        if (typeof aosInit === 'function') aosInit();
      });
    });

    // ✅ Selects múltiples con clase .filtro (ciudad, tipo, etc.)
    isotopeItem.querySelectorAll('.filtro').forEach(function (select) {
      select.addEventListener('change', function () {
        // Quitar botón activo (como "Todos")
        isotopeItem.querySelector('.filter-active')?.classList.remove('filter-active');

        // 🔁 Construir filtro combinado de todos los selects
        let filtroFinal = '';
        isotopeItem.querySelectorAll('.filtro').forEach(function (s) {
          if (s.value) filtroFinal += s.value;
        });

        // Si no hay filtros, mostrar todo
        initIsotope.arrange({ filter: filtroFinal || '*' });

        if (typeof aosInit === 'function') aosInit();
      });
    });
  });
  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });
  
  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

function openTab(tab){
  const tabTotal = document.getElementsByClassName('tab-contents');
  const tabLink = document.getElementsByClassName('tab-link');

  for (let index = 0; index < tabTotal.length; index++) {
    tabTotal[index].classList.remove('active-tab');
    tabLink[index].classList.remove('active-link');
  }

  const activo=document.getElementById(tab);
  activo.classList.add("active-tab");
  const link=document.getElementById(tab+"1");  
  link.classList.add('active-link');
  
}

document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname.includes('portfolio-details.html')) {
  }
});

function guardarClick(id){
  localStorage.setItem('idPropiedad', id);
}

document.addEventListener('DOMContentLoaded', function () {
  
  if (document.getElementById('nombre')) {
  const idGuardado = parseInt(localStorage.getItem('idPropiedad'));
  let valores =[] ;
  propiedades.forEach(element => {
    if(element.id === idGuardado){ 
        document.getElementById('nombre').textContent=element.nombre;
        document.getElementById('estado').textContent=element.estado;
        document.getElementById('tipo').textContent=element.tipo;
        document.getElementById('ciudad').textContent=element.ciudad;
        document.getElementById('barrio').textContent=element.barrio;
        document.getElementById('precio').textContent=element.precio;
        document.getElementById('area').textContent=element.area;
        document.getElementById('habitaciones').textContent=element.habitaciones;
        document.getElementById('direccion').textContent=element.direccion;
        document.getElementById('banos').textContent=element.banos;
        document.getElementById('amoblado').textContent=element.amoblado;
        document.getElementById('piscina').textContent=element.piscina;
        document.getElementById('parqueadero').textContent=element.parqueadero;

        for (let i = 0; i < element.url.length; i++) {
          document.getElementById(`img-propiedad${i}`).src=element.url[i];
        }

        let telefono =`https://wa.me/57${element.telefono}?text=Hola%2C%20estoy%20interesado%20en%20una%20propiedad`;
        document.getElementById('telefono').href = telefono;
        document.getElementById('whatsapp-text').textContent = element.telefono
      }
    });
  } 
});
