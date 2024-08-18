'use strict'

const btnAddBook = document.querySelector('.btn-add-admin')
const btnEditBook = document.querySelectorAll('.btn-edit-book')
const modalCreateBook = new bootstrap.Modal(document.querySelector('#createBook'))


const showModal = () => {
   modalCreateBook.show()
}
btnAddBook.addEventListener('click', showModal)

btnEditBook.forEach(e => {
    e.addEventListener('click', showModal)
});