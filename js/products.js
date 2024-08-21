'use strict'

import { books } from "./main.js"
import { createCardProduct } from "./modules/createCardProduct.js"

const formFilter = document.querySelector('.form-filter-products')
const inputMinFilter = document.querySelector('.min-price')
const inputMaxFilter = document.querySelector('.max-price')

const renderCardsContainer = document.querySelector('.render-cards-container')

const renderAllProducts = () => {
  books.forEach(book => {
    renderCardsContainer.appendChild(createCardProduct(book))
  });
}
const handlerSubmitFilter = (event) => {
  event.preventDefault()
}
// formFilter.addEventListener('submit',handlerSubmitFilter )

renderAllProducts()
AOS.init({
  duration: 700
});

