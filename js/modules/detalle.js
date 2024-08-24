 import Book from "./classBook.js";
 import { books } from "../main.js";


const paramId = new URLSearchParams(window.location.search).get("id");
console.log(paramId)

 const libroBuscado = books.find(
   (book) => book.id === paramId
 );
 console.log(libroBuscado)