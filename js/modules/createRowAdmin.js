"use strict";

import { books } from "../main.js";
import { hideModal, showModalEdit } from "./modalAdmin.js";
import {
  getInputsValue,
  setInputsValue,
  validateFormAdmin,
} from "./validationAdmin.js";

const tbodyTableAdmin = document.querySelector(".tbody-table-admin");
const formAdmin = document.querySelector("#formAdmin");

let isEditBook = false;
let currentBookId = null;
let currentBtnEdit = null;

const editAllDataBook = (indexBook) => {
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

  books[indexBook].fromBookUrl = fromBookUrl;
  books[indexBook].title = title;
  books[indexBook].author = author;
  books[indexBook].isbn = isbn;
  books[indexBook].pagNumbers = pags;
  books[indexBook].price = price;
  books[indexBook].stock = stock;
  books[indexBook].dimensions = dimensions;
  books[indexBook].description = description;
  books[indexBook].editorial = editorial;
  books[indexBook].genre = genre;

  localStorage.setItem('books', JSON.stringify(books))
};
const editDataBook = (id, btnEdit) => {
  const findIndexBook = books.findIndex((book) => book.id === id);

  if (isEditBook && validateFormAdmin()) {
    editAllDataBook(findIndexBook);
    const trEdit = btnEdit.parentNode.parentNode.parentNode;
    trEdit.before(createRowBookAdmin(books[findIndexBook], `<i class="bi bi-pen"></i>`, false, true));
    trEdit.remove();
    hideModal();
    isEditBook = false;
    currentBookId = null;
    currentBtnEdit = null;
  }
};
const handleFormSubmit = (event) => {
    event.preventDefault();
    if (currentBookId !== null && currentBtnEdit !== null) {
      editDataBook(currentBookId, currentBtnEdit);
    }
  };

formAdmin.removeEventListener("submit", handleFormSubmit);
formAdmin.addEventListener("submit", handleFormSubmit);

const editBook = (book, btnEdit) => {
  showModalEdit();
  setInputsValue(book);
  
  currentBookId = book.id;
  currentBtnEdit = btnEdit;
};

// fns --> funciones que crean el nodo 'td' para la tabla del admin

const tdActionsBtn = (book) => {
  const td = document.createElement("td");
  const divContainer = document.createElement("div");
  const buttonViewBook = document.createElement("button");
  const iconViewBook = document.createElement("i");
  const buttonEditBook = document.createElement("button");
  const iconEditBook = document.createElement("i");
  const buttonDeleteBook = document.createElement("button");
  const iconDeleteBook = document.createElement("i");

  divContainer.className = "d-flex flex-column";
  buttonViewBook.className = "btn btn-table-admin fs-5";
  iconViewBook.className = "bi bi-eye";
  buttonEditBook.className = "btn btn-table-admin btn-edit-book fs-5";
  iconEditBook.className = "bi bi-pencil-square";
  buttonDeleteBook.className = "btn btn-table-admin fs-5 btn-trash";
  iconDeleteBook.className = "bi bi-trash";
  buttonViewBook.appendChild(iconViewBook);
  divContainer.appendChild(buttonViewBook);
  buttonEditBook.appendChild(iconEditBook);
  divContainer.appendChild(buttonEditBook);
  buttonDeleteBook.appendChild(iconDeleteBook);
  divContainer.appendChild(buttonDeleteBook);
  td.appendChild(divContainer);

  buttonEditBook.addEventListener("click", () => {
    isEditBook = true;
    editBook(book, buttonEditBook);
  });
  
  return td;
};
const tdImgCreate = (urlImage, textAlt) => {
  const td = document.createElement("td");
  const elementImg = document.createElement("img");
  elementImg.className = "img-thumbnail img-product-admin";
  elementImg.src = urlImage;
  elementImg.onerror = () => {
    elementImg.src =
      "https://libreriayachaywasi.com/wp-content/uploads/2024/02/YACH-PAL99ADER630189786123250300.jpg";
  };
  elementImg.alt = textAlt;
  td.appendChild(elementImg);
  return td;
};
const tdTextCreate = (text, tagName, classSpan = false) => {
  const td = document.createElement("td");
  const span = document.createElement(tagName);
  const contentText = document.createTextNode(text);

  if (classSpan) {
    span.className = classSpan;
  }
  span.appendChild(contentText);
  td.appendChild(span);
  return td;
};

// fn --> crea una fila a lo ultimo del tbody de la tabla del admin
export const createRowBookAdmin = (
  book,
  index,
  addFirst = false,
  returnNode = false
) => {
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  const spanIndex = document.createElement('span')

  spanIndex.innerHTML = `${typeof index === "number" ? index + 1 : index}`
  tr.id = book.id;
  tr.className = "align-middle row-table-admin rounded rounded-3";
  th.appendChild(spanIndex);
  tr.appendChild(th);
  tr.appendChild(tdImgCreate(book.fromBookUrl, book.title));
  tr.appendChild(tdTextCreate(book.title));
  tr.appendChild(tdTextCreate(book.author));
  tr.appendChild(tdTextCreate(book.isbn, "span", "isbn font-number"));
  tr.appendChild(tdTextCreate(book.editorial, "p", "text-edition-admin mb-0"));
  tr.appendChild(tdTextCreate(book.pagNumbers, "span", "font-number"));
  tr.appendChild(
    tdTextCreate(book.description, "p", "text-description-admin mb-0")
  );
  tr.appendChild(tdTextCreate(book.dimensions));
  tr.appendChild(tdTextCreate(book.price, "span", "font-number"));
  tr.appendChild(tdTextCreate(`${book.stock} ud`, "span", "font-number"));
  tr.appendChild(tdActionsBtn(book));

  if (!returnNode) {
    if (addFirst) {
      tbodyTableAdmin.prepend(tr);
    } else {
      tbodyTableAdmin.appendChild(tr);
    }
  } else {
    return tr;
  }
};
