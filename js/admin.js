import "./modules/modalAdmin.js";
import "./modules/createRowAdmin.js";
import {
  getInputsValue,
  validateFormAdmin,
} from "./modules/validationAdmin.js";
import { hideModal, showModal } from "./modules/modalAdmin.js";
import { createRowBookAdmin } from "./modules/createRowAdmin.js";
import { books } from "./main.js";
import Book from "./modules/classBook.js";

const btnAddBook = document.querySelector(".btn-add-admin");
const formAdmin = document.querySelector("#formAdmin");
const viewMoreContainer = document.querySelector(".viewMoreContainer");
const btnViewMore = document.querySelector(".btn-viewMore");

let isCreateBook = false;
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

const insetNewBook = () => {
  const newBook = createNewBook();
  books.unshift(newBook);
  localStorage.setItem("books", JSON.stringify(books));
  formAdmin.reset();
  hideModal();
  createRowBookAdmin(newBook, `<i class="bi bi-check2"></i>`, true);
  indexRenderRows++;
  Swal.fire({
    title: "Libro añadido correctamente",
    text: "El libro creado aparecerá al comienzo de la tabla",
    icon: "success",
    confirmButtonText: "ok",
    customClass: {
      popup: "custom-alert",
      confirmButton: "btn-confirm",
    },
  });
};
const handlerSubmit = (form) => {
  form.preventDefault();
  if (isCreateBook && validateFormAdmin()) {
    insetNewBook();
    isCreateBook = false;
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

const handlerClickAddBook = () => {
  isCreateBook = true;
  showModal();
};

btnAddBook.addEventListener("click", handlerClickAddBook);
formAdmin.removeEventListener("submit", handlerSubmit);
formAdmin.addEventListener("submit", handlerSubmit);
btnViewMore.addEventListener("click", handlerViewMore);
renderRowsAdmin(books, indexRenderRows);
