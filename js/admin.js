"use strict";

import "./modules/searchBookAdmin.js";
import {
  getInputsValue,
  validateFormAdmin,
} from "./modules/validationAdmin.js";
import { hideModal, showModal } from "./modules/modalAdmin.js";
import { createRowBookAdmin } from "./modules/createRowAdmin.js";
import { books } from "./main.js";
import Book from "./modules/classBook.js";
import { setBooksInLocalStorage } from "../data/initialData.js";

const btnReset = document.querySelector(".btn-reset");
const btnResetContainer = document.querySelector(".reset-text-container");
const textQuantityBooks = document.querySelector(".text-quantity-books");
const textQuantityStock = document.querySelector(".text-quantity-stock");
const btnAddBook = document.querySelector(".btn-add-admin");
const formAdmin = document.querySelector("#formAdmin");
const viewMoreContainer = document.querySelector(".viewMoreContainer");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const users = JSON.parse(localStorage.getItem("users"));

let isCreateBook = false;
let indexRenderRows = 0;

const currentUserIsAdmin = () => {
  if (currentUser === null) {
    return false;
  }
  const isAdmin = users.find((user) => {
    if (
      user.userName === currentUser.userName &&
      user.userPassword === currentUser.userPassword
    ) {
      return user;
    }
  });

  if (isAdmin.isAdmin) {
    return true;
  }

  return false;
};

const redirectionToHome = () => {
  let timerInterval;

  if (!currentUserIsAdmin()) {
    Swal.fire({
      title: "No estas registrado como administrador",
      html: "Te vamos a dirigir al inicio <b></b> segundos.",
      timer: 5000,
      timerProgressBar: true,
      customClass: {
        popup: "custom-alert",
        confirmButton: "btn-confirm",
      },
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Math.floor(Swal.getTimerLeft() / 1000)}`;
        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        window.location.href = "/index.html";
      }
    });
  }
};

const resetBooksList = () => {
  localStorage.setItem("setLocalData", true);
  setBooksInLocalStorage();
};
export const showResetBooksList = () => {
  if (books.length === 0) {
    btnResetContainer.style.display = "block";
  } else {
    btnResetContainer.style.display = "none";
  }
};
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
  renderQuantityBooks();
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
const createNodeViewMore = (indexCurrent) => {
  const span = document.createElement("span");
  const iconArrowDown = document.createElement("i");
  const textSpan = document.createTextNode("VER MAS");
  span.className = "btn-viewMore";
  iconArrowDown.className = "ms-1 fa-solid fa-chevron-down";
  span.appendChild(textSpan);
  span.appendChild(iconArrowDown);
  const lastChildOfViewMoreContain = viewMoreContainer.lastElementChild;
  lastChildOfViewMoreContain.remove();
  viewMoreContainer.appendChild(span);

  span.addEventListener("click", () => {
    handlerViewMore(indexCurrent);
  });
};

// fn event --> maneja cuando se le hace click a ver mas
const handlerViewMore = (indexForRendering) => {
  renderRowsAdmin(books, indexForRendering, indexForRendering);
};

// fn --> renderiza en pantalla la cantidad de libros hay y su stock
export const renderQuantityBooks = () => {
  const quantityStock = books.reduce((stock, book) => {
    return stock + parseInt(book.stock);
  }, 0);
  textQuantityBooks.innerHTML = `Libros: ${books.length}`;
  textQuantityStock.innerHTML = `Stock: ${quantityStock} ud`;
};
// fn --> renderiza 5 libros en la tabla
export const renderRowsAdmin = (booksList, indexStart, indexCount = 0) => {
  indexCount = indexStart;
  for (let i = indexStart; i < indexStart + 5; i++) {
    indexCount++;
    if (booksList[i]) {
      createRowBookAdmin(booksList[i], i);
      createNodeViewMore(indexCount);
    } else {
      createNodeNotViewMore();
      break;
    }
  }

  return indexCount;
};

const handlerClickAddBook = () => {
  isCreateBook = true;
  showModal();
};

redirectionToHome();

if (currentUserIsAdmin()) {
  btnAddBook.addEventListener("click", handlerClickAddBook);
  formAdmin.removeEventListener("submit", handlerSubmit);
  formAdmin.addEventListener("submit", handlerSubmit);
  renderQuantityBooks();
  indexRenderRows = renderRowsAdmin(books, indexRenderRows, indexRenderRows);
  btnReset.addEventListener("click", resetBooksList);
  showResetBooksList();
} else {
  setTimeout(() => {
    window.location.href = "/index.html";
  }, "5000");
}
