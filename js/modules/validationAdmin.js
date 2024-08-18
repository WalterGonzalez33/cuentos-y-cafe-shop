"use strict";

const formAdmin = document.querySelector("#formAdmin");
const inputFromBookUrl = document.querySelector("#fromBookUrl");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputIsbn = document.querySelector("#isbn");
const inputPags = document.querySelector("#pags");
const inputDimensions = document.querySelector("#dimensions");
const inputPrice = document.querySelector("#price");
const inputStock = document.querySelector("#stock");
const inputDescription = document.querySelector("#description");

// fn ---> crea un div con un mensaje de error en el input
const msjInvalidInput = (msj, childNode) => {
  const parentNode = childNode.parentNode;

//verifica si el div del msj ya existe, si existe lo elimina
  const lastChildOfParentNode = parentNode.lastElementChild;
  if (lastChildOfParentNode.classList.contains("invalid-feedback")) {
    lastChildOfParentNode.remove();
  }

//   crea el div con el mensaje
  const invalidDiv = document.createElement("div");
  const contentInvalid = document.createTextNode(msj);
  invalidDiv.appendChild(contentInvalid);
  invalidDiv.className = "invalid-feedback";
  parentNode.append(invalidDiv);
};

// fn ---> valida la longitud del input enviado como parámetro y si es requerido o no
const validateLength = (nameInput = "input", input, minLength, maxLength, requiredInput = false) => {
  const msjInvalid = `El ${nameInput} tiene que tener entre ${minLength} a ${maxLength} caracteres`;
  const msjRequiredInput = `El ${nameInput} es un campo requerido`

  if(requiredInput){
    if(input.value.length === 0){
        msjInvalidInput(msjRequiredInput, input);
        input.className = "form-control";
        input.classList.add("is-invalid");
        input.focus()
        return false;
    }
  }

  if (input.value.length >= minLength && input.value.length <= maxLength) {
    input.className = "form-control";
    return true;
  } else {
    msjInvalidInput(msjInvalid, input);
    input.className = "form-control";
    input.classList.add("is-invalid");
    input.focus()
    return false;
  }
};

const validateFormAdmin = () => {
  if (validateLength("titulo", inputTitle, 2, 30, true)) {
    return true;
  }
};
const handlerSubmit = (form) => {
  form.preventDefault();
  validateFormAdmin();
};
formAdmin.addEventListener("submit", handlerSubmit);
