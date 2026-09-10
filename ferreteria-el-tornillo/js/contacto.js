/**
 * Ferretería El Tornillo - Lógica de Interacción y Validaciones
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menú Móvil
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-btn');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Cerrar menú móvil al hacer clic en cualquier enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Validación y Envío del Formulario
  const contactForm = document.getElementById('contact-form');
  const nombreInput = document.getElementById('nombre');
  const mensajeInput = document.getElementById('mensaje');
  const nombreError = document.getElementById('nombre-error');
  const mensajeError = document.getElementById('mensaje-error');
  const formAlert = document.getElementById('form-alert');

  /**
   * Muestra un mensaje global en el banner superior del formulario
   * @param {string} text - Texto del mensaje
   * @param {'error'|'success'} type - Tipo de alerta
   */
  function showAlert(text, type) {
    if (!formAlert) return;
    formAlert.textContent = text;
    formAlert.className = `alert-banner alert-${type}`;
    formAlert.classList.remove('hidden');
  }

  /**
   * Oculta el banner de alerta
   */
  function hideAlert() {
    if (!formAlert) return;
    formAlert.textContent = '';
    formAlert.className = 'alert-banner hidden';
  }

  /**
   * Limpia los errores visuales del campo nombre
   */
  function clearNombreError() {
    if (nombreInput) {
      nombreInput.classList.remove('is-invalid');
    }
    if (nombreError) {
      nombreError.textContent = '';
      nombreError.classList.add('hidden');
    }
  }

  /**
   * Limpia los errores visuales del campo mensaje
   */
  function clearMensajeError() {
    if (mensajeInput) {
      mensajeInput.classList.remove('is-invalid');
    }
    if (mensajeError) {
      mensajeError.textContent = '';
      mensajeError.classList.add('hidden');
    }
  }

  // Limpieza reactiva mientras el usuario escribe en el campo nombre
  if (nombreInput) {
    nombreInput.addEventListener('input', () => {
      const val = nombreInput.value.trim();
      if (val.length >= 2) {
        clearNombreError();
        if (formAlert && formAlert.classList.contains('alert-error')) {
          hideAlert();
        }
      }
    });
  }

  // Limpieza reactiva para el campo mensaje
  if (mensajeInput) {
    mensajeInput.addEventListener('input', () => {
      if (mensajeInput.value.trim().length > 0) {
        clearMensajeError();
      }
    });
  }

  // Manejo del evento de envío
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombreValue = nombreInput ? nombreInput.value.trim() : '';
      const mensajeValue = mensajeInput ? mensajeInput.value.trim() : '';

      let hasError = false;

      // Validación del nombre: Mínimo 2 caracteres requeridos
      if (nombreValue.length === 0) {
        hasError = true;
        const msg = 'Por favor ingresa tu nombre completo antes de enviar.';
        showAlert(msg, 'error');
        if (nombreInput) nombreInput.classList.add('is-invalid');
        if (nombreError) {
          nombreError.textContent = 'El nombre es obligatorio. Por favor completa este campo.';
          nombreError.classList.remove('hidden');
        }
        if (nombreInput) nombreInput.focus();
      } else if (nombreValue.length < 2) {
        hasError = true;
        const msg = 'El nombre ingresado es muy corto (debe tener al menos 2 caracteres).';
        showAlert(msg, 'error');
        if (nombreInput) nombreInput.classList.add('is-invalid');
        if (nombreError) {
          nombreError.textContent = 'El nombre debe tener al menos 2 caracteres.';
          nombreError.classList.remove('hidden');
        }
        if (nombreInput) nombreInput.focus();
      } else {
        clearNombreError();
      }

      // Validación complementaria del mensaje
      if (!hasError && mensajeValue.length === 0) {
        hasError = true;
        const msg = 'Por favor escribe tu consulta o los materiales que requieres.';
        showAlert(msg, 'error');
        if (mensajeInput) {
          mensajeInput.classList.add('is-invalid');
          mensajeInput.focus();
        }
        if (mensajeError) {
          mensajeError.textContent = 'El mensaje no puede estar vacío.';
          mensajeError.classList.remove('hidden');
        }
      } else if (!hasError) {
        clearMensajeError();
      }

      // Si todo es válido, mostrar éxito y reiniciar formulario
      if (!hasError) {
        clearNombreError();
        clearMensajeError();

        const successText = `¡Muchas gracias, ${nombreValue}! Tu mensaje ha sido recibido con éxito. Nos pondremos en contacto contigo a la brevedad.`;
        showAlert(successText, 'success');

        // Resetear campos del formulario
        contactForm.reset();

        // Asegurar que el banner de éxito sea visible
        formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // 3. Resaltar enlace de navegación activo al hacer scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (activeLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links .nav-link').forEach(l => l.classList.remove('active'));
        if (activeLink.classList.contains('nav-link')) {
          activeLink.classList.add('active');
        }
      }
    });
  }, { passive: true });
});
