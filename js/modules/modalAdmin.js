'use strict'

const formAdmin = document.querySelector('#formAdmin')
const modal = document.querySelector('#createBook');
const modalCreateBook = new bootstrap.Modal(modal)

export const showModalEdit = () => {
    modalCreateBook.show()
}
export const showModal = () => {
   modalCreateBook.show()
}
export const hideModal = () => {
    modalCreateBook.hide()
}

modal.addEventListener('hide.bs.modal', () => {
  formAdmin.reset()
})