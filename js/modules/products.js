'use strict'

const formFilter = document.querySelector('.form-filter-products')
const inputMinFilter = document.querySelector('.min-price')
const inputMaxFilter = document.querySelector('.max-price')

const handlerSubmitFilter = (event) => {
  event.preventDefault()
}
formFilter.addEventListener('submit',handlerSubmitFilter )
