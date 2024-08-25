"use strict";

import { books } from "./main.js";
import {
  createCardProduct,
  createTextNotProducts,
} from "./modules/createCardProduct.js";

const formFilter = document.querySelector(".form-filter-products");
const btnFilter = document.querySelector(".btn-filter-product");
const desactiveBtnFilter = document.querySelector(".after-btn-filter");
const inputMinFilter = document.querySelector("#min-price");
const inputMaxFilter = document.querySelector("#max-price");

const renderCardsContainer = document.querySelector(".render-cards-container");

let booksFilter = [];
let currentFilter = "default";

const activeFilter = () => {
  if (inputMaxFilter.value.length === 0 && inputMinFilter.value.length === 0) {
    renderCardsContainer.innerHTML = "";
    changeTitleFilter();
    renderAllProducts(booksFilter);
  }

  if (inputMaxFilter.value.length >= 4 && inputMinFilter.value.length >= 1) {
    desactiveBtnFilter.style.display = "none";
    btnFilter.style.opacity = "1";
    return true;
  } else {
    desactiveBtnFilter.style.display = "block";
    btnFilter.style.opacity = "0.5";
    return false;
  }
};
const filterForPrice = (minPrice, maxPrice) => {
  const minPriceParse = parseInt(minPrice);
  const maxPriceParse = parseInt(maxPrice);

  const booksFilterForPrice = booksFilter.filter((book) => {
    let priceModificado = book.price.replace(/\./g, "").replace(/,.*/, "");
    let priceBook = parseInt(priceModificado);

    if (priceBook >= minPriceParse && priceBook <= maxPriceParse) {
      return true;
    }

    return false;
  });

  if (booksFilterForPrice.length === 0) {
    renderCardsContainer.innerHTML = "";
    renderCardsContainer.appendChild(
      createTextNotProducts("NO HAY LIBROS EN ESE RANGO DE PRECIO")
    );
  } else {
    renderCardsContainer.innerHTML = "";
    changeTitleFilter();
    renderAllProducts(booksFilterForPrice);
  }
};

const changeTitleFilter = () => {
  const nodeTitle = document.createElement("h3");
  nodeTitle.className = "text-secondary";
  const textNode = document.createTextNode(
    currentFilter === "default" ? "todos los libros" : currentFilter
  );
  nodeTitle.append(textNode);
  renderCardsContainer.append(nodeTitle);
};
const filterBooks = () => {
  const setCurrentParamURL = () => {
    const filterParam = new URLSearchParams(window.location.search).get(
      "filter"
    );

    if (filterParam === "ciencias-y-tecnologia") {
      currentFilter = "ciencias y tecnología";
    }
    if (filterParam === "fantasia") {
      currentFilter = "fantasía";
    }
    if (filterParam === "ciencia-ficcion") {
      currentFilter = "ciencia ficción";
    }
    if (filterParam === "terror") {
      currentFilter = "terror";
    }
    if (filterParam === "misterio") {
      currentFilter = "misterio";
    }
    if (filterParam === "espiritualidad") {
      currentFilter = "espiritualidad";
    }
  };
  setCurrentParamURL();

  const booksInstanceFilter = JSON.parse(localStorage.getItem("books"));
  console.log(currentFilter);
  console.log(booksInstanceFilter);

  
  const filterBooks = booksInstanceFilter.filter((book) => {
    if (book.genre.toLowerCase() === currentFilter.toLowerCase()) {
      return book;
    }
  });
  console.log(filterBooks);
  

  if (currentFilter != "default" && filterBooks.length > 0) {
    booksFilter = filterBooks;
    console.log(booksFilter);
    
  } else booksFilter = books;
};

const renderAllProducts = (listBooks) => {
  if (listBooks.length === 0) {
    createTextNotProducts("NO HAY LIBROS");
  }
  listBooks.forEach((book) => {
    renderCardsContainer.appendChild(createCardProduct(book, true));
  });
};

const handlerSubmitFilter = (event) => {
  event.preventDefault();
  if (activeFilter()) {
    filterForPrice(inputMinFilter.value, inputMaxFilter.value);
  }
};

filterBooks();
changeTitleFilter();
renderAllProducts(booksFilter);
AOS.init({
  duration: 700,
});

inputMinFilter.addEventListener("input", () => {
  inputMinFilter.value = inputMinFilter.value.replace(/[^0-9]/g, "");
  activeFilter();
});
inputMaxFilter.addEventListener("input", () => {
  inputMaxFilter.value = inputMaxFilter.value.replace(/[^0-9]/g, "");
  activeFilter();
});
formFilter.addEventListener("submit", handlerSubmitFilter);
