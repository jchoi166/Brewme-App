import '../sass/style.scss'
import {elements} from "./base"
import './intersection'

const images = require.context("../images/", true, /\.(png|svg|jpg|gif)$/);

// Body Scroll Lock
const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

let brewArray = []

const createListItem = (item) => {
    console.log(item.name)
    const markup = `<ul class="list-item" data-id="${item.id}"><span>${item.name}</span><span>${item.city} ${item.postal_code}</span></ul>`
    elements.breweryList.insertAdjacentHTML("beforeend", markup)
}

const formatPhone = num => {
    const areaCode = '(' + num.slice(0,3) + ')'
    const firstThree = num.slice(3,6)
    const lastFour = num.slice(-4)
    const newNum = [areaCode, firstThree, lastFour].join('-')
    return newNum
}

const displayBrewery = (brewery) => {
    const markup = `
    <div class="brewery-card">
        <div class="brewery-card__image">
            <img src=${images('./landing-bg.jpg')} alt="">
        </div>
        <div class="brewery-card__info">
            <h2>${brewery.name}</h2>
            <p>${brewery.street || ''}</p>
            <p>${brewery.city}, ${brewery.state} ${brewery.postal_code}</p>
            <p>${brewery.phone ? formatPhone(brewery.phone) : '' }</p>
            <div class="brewery-card__info--cta">
                <a href="${brewery.website_url}" target="_blank">Visit Website</a>
                <div>Like</div>
                <div>Share</div>
            </div>
        </div>
    </div>
    `
    elements.breweryDisplay.innerHTML = ''
    elements.breweryDisplay.insertAdjacentHTML("beforeend", markup)
}

const getBreweryList = async (state) => {

    try {
        const response = await fetch(`https://api.openbrewerydb.org/breweries?by_state=${state}&per_page=10`)
        const data = await response.json()
        console.log(data)

        brewArray = data
        console.log(brewArray)

        data.forEach(item => {
            createListItem(item)            
        })

        displayBrewery(brewArray[0])
        const firstListItem = document.querySelector(`[data-id='${brewArray[0].id}']`)
        firstListItem.classList.add("list-hover")

    } catch(err) {
        console.log(err)
    }
}


// CONTROLLER 

// creates new search on landing page 

elements.landingForm.addEventListener("submit", event => {
    event.preventDefault()
    let state = elements.landingInput.value
    
    elements.breweryDisplay.innerHTML = ''
    elements.breweryList.innerHTML = ''
    elements.breweryInput.value = state
    getBreweryList(state)
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
    getBreweryList(state)
})


// displays new brewery item on click

elements.breweryList.addEventListener("click", event => {
    let listItem = event.target.closest(".list-item")
    if (listItem) {
        
        let brewID = listItem.dataset.id
        let brewery = brewArray.find(obj => obj.id == brewID)
        
        const list = document.querySelectorAll(".list-item")

        for (const item of list) {
            item.classList.remove("list-hover")
        }
        // list.forOf(item => {
        // })
        listItem.classList.add("list-hover")

        console.log(brewery)
        displayBrewery(brewery)
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

