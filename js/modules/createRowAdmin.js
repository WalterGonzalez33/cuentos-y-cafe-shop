'use strict'
import Book from './classBook.js';

const tbodyTableAdmin = document.querySelector('.tbody-table-admin')

const tdActionsBtn = (id) => {
    const td = document.createElement('td')
    const divContainer = document.createElement('div')
    const buttonViewBook = document.createElement('button')
    const iconViewBook = document.createElement('i')
    const buttonEditBook = document.createElement('button')
    const iconEditBook = document.createElement('i')
    const buttonDeleteBook = document.createElement('button')
    const iconDeleteBook = document.createElement('i')

    divContainer.className = 'd-flex flex-column'
    buttonViewBook.className = 'btn btn-table-admin fs-5'
    iconViewBook.className = 'bi bi-eye'
    buttonEditBook.className = 'btn btn-table-admin btn-edit-book fs-5'
    iconEditBook.className = 'bi bi-pencil-square'
    buttonDeleteBook.className = 'btn btn-table-admin fs-5 btn-trash'
    iconDeleteBook.className = 'bi bi-trash'
    buttonViewBook.appendChild(iconViewBook)
    divContainer.appendChild(buttonViewBook)
    buttonEditBook.appendChild(iconEditBook)
    divContainer.appendChild(buttonEditBook)
    buttonDeleteBook.appendChild(iconDeleteBook)
    divContainer.appendChild(buttonDeleteBook)
    td.appendChild(divContainer)
    return td
}
const tdImgCreate = (urlImage, textAlt) => {
  const td = document.createElement('td')
  const elementImg = document.createElement('img')
  elementImg.className = 'img-thumbnail img-product-admin'
  elementImg.src = urlImage;
  elementImg.alt = textAlt
  td.appendChild(elementImg)
  return td
}
const tdTextCreate = (text, tagName, classSpan = false) => {
    const td = document.createElement('td')
    const span = document.createElement(tagName)
    const contentText = document.createTextNode(text);

    if(classSpan){
        span.className = classSpan
    }
    span.appendChild(contentText)
    td.appendChild(span)
    return td
}
const CreateRowBookAdmin = (book, index) => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const contentTextIndex = document.createTextNode(`${ index + 1 }`);
    tr.id = book.id;
    tr.className = "align-middle row-table-admin rounded rounded-3";
    th.appendChild(contentTextIndex)
    tr.appendChild( th )
    tr.appendChild( tdImgCreate(book.fromBookUrl, book.title) )
    tr.appendChild( tdTextCreate( book.title ) )
    tr.appendChild( tdTextCreate( book.author ) )
    tr.appendChild( tdTextCreate( book.isbn,'span', 'isbn font-number' ) )
    tr.appendChild( tdTextCreate( book.editorial,'p', 'text-edition-admin mb-0' ) )
    tr.appendChild( tdTextCreate( book.pagNumbers,'span', 'font-number' ) )
    tr.appendChild( tdTextCreate( book.description,'p', 'text-description-admin mb-0' ) )
    tr.appendChild( tdTextCreate( book.dimensions ) )
    tr.appendChild( tdTextCreate( book.price,'span', 'font-number' ) )
    tr.appendChild( tdTextCreate( `${book.stock} ud`,'span', 'font-number' ) )
    tr.appendChild( tdActionsBtn(book.id) )
    tbodyTableAdmin.appendChild(tr)
    
}

CreateRowBookAdmin(new Book(
    "https://www.penguinlibros.com/ar/2192261-thickbox_default/tecnoceno.jpg",
    'Tecnoceno',
    "Flavia Costa",
    "9789877370669",
    "TAURUS",
    "22,0 x 15,5",
    '9.300,00',
    9,
    "Chernóbil, la crisis financiera de 2008, los incendios en el Amazonas o la pandemia de coronavirus no son eventos aislados. Son 'accidentes normales', síntomas del crecimiento y la destrucción acelerados",
    230,
), 1+1)

CreateRowBookAdmin(new Book(
    "https://www.penguinlibros.com/ar/2192261-thickbox_default/tecnoceno.jpg",
    'Tecnoceno',
    "Flavia Costa",
    "9789877370669",
    "TAURUS",
    "22,0 x 15,5",
    '9.300,00',
    9,
    "Chernóbil, la crisis financiera de 2008, los incendios en el Amazonas o la pandemia de coronavirus no son eventos aislados. Son 'accidentes normales', síntomas del crecimiento y la destrucción acelerados",
    230,
), 1+1)
CreateRowBookAdmin(new Book(
    "https://www.penguinlibros.com/ar/2192261-thickbox_default/tecnoceno.jpg",
    'Tecnoceno',
    "Flavia Costa",
    "9789877370669",
    "TAURUS",
    "22,0 x 15,5",
    '9.300,00',
    9,
    "Chernóbil, la crisis financiera de 2008, los incendios en el Amazonas o la pandemia de coronavirus no son eventos aislados. Son 'accidentes normales', síntomas del crecimiento y la destrucción acelerados",
    230,
), 1+1)
