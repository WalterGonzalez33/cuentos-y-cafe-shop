import "./modules/modalAdmin.js";
import "./modules/createRowAdmin.js";
import {
  getInputsValue,
  validateFormAdmin,
} from "./modules/validationAdmin.js";
import { hideModal, showModal } from "./modules/modalAdmin.js";
import { createRowBookAdmin } from "./modules/createRowAdmin.js";
import Book from "./modules/classBook.js";

const btnAddBook = document.querySelector(".btn-add-admin");
const formAdmin = document.querySelector("#formAdmin");
const viewMoreContainer = document.querySelector(".viewMoreContainer");
const btnViewMore = document.querySelector(".btn-viewMore");

const books = JSON.parse(localStorage.getItem("books"));

let indexRenderRows = 0;

const createNewBook = () => {
  const {
    fromBookUrl,
    title,
    author,
    isbn,
    pags,
    price,
    stock,
    dimensions,
    description,
    editorial,
    genre,
  } = getInputsValue();
  const newBookCreate = new Book(
    fromBookUrl,
    title,
    author,
    isbn,
    editorial,
    dimensions,
    price,
    stock,
    description,
    pags,
    genre
  );

  return newBookCreate;
};

const handlerSubmit = (form) => {
  form.preventDefault();
  if (validateFormAdmin()) {
    const newBook = createNewBook();
    books.unshift(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    formAdmin.reset();
    hideModal();
    createRowBookAdmin(newBook, "#", true);
    indexRenderRows++;
    Swal.fire({
      title: "Libro añadido correctamente",
      icon: "success",
      color: '#405d72'
    });
  }
};

const createNodeNotViewMore = () => {
  const span = document.createElement("span");
  const textSpan = document.createTextNode("NO HAY MAS LIBROS");
  span.appendChild(textSpan);
  const lastChildOfViewMoreContain = viewMoreContainer.lastElementChild;
  lastChildOfViewMoreContain.remove();
  viewMoreContainer.appendChild(span);
};

// fn event --> maneja cuando se le hace click a ver mas
const handlerViewMore = () => {
  renderRowsAdmin(books, indexRenderRows);
};

// fn --> renderiza 5 libros en la tabla
const renderRowsAdmin = (booksList, indexStart) => {
  for (let i = indexStart; i < indexStart + 5; i++) {
    indexRenderRows++;
    if (booksList[i]) {
      createRowBookAdmin(booksList[i], i);
    } else {
      createNodeNotViewMore();
      break;
    }
  }
};

btnAddBook.addEventListener("click", showModal);
formAdmin.addEventListener("submit", handlerSubmit);
btnViewMore.addEventListener("click", handlerViewMore);
renderRowsAdmin(books, indexRenderRows);
