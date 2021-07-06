import '../sass/style.scss'
import {elements} from "./base.js"
const images = require.context("../images/", true, /\.(png|svg|jpg|gif)$/);


let brewArray = []

const createListItem = (item) => {
    console.log(item.name)
    const markup = `<ul class="list-item" data-id="${item.id}"><span>${item.name}</span><span>${item.city} ${item.postal_code}</span></ul>`
    elements.breweryList.insertAdjacentHTML("beforeend", markup)
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
            <p>${brewery.phone}</p>
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

})

// creates new brewery list on submit

elements.breweryForm.addEventListener("submit", event => {
    event.preventDefault()
    let state = elements.breweryInput.value
    
    elements.breweryDisplay.innerHTML = ''
    elements.breweryList.innerHTML = ''
    getBreweryList(state)
})


// displays new brewery item on click

elements.breweryList.addEventListener("click", event => {
    // console.log(event.target.dataset.id)
    let listItem = event.target.closest(".list-item")
    if (listItem) {
        let brewID = listItem.dataset.id
        let brewery = brewArray.find(obj => obj.id == brewID)

        console.log(brewery)
        displayBrewery(brewery)
    }
})