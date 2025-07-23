// Credenciales válidas
const VALID_CREDENTIALS = {
  username: "cayey",
  password: "cayey",
}

// Elementos del DOM
const loginForm = document.getElementById("loginForm")
const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const loginButton = document.querySelector(".login-button")
const errorMessage = document.getElementById("errorMessage")
const successModal = document.getElementById("successModal")
const buttonLoader = document.getElementById("buttonLoader")

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  // Verificar si ya está autenticado
  if (localStorage.getItem("cayey_authenticated") === "true") {
    redirectToMainPage()
  }

  // Event listeners
  loginForm.addEventListener("submit", handleLogin)
  usernameInput.addEventListener("input", clearError)
  passwordInput.addEventListener("input", clearError)

  // Enfocar el campo de usuario al cargar
  usernameInput.focus()

  // Manejar Enter en los campos
  usernameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      passwordInput.focus()
    }
  })

  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleLogin(e)
    }
  })

  // Animación de entrada para los elementos flotantes
  animateFloatingElements()

  // Efecto de escritura en el título
  typeWriterEffect()
})

// Manejar el login
async function handleLogin(e) {
  e.preventDefault()

  const username = usernameInput.value.trim()
  const password = passwordInput.value.trim()

  // Validación básica
  if (!username || !password) {
    showError("Por favor, complete todos los campos.")
    return
  }

  // Mostrar loading
  showLoading(true)

  // Simular delay de autenticación
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Verificar credenciales
  if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
    handleSuccessfulLogin()
  } else {
    handleFailedLogin()
  }
}

// Login exitoso
function handleSuccessfulLogin() {
  showLoading(false)

  // Guardar estado de autenticación
  localStorage.setItem("cayey_authenticated", "true")
  localStorage.setItem("cayey_login_time", new Date().toISOString())

  // Mostrar modal de éxito
  showSuccessModal()

  // Redirigir después de 3 segundos
  setTimeout(() => {
    redirectToMainPage()
  }, 3000)
}

// Login fallido
function handleFailedLogin() {
  showLoading(false)
  showError("Credenciales incorrectas. Intente nuevamente.")

  // Limpiar campos
  passwordInput.value = ""
  usernameInput.focus()

  // Efecto de shake en el formulario
  loginForm.style.animation = "shake 0.5s ease-in-out"
  setTimeout(() => {
    loginForm.style.animation = ""
  }, 500)
}

// Mostrar/ocultar loading
function showLoading(show) {
  if (show) {
    loginButton.classList.add("loading")
    loginButton.disabled = true
  } else {
    loginButton.classList.remove("loading")
    loginButton.disabled = false
  }
}

// Mostrar error
function showError(message) {
  errorMessage.querySelector("span").textContent = message
  errorMessage.classList.add("show")

  // Ocultar después de 5 segundos
  setTimeout(() => {
    clearError()
  }, 5000)
}

// Limpiar error
function clearError() {
  errorMessage.classList.remove("show")
}

// Mostrar modal de éxito
function showSuccessModal() {
  successModal.style.display = "block"

  // Animar la barra de progreso
  const progressBar = document.querySelector(".loading-progress")
  progressBar.style.animation = "loadingProgress 3s ease-in-out forwards"
}

// Redirigir a la página principal
function redirectToMainPage() {
  // Verificar si existe index.html, sino crear una página de bienvenida
  window.location.href = "index.html"
}

// Toggle password visibility
function togglePassword() {
  const passwordIcon = document.getElementById("passwordIcon")

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    passwordIcon.classList.remove("fa-eye")
    passwordIcon.classList.add("fa-eye-slash")
  } else {
    passwordInput.type = "password"
    passwordIcon.classList.remove("fa-eye-slash")
    passwordIcon.classList.add("fa-eye")
  }
}

// Animación de elementos flotantes
function animateFloatingElements() {
  const elements = document.querySelectorAll(".floating-element")

  elements.forEach((element, index) => {
    element.style.animationDelay = `${index * -2}s`
    element.style.animationDuration = `${6 + index}s`
  })
}

// Efecto de escritura en el título
function typeWriterEffect() {
  const title = document.querySelector(".login-header h2")
  const text = title.textContent
  title.textContent = ""

  let i = 0
  const typeWriter = () => {
    if (i < text.length) {
      title.textContent += text.charAt(i)
      i++
      setTimeout(typeWriter, 100)
    }
  }

  // Iniciar después de un pequeño delay
  setTimeout(typeWriter, 500)
}

// Manejar el enlace "¿Olvidó su contraseña?"
document.querySelector(".forgot-password").addEventListener("click", (e) => {
  e.preventDefault()

  // Mostrar hint de las credenciales
  const hint = document.createElement("div")
  hint.className = "password-hint"
  hint.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
            z-index: 1000;
            text-align: center;
            max-width: 400px;
            width: 90%;
        ">
            <h3 style="color: #2563eb; margin-bottom: 1rem;">💡 Pista de Acceso</h3>
            <p style="color: #64748b; margin-bottom: 1.5rem;">
                Para esta demostración, utilice las siguientes credenciales:
            </p>
            <div style="background: #f1f5f9; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <p><strong>Usuario:</strong> cayey</p>
                <p><strong>Contraseña:</strong> cayey</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #2563eb;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
            ">Entendido</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
        " onclick="this.parentElement.remove()"></div>
    `

  document.body.appendChild(hint)
})

// Función para cerrar sesión (para uso futuro)
function logout() {
  localStorage.removeItem("cayey_authenticated")
  localStorage.removeItem("cayey_login_time")
  window.location.href = "login.html"
}

// Verificar expiración de sesión (24 horas)
function checkSessionExpiration() {
  const loginTime = localStorage.getItem("cayey_login_time")
  if (loginTime) {
    const now = new Date()
    const loginDate = new Date(loginTime)
    const hoursDiff = (now - loginDate) / (1000 * 60 * 60)

    if (hoursDiff > 24) {
      logout()
    }
  }
}

// Verificar sesión cada 5 minutos
setInterval(checkSessionExpiration, 5 * 60 * 1000)

// Manejar visibilidad de la página
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    checkSessionExpiration()
  }
})

// Prevenir ataques de fuerza bruta (simple)
let loginAttempts = 0
const maxAttempts = 5
let lockoutTime = null

function checkLockout() {
  if (lockoutTime && new Date() < lockoutTime) {
    const remainingTime = Math.ceil((lockoutTime - new Date()) / 1000)
    showError(`Demasiados intentos fallidos. Intente nuevamente en ${remainingTime} segundos.`)
    return true
  }
  return false
}

// Modificar handleFailedLogin para incluir el contador de intentos
const originalHandleFailedLogin = handleFailedLogin
handleFailedLogin = () => {
  loginAttempts++

  if (loginAttempts >= maxAttempts) {
    lockoutTime = new Date(Date.now() + 30000) // 30 segundos de bloqueo
    showError("Demasiados intentos fallidos. Cuenta bloqueada temporalmente.")
    return
  }

  originalHandleFailedLogin()
}

// Resetear intentos en login exitoso
const originalHandleSuccessfulLogin = handleSuccessfulLogin
handleSuccessfulLogin = () => {
  loginAttempts = 0
  lockoutTime = null
  originalHandleSuccessfulLogin()
}

console.log("🔐 Sistema de Login Cayey AI - Inicializado")
console.log('💡 Credenciales de demostración: usuario "cayey", contraseña "cayey"')
