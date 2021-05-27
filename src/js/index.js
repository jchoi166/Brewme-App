import '../sass/style.scss'
import {elements} from "./base.js"


let brewArray = []

const createListItem = (item) => {
    const markup = `<ul class="brewery-item" data-id="${item.id}">${item.name}</ul>`
    elements.breweryList.insertAdjacentHTML("beforeend", markup)
}

const displayBrewery = (brewery) => {
    const markup = `
    <div class="brewery-card">
        <h2>${brewery.name}</h2>
        <p>${brewery.street || ''}</p>
        <p>${brewery.city}, ${brewery.state} ${brewery.postal_code}</p>
        <p>${brewery.phone}</p>
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
    if (event.target.className="brewery-item") {
        let brewID = event.target.dataset.id
        let brewery = brewArray.find(obj => obj.id == brewID)

        console.log(brewery)
        displayBrewery(brewery)
    }
})