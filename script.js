// Navegación móvil
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Toggle del menú móvil
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Cerrar menú al hacer click en un enlace
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Smooth scrolling para navegación
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Ajuste para navbar fijo
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Navbar transparente en scroll
  const navbar = document.querySelector(".navbar")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      navbar.style.background = "rgba(37, 99, 235, 0.98)"
      navbar.style.backdropFilter = "blur(15px)"
    } else {
      navbar.style.background = "rgba(37, 99, 235, 0.95)"
      navbar.style.backdropFilter = "blur(10px)"
    }

    // Ocultar/mostrar navbar en scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })

  // Animaciones de entrada
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observar elementos con animaciones
  const animatedElements = document.querySelectorAll("[data-aos]")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    observer.observe(el)
  })

  // Contador animado para estadísticas
  function animateCounter(element, target, duration = 2000) {
    let start = 0
    const increment = target / (duration / 16)

    function updateCounter() {
      start += increment
      if (start < target) {
        element.textContent = Math.floor(start)
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target
      }
    }

    updateCounter()
  }

  // Activar contadores cuando sean visibles
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector(".stat-number")
          const targetValue = Number.parseInt(statNumber.textContent)
          animateCounter(statNumber, targetValue)
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  document.querySelectorAll(".stat").forEach((stat) => {
    statsObserver.observe(stat)
  })

  // Animación de barras de progreso
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll(".metric-fill, .timeline-progress")
          progressBars.forEach((bar) => {
            const width = bar.style.width
            bar.style.width = "0%"
            setTimeout(() => {
              bar.style.width = width
            }, 200)
          })
          progressObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 },
  )

  document.querySelectorAll(".platform-card, .timeline-row").forEach((card) => {
    progressObserver.observe(card)
  })

  // Efecto parallax sutil para el hero
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".hero")
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  })

  // Tooltip para métricas
  const metrics = document.querySelectorAll(".metric")
  metrics.forEach((metric) => {
    const label = metric.querySelector(".metric-label").textContent
    const fill = metric.querySelector(".metric-fill")
    const percentage = fill.style.width

    metric.addEventListener("mouseenter", function () {
      const tooltip = document.createElement("div")
      tooltip.className = "tooltip"
      tooltip.textContent = `${label}: ${percentage}`
      tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 0.5rem;
                border-radius: 4px;
                font-size: 0.875rem;
                z-index: 1000;
                pointer-events: none;
                transform: translateX(-50%);
                white-space: nowrap;
            `

      this.appendChild(tooltip)

      const rect = this.getBoundingClientRect()
      tooltip.style.left = "50%"
      tooltip.style.top = "-40px"
    })

    metric.addEventListener("mouseleave", function () {
      const tooltip = this.querySelector(".tooltip")
      if (tooltip) {
        tooltip.remove()
      }
    })
  })

  // Lazy loading para imágenes
  const images = document.querySelectorAll('img[src*="placeholder"]')
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.style.opacity = "0"
        img.style.transition = "opacity 0.3s ease"

        setTimeout(() => {
          img.style.opacity = "1"
        }, 100)

        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  // Efecto de escritura para el título principal
  function typeWriter(element, text, speed = 100) {
    let i = 0
    element.textContent = ""

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i)
        i++
        setTimeout(type, speed)
      }
    }

    type()
  }

  // Activar efecto de escritura cuando el hero sea visible
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              typeWriter(heroTitle, originalText, 80)
            }, 500)
            heroObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    heroObserver.observe(heroTitle)
  }

  // Funcionalidad de búsqueda rápida (opcional)
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "f") {
      e.preventDefault()
      const searchTerm = prompt("Buscar en la página:")
      if (searchTerm) {
        const sections = document.querySelectorAll("section")
        sections.forEach((section) => {
          if (section.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
            section.scrollIntoView({ behavior: "smooth" })
            section.style.backgroundColor = "rgba(37, 99, 235, 0.1)"
            setTimeout(() => {
              section.style.backgroundColor = ""
            }, 2000)
            return
          }
        })
      }
    }
  })

  // Modo oscuro (opcional)
  const darkModeToggle = document.createElement("button")
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'
  darkModeToggle.className = "dark-mode-toggle"
  darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transition: var(--transition);
        display: flex;
        align-items: center;
        justify-content: center;
    `

  document.body.appendChild(darkModeToggle)

  darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode")
    const isDark = document.body.classList.contains("dark-mode")
    this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'

    // Guardar preferencia
    localStorage.setItem("darkMode", isDark)
  })

  // Cargar preferencia de modo oscuro
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode")
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  }

  // Estilos para modo oscuro
  const darkModeStyles = `
        .dark-mode {
            --bg-primary: #1e293b;
            --bg-secondary: #334155;
            --bg-tertiary: #475569;
            --text-primary: #f1f5f9;
            --text-secondary: #cbd5e1;
            --border-color: #475569;
        }
        
        .dark-mode .need-card,
        .dark-mode .platform-card,
        .dark-mode .ethics-card,
        .dark-mode .timeline-container,
        .dark-mode .ethics-governance {
            background: var(--bg-secondary);
            border-color: var(--border-color);
        }
        
        .dark-mode .platform-header {
            background: linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary));
        }
    `

  const styleSheet = document.createElement("style")
  styleSheet.textContent = darkModeStyles
  document.head.appendChild(styleSheet)

  console.log("🚀 Cayey AI Proposal - Página cargada exitosamente")
  console.log("💡 Funcionalidades activas: Navegación suave, animaciones, contadores, modo oscuro")
})
