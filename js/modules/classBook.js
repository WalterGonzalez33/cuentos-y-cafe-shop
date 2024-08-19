"use strict";

import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// clase constructora de libros
class Book {
  // propiedades privadas de la clase
  #ID;
  #fromBookUrl;
  #title;
  #author;
  #isbn;
  #editorial;
  #dimensions;
  #price;
  #stock;
  #description;
  #pagNumbers;

  constructor(
    fromBookUrl = "https://libreriayachaywasi.com/wp-content/uploads/2024/02/YACH-PAL99ADER630189786123250300.jpg",
    title = "N/D",
    author = "N/D",
    isbn = "000-00-0000-000-0",
    editorial = "Book Editorial",
    dimensions = "15 x 20",
    price = "15.000",
    stock = 30,
    description = "Descripción del libro",
    pagNumbers = 0
  ) {
    this.#ID = uuidv4();
    this.#fromBookUrl = fromBookUrl;
    this.#title = title;
    this.#author = author;
    this.#isbn = isbn;
    this.#editorial = editorial;
    this.#dimensions = dimensions;
    this.#price = price;
    this.#stock = stock;
    this.#description = description;
    this.#pagNumbers = pagNumbers;
  }

  // getters

  get id() {
    return this.#ID;
  }
  get fromBookUrl() {
    return this.#fromBookUrl;
  }
  get title() {
    return this.#title;
  }
  get author() {
    return this.#author;
  }
  get isbn() {
    return this.#isbn;
  }
  get editorial() {
    return this.#editorial;
  }
  get dimensions() {
    return this.#dimensions;
  }
  get price() {
    return this.#price;
  }
  get stock() {
    return this.#stock;
  }
  get description() {
    return this.#description;
  }
  get pagNumbers() {
    return this.#pagNumbers;
  }

  // setters

  set fromBookUrl(newFromBookUrl) {
    this.#fromBookUrl = newFromBookUrl;
  }
  set title(newTitle) {
    this.#title = newTitle;
  }
  set author(newAuthor) {
    this.#author = newAuthor;
  }

  set isbn(newIsbn) {
    this.#isbn = newIsbn;
  }

  set editorial(newEditorial) {
    this.#editorial = newEditorial;
  }
  set dimensions(newDimensions) {
    this.#dimensions = newDimensions;
  }
  set price(newPrice) {
    this.#price = newPrice;
  }
  set stock(newStock) {
    this.#stock = newStock;
  }
  set description(newDescription) {
    this.#description = newDescription;
  }
  set pagNumbers(newPagNumbers) {
    this.#pagNumbers = newPagNumbers;
  }

  toJSON() {
    return {
      id: this.id,
      fromBookUrl: this.fromBookUrl,
      title: this.title,
      author: this.author,
      isbn: this.isbn,
      description: this.description,
      price: this.price,
      stock: this.stock,
      dimensions: this.dimensions,
      editorial: this.editorial,
      pagNumbers: this.pagNumbers,
    };
  }
}

export default Book;