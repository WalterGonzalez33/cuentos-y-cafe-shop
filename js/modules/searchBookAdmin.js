'use strict'

import { renderRowsAdmin } from "../admin.js";
import { books } from "../main.js"
import { tbodyTableAdmin } from "./createRowAdmin.js";

const formSearchAdmin = document.querySelector('#form-search-admin')
const inputSearchAdmin = document.querySelector('.input-search-admin')
const TableContainer = document.querySelector('.table-container-admin')

let indexSearch = 0;

export const setScrollTableTop = () => {
    TableContainer.scrollTop = 0;
}

const searchBook = (search) => {
  const booksSearch = books.filter((book) => {
    return book.title.includes(search) || book.isbn.includes(search)
  })

  tbodyTableAdmin.innerHTML = ''
  renderRowsAdmin(booksSearch, indexSearch, indexSearch)
  setScrollTableTop()
}

const handlerSearch = (event) => {
  event.preventDefault()
  searchBook(inputSearchAdmin.value)
}

formSearchAdmin.addEventListener('submit', handlerSearch)
inputSearchAdmin.addEventListener('input', handlerSearch)