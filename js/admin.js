import "./modules/modalAdmin.js";
import './modules/createRowAdmin.js'
import { validateFormAdmin } from "./modules/validationAdmin.js";
import { showModal } from "./modules/modalAdmin.js";

const btnAddBook = document.querySelector('.btn-add-admin')
const formAdmin = document.querySelector("#formAdmin");

const handlerSubmit = (form) => {
  form.preventDefault();
  if (validateFormAdmin()) {
    console.log(`datos enviados`);
  }
};

btnAddBook.addEventListener('click', showModal)
formAdmin.addEventListener("submit", handlerSubmit);
