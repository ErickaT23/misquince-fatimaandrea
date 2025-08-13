// Función para abrir la invitación (sobre) y reproducir la música
function abrirInvitacion() {
    // Obtener el sobre y la invitación
    const envelope = document.getElementById('envelope');
    const invitacion = document.getElementById('invitacion');
    
    // Añadir clase para animar la apertura del sobre
    envelope.classList.add('open');

    // Mostrar la invitación después de la animación
    setTimeout(() => {
        envelope.style.display = 'none';
        invitacion.style.display = 'block';
        
        // Reproducir la música solo después de abrir el sobre
        const musica = document.getElementById('musica');
        if (musica) {
            musica.play();
        }
    }, 1000); // Ajustar tiempo para esperar la animación de apertura del sobre
}

// Asignar el evento de clic al sello para abrir el sobre
document.addEventListener('DOMContentLoaded', function() {
    const seal = document.getElementById('seal');
    if (seal) {
        seal.addEventListener('click', abrirInvitacion);
    }

    // Iniciar el contador y cargar los datos del invitado al cargar la página
    iniciarContador();
    cargarDatosInvitado();
});

// Función para obtener datos de invitados (sin inputs)
function cargarDatosInvitado() {
    const params = new URLSearchParams(window.location.search);
    const invitadoId = params.get('id');
  
    if (!invitadoId) {
      alert('ID de invitado no encontrado en el enlace.');
      return;
    }
  
    const invitado = (window.invitados || {})[invitadoId];
  
    if (!invitado) {
      alert('Invitado no encontrado.');
      return;
    }
  
    const elNombre = document.getElementById('nombreInvitado');
    const elPases  = document.getElementById('cantidadPases');
  
    // Mostrar/ocultar nombre
    if (elNombre) {
      const nombre = (invitado.nombre || '').trim();
      if (nombre && nombre.toLowerCase() !== 'sin nombre') {
        elNombre.innerText = nombre;
        elNombre.style.removeProperty('display'); // por si antes se ocultó
      } else {
        elNombre.style.display = 'none';
      }
    }
  
    // Mostrar pases (con fallback seguro)
    if (elPases) {
      const pasesNum = Number(invitado.pases);
      elPases.innerText = `Pases: ${Number.isFinite(pasesNum) ? pasesNum : 1}`;
      elPases.style.removeProperty('display');
    }
  }
  

// Función para iniciar el contador de la fecha del evento
function iniciarContador() {
    const eventoFecha = new Date("October 4, 2025 17:00:00").getTime();

    setInterval(() => {
        const ahora = new Date().getTime();
        const diferencia = eventoFecha - ahora;

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById("dias").innerText = dias;
        document.getElementById("horas").innerText = horas;
        document.getElementById("minutos").innerText = minutos;
        document.getElementById("segundos").innerText = segundos;
    }, 1000);
}

// Función para abrir el lightbox solo al hacer clic en una imagen de la galería
function changePhoto(element) {
    const mainPhotoModal = document.getElementById('main-photo-modal');

    // Establecer la imagen del modal como la imagen seleccionada
    mainPhotoModal.src = element.src;

    // Mostrar el modal
    openModal();
}

// Función para mostrar el modal
function openModal() {
    const modal = document.getElementById('photo-modal');
    modal.style.display = 'flex'; // Usar 'flex' para centrar la imagen en pantalla
}

// Función para cerrar el modal
function closeModal(event) {
    // Cerrar el modal solo si el clic no fue en la imagen
    if (event.target.id === 'photo-modal' || event.target.className === 'close') {
        const modal = document.getElementById('photo-modal');
        modal.style.display = 'none';
    }
}

// Fade-in effect cuando los elementos se hacen visibles al hacer scroll
document.addEventListener("DOMContentLoaded", function() {
    const elementsToFade = document.querySelectorAll('.fade-in-element');

    const observerOptions = {
        threshold: 0.5, // El porcentaje del elemento que debe ser visible antes de activar la animación
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Deja de observar una vez que la animación se activa
            }
        });
    }, observerOptions);

    elementsToFade.forEach(element => {
        observer.observe(element);
    });
});

//Funcion para confirmar la asistencia 
function confirmarAsistencia() {
    // 1) Leer del DOM
    const nombre = document.getElementById('nombreInvitado')?.innerText?.trim() || 'Invitado';
    const pasesText = document.getElementById('cantidadPases')?.innerText || '';
    const match = pasesText.match(/(\d+)/);
    const pases = match ? parseInt(match[1], 10) : 1;
  
    // 2) IDs reales del Form
    const FORM = {
      base: 'https://docs.google.com/forms/d/e/1FAIpQLSfZBEOTTsv8iFlTjYDWNA4lHl1EqfwP2S5f3jXsGey9MObHDQ/viewform',
      entries: {
        nombre: '1297710131',
        pases:  '1099367965'
      }
    };
  
    // 3) Armar URL con prefill
    const params = new URLSearchParams({ usp: 'pp_url' });
    params.set(`entry.${FORM.entries.nombre}`, nombre);
    params.set(`entry.${FORM.entries.pases}`, String(pases));
  
    const url = `${FORM.base}?${params.toString()}`;
    window.open(url, '_blank');
  }
  
//Funcion para abrir waze o maps
//fiesta
function elegirAplicacionOtraDireccion() {
    const enlaceGoogleMaps = 'https://maps.app.goo.gl/GjZMJJ3eLStnJeZC7';
    const enlaceWaze = 'https://waze.com/ul/h9fxdd7sxd';

    // Intentar abrir Google Maps primero
    window.open(enlaceGoogleMaps, '_blank');

    // Intentar abrir Waze (en caso de que Google Maps no esté disponible)
    setTimeout(() => {
        window.open(enlaceWaze, '_blank');
    }, 1000); // Retraso para permitir que el primer enlace se abra si está disponible
}
