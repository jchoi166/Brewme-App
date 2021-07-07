import {elements} from "./base"


const obsCallback = function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting == false) {
            elements.navbarScrolled.style.opacity = '1'
            elements.navbarScrolled.style.transform = 'translateY(0rem)'
            elements.navbar.style.opacity = '0'
            
        } else {
            elements.navbarScrolled.style.opacity = '0'
            elements.navbarScrolled.style.transform = 'translateY(-7.1rem)'
            elements.navbar.style.opacity = '1'
        }
    })
}

const obsOptions = {
    root: null,
    threshold: 0,
    rootMargin: "0px",
}

const observer = new IntersectionObserver(obsCallback, obsOptions)

observer.observe(elements.navbar)