document.addEventListener('DOMContentLoaded', () => {
  const loginScreen = document.getElementById('loginScreen');
  const mainContainer = document.getElementById('mainContainer');
  const accessBtn = document.getElementById('accessBtn');
  const terminalBody = document.querySelector('.terminal-body');

  // Mostrar pantalla de login primero
  loginScreen.style.display = 'block';
  mainContainer.style.display = 'none';

  // Usuario autorizado
  const USUARIO_AUTORIZADO = "Magdalena Inalaf G.";
  let countdownTimer;
  let sessionTimeout;

  // Simular autenticación
  accessBtn.addEventListener('click', () => {
    // Efecto de autenticación
    accessBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> VERIFICANDO...';
    accessBtn.disabled = true;

    // Simular retardo de autenticación
    setTimeout(() => {
      grantAccess();
    }, 2000);
  });

  // Acceso concedido
  function grantAccess() {
    loginScreen.style.opacity = '0';
    loginScreen.style.transition = 'opacity 1s ease-out';

    setTimeout(() => {
      loginScreen.style.display = 'none';
      mainContainer.style.display = 'block';

      setTimeout(() => {
        mainContainer.style.opacity = '1';
        startSessionTimer(); // Iniciar temporizador de sesión
      }, 50);
    }, 1000);
  }

  // Temporizador de sesión (5 segundos)
  function startSessionTimer() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
      // Mostrar advertencia de seguridad
      showSecurityWarning();
    }, 5000); // 5 segundos
  }

  // Mostrar advertencia de seguridad
  function showSecurityWarning() {
    // Pausar el temporizador mientras se muestra la advertencia
    clearTimeout(sessionTimeout);

    // Crear overlay de seguridad
    const securityOverlay = document.createElement('div');
    securityOverlay.id = 'securityOverlay';
    securityOverlay.innerHTML = `
      <div class="security-alert">
        <div class="alert-header">
          <i class="fas fa-exclamation-triangle"></i>
          <h3>ALERTA DE SEGURIDAD</h3>
        </div>
        <div class="alert-body">
          <p>Hemos identificado que NO eres <strong>${USUARIO_AUTORIZADO}</strong></p>
          <p>Este archivo se cerrará en <span id="logoutCountdown">3</span> segundos</p>
        </div>
        <div class="alert-footer">
          <button id="authBtn"><i class="fas fa-fingerprint"></i> SOY ${USUARIO_AUTORIZADO.split(' ')[0].toUpperCase()}</button>
        </div>
      </div>
    `;
    document.body.appendChild(securityOverlay);

    // Contador regresivo
    let seconds = 3;
    const countdown = setInterval(() => {
      document.getElementById('logoutCountdown').textContent = seconds;
      seconds--;

      if (seconds < 0) {
        clearInterval(countdown);
        closeSession();
      }
    }, 1000);

    // Botón de autenticación (solo para demostración)
    document.getElementById('authBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      // Aquí iría la lógica real de autenticación
      alert(`Acceso permitido para ${USUARIO_AUTORIZADO}`);
      securityOverlay.remove();
      startSessionTimer(); // Reiniciar temporizador
    });
  }

  // Cerrar sesión
  function closeSession() {
    document.getElementById('securityOverlay')?.remove();
    mainContainer.style.animation = 'fadeOut 0.5s forwards';

    setTimeout(() => {
      mainContainer.style.display = 'none';
      loginScreen.style.display = 'block';
      loginScreen.style.opacity = '1';

      // Resetear terminal
      terminalBody.innerHTML = `
        <p class="typewriter">> Sistema reiniciado...</p>
        <p class="typewriter delay-1">> Protocolos de seguridad reactivados...</p>
        <p class="typewriter delay-2">> ¿DESEA ACCEDER A ARCHIVOS CLASIFICADOS?</p>
        <div class="access-control">
          <div class="lock-container">
            <i class="fas fa-lock"></i>
            <div class="lock-shadow"></div>
          </div>
          <button class="access-btn" id="accessBtn">
            <span>CONFIRMAR IDENTIDAD</span>
            <i class="fas fa-fingerprint"></i>
          </button>
        </div>
      `;

      // Reasignar event listener
      document.getElementById('accessBtn').addEventListener('click', () => {
        accessBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> VERIFICANDO...';
        accessBtn.disabled = true;

        setTimeout(() => {
          grantAccess();
        }, 2000);
      });
    }, 500);
  }

  // Datos de los superhéroes
  const superheroes = {
    voltman: {
      nombre: "Voltman",
      edad: Math.round(Math.random() * (40 - 20) + 20),
      habilidades: ["Volar", "Invisibilidad", "Súper fuerza", "Manipulación eléctrica"],
      activo: true,
      nivelEnergia: [75, 90],
      saludo: function() {
        return `Hola, soy ${this.nombre} y tengo ${this.edad} años.`;
      },
      bio: "Científico transformado por un accidente con electricidad. Protege la ciudad desde 2015.",
      archivoSecreto: "Nivel 4 - Acceso restringido"
    },
    shadowcat: {
      nombre: "Shadowcat",
      edad: Math.round(Math.random() * (40 - 20) + 20),
      habilidades: ["Pasar por paredes", "Camuflaje", "Agilidad mejorada", "Combate cuerpo a cuerpo"],
      activo: true,
      nivelEnergia: [85, 95],
      saludo: function() {
        return `Soy ${this.nombre}, lista para la misión. Edad: ${this.edad}.`;
      },
      bio: "Ex agente especial entrenada en artes marciales y tecnología de sigilo. Operaciones encubiertas.",
      archivoSecreto: "Nivel 5 - Solo para ojos"
    },
    titan: {
      nombre: "Titan",
      edad: Math.round(Math.random() * (40 - 20) + 20),
      habilidades: ["Super fuerza", "Resistencia extrema", "Regeneración", "Inmunidad al calor"],
      activo: false,
      nivelEnergia: [95, 110],
      saludo: function() {
        return `${this.nombre} aquí. Edad: ${this.edad}. Estado: ${this.activo ? 'Activo' : 'Inactivo'}`;
      },
      bio: "Ser de origen desconocido con capacidades sobrehumanas. Actualmente en estado criogénico.",
      archivoSecreto: "Nivel 6 - Máxima seguridad"
    }
  };

  const heroBtns = document.querySelectorAll('.hero-btn');
  const heroCard = document.getElementById('superheroCard');
  const heroName = document.getElementById('heroName');
  const heroContent = document.getElementById('heroContent');
  const statusLight = document.querySelector('.status-light');

  heroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const heroId = btn.getAttribute('data-hero');
      const hero = superheroes[heroId];

      heroBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const primeraLetra = hero.nombre.charAt(0).toUpperCase();
      const maxEnergia = Math.max(...hero.nivelEnergia);
      const nombreObjeto = new String(hero.nombre);
      const esObjeto = nombreObjeto instanceof String;
      const esPrimitivo = typeof hero.nombre === "string";

      heroName.textContent = hero.nombre.toUpperCase();
      statusLight.style.backgroundColor = hero.activo ? '#00ff00' : '#ff0000';
      statusLight.style.boxShadow = hero.activo ? '0 0 10px #00ff00' : '0 0 10px #ff0000';

      heroContent.innerHTML = `
        <p class="flicker">${hero.saludo()}</p>
        <p><strong>Bio:</strong> ${hero.bio}</p>
        <p><strong>Habilidades:</strong></p>
        <div class="abilities">
          ${hero.habilidades.map(hab => `<span class="ability">${hab}</span>`).join('')}
        </div>

        <div class="stats">
          <div class="stat">
            <div class="stat-value">${hero.edad}</div>
            <div class="stat-label">EDAD</div>
          </div>
          <div class="stat">
            <div class="stat-value">${maxEnergia}</div>
            <div class="stat-label">ENERGÍA</div>
          </div>
          <div class="stat">
            <div class="stat-value">${primeraLetra}</div>
            <div class="stat-label">INICIAL</div>
          </div>
        </div>

        <hr />

        <p><strong>Edad aleatoria asignada:</strong> ${hero.edad}</p>
        <p><strong>Primera letra del nombre:</strong> ${primeraLetra}</p>
        <p><strong>Máximo nivel de energía:</strong> ${maxEnergia}</p>
        <p><strong>¿Nombre como objeto?:</strong> ${esObjeto}</p>
        <p><strong>¿Nombre primitivo?:</strong> ${esPrimitivo}</p>

        <p class="secret"><strong>Archivo secreto:</strong> <span class="classified">${hero.archivoSecreto}</span></p>
      `;

      heroCard.style.display = "block";

      // Reiniciar temporizador cada vez que se consulta un héroe
      startSessionTimer();
    });
  });

  // Mostrar primer héroe por defecto
  setTimeout(() => {
    if (heroBtns.length > 0) {
      heroBtns[0].click();
    }
  }, 500);
});
