import {elements} from "../base"

const images = require.context("../../images", true, /\.(png|svg|jpg|gif)$/);

const formatPhone = num => {
    const areaCode = '(' + num.slice(0,3) + ')'
    const firstThree = num.slice(3,6)
    const lastFour = num.slice(-4)
    const newNum = [areaCode, firstThree, lastFour].join('-')
    return newNum
}

export const displayBrewery = (brewery) => {
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

export const displayErrorMessage = () => {
    const markup = `
    <div class="brewery-card__image">
        <img src=${images('./404.png')} alt="">
    </div>
    `
    elements.breweryDisplay.innerHTML = ''
    elements.breweryDisplay.insertAdjacentHTML("beforeend", markup)
}
