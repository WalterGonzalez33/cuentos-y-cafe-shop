"use strict";

const formAdmin = document.querySelector("#formAdmin");
const modalTitle = document.querySelector(".modal-title");
const btnModalSubmit = document.querySelector(".btn-submit-admin");
const modal = document.querySelector("#createBook");
const modalCreateBook = new bootstrap.Modal(modal);

export const showModalEdit = () => {
  window.scrollTo(0, 0);
  modalTitle.innerHTML = `Edita el libro<span class="ms-1"><i class="bi bi-pen-fill"></i></span>`;
  btnModalSubmit.innerHTML = "EDITAR";
  modalCreateBook.show();
};
export const showModal = () => {
  window.scrollTo(0, 0);
  modalTitle.innerHTML = `Crea un libros<span class="ms-1"><i class="fa-solid fa-book"></i></span>`;
  btnModalSubmit.innerHTML = "CREAR";
  modalCreateBook.show();
};
export const hideModal = () => {
  modalCreateBook.hide();
};

modal.addEventListener("hide.bs.modal", () => {
  formAdmin.reset();
});
