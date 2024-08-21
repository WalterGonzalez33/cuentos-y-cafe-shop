import "./modules/modalAdmin.js";
import './modules/createRowAdmin.js'
import { validateFormAdmin } from "./modules/validationAdmin.js";
import { showModal } from "./modules/modalAdmin.js";
import { createRowBookAdmin } from "./modules/createRowAdmin.js";

const btnAddBook = document.querySelector('.btn-add-admin')
const formAdmin = document.querySelector("#formAdmin");
const viewMoreContainer = document.querySelector('.viewMoreContainer')
const btnViewMore = document.querySelector('.btn-viewMore')

const books = JSON.parse(localStorage.getItem('books'));

let indexRenderRows = 0;

const handlerSubmit = (form) => {
  form.preventDefault();
  if (validateFormAdmin()) {
    console.log(`datos enviados`);
  }
};

const createNodeNotViewMore = () => {
  const span = document.createElement('span')
  const textSpan = document.createTextNode('NO HAY MAS LIBROS')
  span.appendChild(textSpan)
  const lastChildOfViewMoreContain = viewMoreContainer.lastElementChild;
  lastChildOfViewMoreContain.remove()
  viewMoreContainer.appendChild(span)
}
const handlerViewMore = () => {
  renderRowsAdmin(books, indexRenderRows)
}
const renderRowsAdmin = (booksList, indexStart) => {
  for (let i = indexStart; i < indexStart + 5; i++) {
    indexRenderRows++;
    if(booksList[i]){
      createRowBookAdmin(booksList[i], i)
    }else{
      createNodeNotViewMore()
      break
    }

  }
}


btnAddBook.addEventListener('click', showModal)
formAdmin.addEventListener("submit", handlerSubmit);
btnViewMore.addEventListener('click',handlerViewMore)
renderRowsAdmin(books, indexRenderRows)
