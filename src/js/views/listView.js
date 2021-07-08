import {elements} from "../base"
import * as brewView from "./brewView"

const createListItem = (item) => {
    console.log(item.name)
    const markup = `<ul class="list-item" data-id="${item.id}"><span>${item.name}</span><span>${item.city} ${item.postal_code}</span></ul>`
    elements.breweryList.insertAdjacentHTML("beforeend", markup)
}

export let brewArray = []

export const getBreweryList = async (state) => {

    try {
        const response = await fetch(`https://api.openbrewerydb.org/breweries?by_state=${state}&per_page=10`)
        const data = await response.json()
        console.log(data)

        brewArray = data
        console.log(brewArray)

        data.forEach(item => {
            createListItem(item)            
        })

        // Display's first card and add hover class to first list item
        brewView.displayBrewery(brewArray[0])
        const firstListItem = document.querySelector(`[data-id='${brewArray[0].id}']`)
        firstListItem.classList.add("list-hover")

    } catch(err) {
        console.log(err)
        brewView.displayErrorMessage()
    }
}