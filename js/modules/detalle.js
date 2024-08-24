 import Book from "./classBook.js";
 import { books } from "../main.js";


const paramId = new URLSearchParams(window.location.search).get("id");
 const libroBuscado = books.find(
   (book) => book.id === paramId
 );

 if (libroBuscado) {
   const imgProducto = document.querySelector(
     ".main-detalle .row.container-fluid img"
   );
   const titulo = document.querySelector(".main-detalle .col-lg-4 h2");
   const categoria = document.querySelector(".main-detalle .col-lg-4 p.fs-5");
   const autor = document.querySelector(".main-detalle .col-lg-4 p.fs-3");
   const precio = document.querySelector(
     ".main-detalle .col-lg-4 p.fw-bold.fs-4"
   );
   const sinopsis = document.querySelector(
     ".main-detalle .col-12.col-md-6.col-lg-4.mt-lg-0 .fw-semibold.mt-4"
   );
   const fichaTecnica = document.querySelectorAll(
     ".fondo-detalle .table tbody tr"
   );
   const stock = document.querySelector("#stockLibros");


   imgProducto.src = libroBuscado.fromBookUrl;
   titulo.innerHTML = libroBuscado.title;
   stock.innerHTML = `Quedán ${libroBuscado.stock} Unidades Disponibles`;
   categoria.innerHTML = libroBuscado.genre;
   autor.innerHTML = libroBuscado.author;
   precio.innerHTML = `$ ${libroBuscado.price}`;
   sinopsis.innerHTML = libroBuscado.description;

  
   fichaTecnica[0].children[1].innerHTML = libroBuscado.genre;
   fichaTecnica[1].children[1].innerHTML = libroBuscado.editorial;
   fichaTecnica[2].children[1].innerHTML = libroBuscado.isbn;
   fichaTecnica[4].children[1].innerHTML = libroBuscado.dimensions;
   fichaTecnica[5].children[1].innerHTML = libroBuscado.pagNumbers;

   // Puedes añadir más campos si es necesario
 } else {
   console.error("Libro no encontrado");
 }