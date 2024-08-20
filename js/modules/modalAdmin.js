'use strict'

const modalCreateBook = new bootstrap.Modal(document.querySelector('#createBook'))


export const showModal = () => {
   modalCreateBook.show()
}
export const hideModal = () => {
    modalCreateBook.hide()
}
