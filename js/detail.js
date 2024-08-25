'use strict'

import { books } from './main.js'
import { createCardProduct } from './modules/createCardProduct.js'

const imgDetail = document.querySelector('.img-book-detail')
const titleDetail = document.querySelector('.title-detail')
const authorDetail = document.querySelector('.author-detail')
const editorialDetail = document.querySelector('.editorial-detail')
const priceDetail = document.querySelector('.price-detail')
const descriptionDetail = document.querySelector('.description-detail')
const btnReadMore = document.querySelector('.btn-readMore')
const moreDetailContainer = document.querySelector('.btn-moreDetailProduct-container')
const btnMoreDetail = document.querySelector('.moreDetail-container')
const listOfSpanMoreDetail = document.querySelectorAll('.value-list-detail-product')
const btnLessStock = document.querySelector('.btn-less-stock')
const btnMoreStock = document.querySelector('.btn-more-stock')
const spanStockDetail = document.querySelector('.span-stock-detail')
const otherBooksRecommendation = document.querySelector('.other-books-recommendation')
const btnBuyDetail = document.querySelector('.btn-buy-detail')

let currentStock = 0;

const bookIdParam = new URLSearchParams(window.location.search).get('id')

const currentBook = books.find( book => book.id === bookIdParam)

const setImgDetail = () => {
  imgDetail.src = currentBook.fromBookUrl
  imgDetail.alt = currentBook.title
}
const setTitleDetail = () => {
  titleDetail.innerHTML = currentBook.title
}
const setAuthorDetail = () => {
  authorDetail.innerHTML = currentBook.author
}
const setEditorialDetail = () => {
  editorialDetail.innerHTML = currentBook.editorial
}
const setPriceDetail = () => {
  priceDetail.innerHTML = currentBook.price
}
const setDescriptionDetail = () => {
  descriptionDetail.innerHTML = currentBook.description
}
const setMoreDetail = () => {
  listOfSpanMoreDetail[0].innerHTML = currentBook.editorial
  listOfSpanMoreDetail[1].innerHTML = currentBook.pagNumbers
  listOfSpanMoreDetail[2].innerHTML = currentBook.genre
  listOfSpanMoreDetail[3].innerHTML = currentBook.dimensions
  listOfSpanMoreDetail[5].innerHTML = currentBook.isbn
}

const handlerReadMore = () => {
  descriptionDetail.classList.toggle('readMore-description-detail')
  if(descriptionDetail.classList.contains('readMore-description-detail')){
    btnReadMore.innerHTML = 'Leer menos'
  }else{
    btnReadMore.innerHTML = 'Leer mas'
  }
}

const handlerMoreDetail = () => {
    const lastChild = btnMoreDetail.lastElementChild;
    const createNodeI = document.createElement('i')
    if(lastChild.classList.contains('fa-chevron-down')){
        lastChild.remove()
        createNodeI.classList = "fa-solid fa-chevron-up"
        btnMoreDetail.appendChild(createNodeI)
    }else{
        lastChild.remove()
        createNodeI.classList = 'fa-solid fa-chevron-down'
        btnMoreDetail.appendChild(createNodeI)
    }
}

const handlerStockDetail = (more = false, less = false) => {
  if(more && currentStock<= currentBook.stock){
    currentStock++
    spanStockDetail.innerHTML = String(currentStock)
  }
  if(less && currentStock > 1){   
    currentStock--
    spanStockDetail.innerHTML = String(currentStock)
  }
}
const renderMoreBooks = () => {
  const getNumberRandom = Math.floor(Math.random() * (books.length - 4) + 4 ) - 4

  for (let i = 0; i < 4; i++) {
    otherBooksRecommendation.appendChild(createCardProduct(books[getNumberRandom + i]));
  }
}

if(currentBook === null){
    window.location.href = '/index.html'
}

setImgDetail()
setTitleDetail()
setAuthorDetail()
setEditorialDetail()
setPriceDetail()
setDescriptionDetail()
setMoreDetail()
renderMoreBooks()

btnReadMore.addEventListener('click', handlerReadMore)
moreDetailContainer.addEventListener('click', handlerMoreDetail)
btnLessStock.addEventListener('click', () => {
  handlerStockDetail(false, true)
})
btnMoreStock.addEventListener('click', () => {
    handlerStockDetail(true, false)
})
btnBuyDetail.addEventListener('click',() => {
  window.location.href = '/pages/error404.html'
})
AOS.init({
    duration: 800,
  });