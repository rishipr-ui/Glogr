// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  })
})

// Header scroll effect
const header = document.getElementById("header")
let lastScrollTop = 0

// Search functionality
const searchInput = document.querySelector(".search-input")
const searchBtn = document.querySelector(".search-btn")
const suggestionTags = document.querySelectorAll(".suggestion-tag")

// Handle search button click
searchBtn.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim()
  if (searchTerm) {
    performSearch(searchTerm)
  }
})

// Handle Enter key in search input
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const searchTerm = searchInput.value.trim()
    if (searchTerm) {
      performSearch(searchTerm)
    }
  }
})

// Handle suggestion tag clicks
suggestionTags.forEach((tag) => {
  tag.addEventListener("click", () => {
    const searchTerm = tag.textContent
    searchInput.value = searchTerm
    performSearch(searchTerm)
  })
})

// Search function (placeholder - would integrate with actual search system)
function performSearch(searchTerm) {
  console.log("Searching for:", searchTerm)

  // Add visual feedback
  searchBtn.style.transform = "translateY(-50%) scale(0.95)"
  setTimeout(() => {
    searchBtn.style.transform = "translateY(-50%) scale(1)"
  }, 150)

  // Here you would typically:
  // 1. Send request to search API
  // 2. Display search results
  // 3. Navigate to search results page

  // For demo purposes, show an alert
  alert(`Searching for: "${searchTerm}"\n\nThis would typically redirect to search results or filter content.`)
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add animation classes to elements
document.addEventListener("DOMContentLoaded", () => {
  // Add fade-in animation to section headers
  const sectionHeaders = document.querySelectorAll(".section-header")
  sectionHeaders.forEach((header) => {
    header.classList.add("fade-in")
  })

  // Add slide-in animations to cards
  const cards = document.querySelectorAll(".service-card, .feature-card, .insight-card")
  cards.forEach((card, index) => {
    card.classList.add("fade-in")
    card.style.transitionDelay = `${index * 0.1}s`
  })

  // Add slide-in animation to about section
  const aboutImage = document.querySelector(".about-image")
  const aboutContent = document.querySelector(".about-content")

  if (aboutImage) aboutImage.classList.add("slide-in-left")
  if (aboutContent) aboutContent.classList.add("slide-in-right")

  // Now observe all animated elements
  const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
  animatedElements.forEach((el) => {
    observer.observe(el)
  })
})

// Form validation and interaction enhancements
const forms = document.querySelectorAll("form")
forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    // Add form validation logic here
    console.log("Form submitted")
  })
})

// Add loading states to buttons
const buttons = document.querySelectorAll(".btn")
buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    // Add ripple effect
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple effect CSS
const style = document.createElement("style")
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Lazy loading for images
const images = document.querySelectorAll('img[src*="placeholder.svg"]')
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      // Here you would load the actual image
      // For demo purposes, we'll just add a loaded class
      img.classList.add("loaded")
      imageObserver.unobserve(img)
    }
  })
})

images.forEach((img) => {
  imageObserver.observe(img)
})

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(() => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.boxShadow = "none"
  }
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  // ESC key closes mobile menu
  if (e.key === "Escape") {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  }

  // Enter key on search suggestions
  if (e.key === "Enter" && e.target.classList.contains("suggestion-tag")) {
    e.target.click()
  }
})

// Initialize tooltips and other interactive elements
document.addEventListener("DOMContentLoaded", () => {
  // Add focus styles for accessibility
  const focusableElements = document.querySelectorAll("a, button, input, [tabindex]")
  focusableElements.forEach((element) => {
    element.addEventListener("focus", () => {
      element.style.outline = "2px solid var(--primary-color)"
      element.style.outlineOffset = "2px"
    })

    element.addEventListener("blur", () => {
      element.style.outline = "none"
    })
  })
})

console.log("GloGen Clinical Research website loaded successfully!")
