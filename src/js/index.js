import '../sass/style.scss'
import {elements} from "./base"
import './intersection'
import * as brewView from "./views/brewView"
import * as listView from "./views/listView"


// Body Scroll Lock Plugin
const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

// CONTROLLER 

// creates new search on landing page 

elements.landingForm.addEventListener("submit", event => {
    event.preventDefault()
    let state = elements.landingInput.value
    
    elements.breweryDisplay.innerHTML = ''
    elements.breweryList.innerHTML = ''
    elements.breweryInput.value = state
    listView.getBreweryList(state)
    enableBodyScroll(elements.landingContainer)

    setTimeout(function(){
        elements.searchContainer.scrollIntoView({ behavior: "smooth" })
    }, 500)

})

// creates new brewery list on submit

elements.breweryForm.addEventListener("submit", event => {
    event.preventDefault()
    let state = elements.breweryInput.value
    
    elements.landingInput.value = ''
    elements.breweryDisplay.innerHTML = ''
    elements.breweryList.innerHTML = ''
    listView.getBreweryList(state)
})


// displays new brewery item on click

elements.breweryList.addEventListener("click", event => {
    let listItem = event.target.closest(".list-item")
    if (listItem) {
        
        let brewID = listItem.dataset.id
        let brewery = listView.brewArray.find(obj => obj.id == brewID)
        
        // Adds list hover class to current item
        const list = document.querySelectorAll(".list-item")
        for (const item of list) {
            item.classList.remove("list-hover")
        }
        listItem.classList.add("list-hover")

        console.log(brewery)
        brewView.displayBrewery(brewery)
    }
})

// Makes sure landing page is unscrollable until a search is made

window.onload = (event) => {
    console.log('page is fully loaded');
    disableBodyScroll(elements.landingContainer)
};

// Resets page back to landing page on refresh

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

