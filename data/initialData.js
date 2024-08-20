"use strict";

import Book from "../js/modules/classBook.js";

let books = [];

const createBooks = (booksList) => {
  booksList.forEach((book) => {
    books.push(
      new Book(
        book.fromBookUrl,
        book.title,
        book.author,
        book.isbn,
        book.editorial,
        book.dimensions,
        book.price,
        book.stock,
        book.description,
        book.pagNumbers
      )
    );
  });

  return true;
};

// fn --> trae los datos del json
const getBookData = async () => {
  try {
    // Obtener la respuesta del archivo JSON
    const response = await fetch("/data/initialData.json");

    if (!response.ok) {
      throw new Error("Error en los datos iniciales de la pagina");
    }

    const booksData = await response.json();

    createBooks(booksData);
  } catch (error) {
    console.error("Error en carpeta `data`:", error);
  }
};

export const setBooksInLocalStorage = async () => {
  books = [];
  let hardcodeData = JSON.parse(localStorage.getItem("setLocalData"));

  if (hardcodeData === null) {
    localStorage.setItem("setLocalData", true);
    hardcodeData = JSON.parse(localStorage.getItem("setLocalData"));
  }

  if (hardcodeData) {
    await getBookData();
    localStorage.setItem("books", JSON.stringify(books));
    localStorage.setItem("setLocalData", false);
    window.location.reload();
  } else {
    localStorage.setItem("setLocalData", false);
  }
};
