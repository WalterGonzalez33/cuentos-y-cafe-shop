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

// fn --> crea un div con un mensaje de error en el input
const msjInvalidInput = (msj, childNode, createMsj = true) => {
  const parentNode = childNode.parentNode;

  //verifica si el div del msj ya existe, si existe lo elimina
  const lastChildOfParentNode = parentNode.lastElementChild;
  if (lastChildOfParentNode.classList.contains("invalid-feedback")) {
    lastChildOfParentNode.remove();
  }

  //   crea el div con el mensaje

  if (createMsj) {
    const invalidDiv = document.createElement("div");
    const contentInvalid = document.createTextNode(msj);
    invalidDiv.appendChild(contentInvalid);
    invalidDiv.className = "invalid-feedback";
    parentNode.append(invalidDiv);
  }
};

// fn --> valida la longitud del input enviado como parámetro y si es requerido o no
const validateLength = (
  nameInput = "input",
  input,
  minLength,
  maxLength,
  requiredInput = false
) => {
  const msjInvalid = `El ${nameInput} tiene que tener entre ${minLength} a ${maxLength} caracteres`;
  const msjRequiredInput = `El ${nameInput} es un campo requerido`;

  if (requiredInput) {
    if (input.value.length === 0) {
      msjInvalidInput(msjRequiredInput, input);
      input.className = "form-control";
      input.classList.add("is-invalid");
      input.focus();
      return false;
    }
  }

  if (input.value.length > 0) {
    if (input.value.length >= minLength && input.value.length <= maxLength) {
      input.className = "form-control";
      return true;
    } else {
      msjInvalidInput(msjInvalid, input);
      input.className = "form-control";
      input.classList.add("is-invalid");
      input.focus();
      return false;
    }
  }

  return true;
};

// fn --> valida si el input de la portada es una URL valida
const validateUrl = (input) => {
  const regexUrl = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))$/i;
  const msjUrlInvalid = `Por favor ingrese una URL de imagen valida`;

  if (input.value.length > 0) {
    if (regexUrl.test(input.value)) {
      input.className = "form-control";
      return true;
    } else {
      msjInvalidInput(msjUrlInvalid, input);
      input.className = "form-control";
      input.classList.add("is-invalid");
      input.focus();
      return false;
    }
  } else {
    input.className = "form-control";
    msjInvalidInput("N/D", input, false);
    return true;
  }
};

// fn --> valida si el código ISBN es correcto
const validateCodeIsbn = (input) => {
  const alphabetRegex = /[a-zA-Z]/.test(input.value);
  const symbolsRegex = /[^a-zA-Z0-9-]/.test(input.value);
  const msjIsbnInvalid = `el ISBN no puede contener símbolos o letras (solo esta permitido el '-')`;

  if (alphabetRegex || symbolsRegex) {
    msjInvalidInput(msjIsbnInvalid, input);
    input.className = "form-control";
    input.classList.add("is-invalid");
    input.focus();
    return false;
  }

  msjInvalidInput("N/D", input, false);
  input.className = "form-control";
  return true;
};

// fn --> verifica si el dato del input son numero y no string
const validateNumber = (input) => {
  const inputValue = parseFloat(input.value);
  const msjNumberInvalid = `El contenido tiene que ser numérico`;

  if (Number.isNaN(inputValue)) {
    msjInvalidInput(msjNumberInvalid, input);
    input.className = "form-control";
    input.classList.add("is-invalid");
    input.focus();
    return false;
  }

  msjInvalidInput("N/D", input, false);
  input.className = "form-control";
  return true;
};

// fn --> valida el formato del input de dimensiones de los libros
const validateFormDimensions = (input) => {
  const dimensionsRegex = /^\s*\d+,\d+\s*x\s*\d+,\d+\s*$/i;
  const msjDimensionsInvalid = `El formato de las dimensiones es ( 15,5 x 22,5 )`;

  if (dimensionsRegex.test(input.value)) {
    msjInvalidInput("N/D", input, false);
    input.className = "form-control";
    return true;
  } else {
    msjInvalidInput(msjDimensionsInvalid, input);
    input.className = "form-control";
    input.classList.add("is-invalid");
    input.focus();
    return false;
  }
};

// fn --> valida todos los input del formulario y devuelve un booleano dependiendo
const validateFormAdmin = () => {
  const validateFromBookUrl =
    validateLength("link", inputFromBookUrl, 8, 100, false) &&
    validateUrl(inputFromBookUrl);
  const validateIsbn =
    validateLength("ISBN", inputIsbn, 13, 20, true) &&
    validateCodeIsbn(inputIsbn);
  const validateStock =
    validateLength("stock", inputStock, 1, 6, true) &&
    validateNumber(inputStock);
  const validatePags =
    validateLength("total de paginas", inputPags, 1, 6, true) &&
    validateNumber(inputPags);
  const validatePrice =
    validateLength("precio", inputPrice, 1, 7, true) &&
    validateNumber(inputPrice);
  const validateDimensions =
    validateLength("formato de dimension", inputDimensions, 6, 15, true) &&
    validateFormDimensions(inputDimensions);
  const validateTitle = validateLength("titulo", inputTitle, 2, 30, true);
  const validateAuthor = validateLength("autor", inputAuthor, 2, 30, true);

  if (
    validateFromBookUrl &&
    validateTitle &&
    validateAuthor &&
    validateIsbn &&
    validatePags &&
    validatePrice &&
    validateStock &&
    validateDimensions
  ) {
    return true;
  }
};

const handlerSubmit = (form) => {
  form.preventDefault();
  if (validateFormAdmin()) {
    console.log(`datos enviados`);
  }
};
formAdmin.addEventListener("submit", handlerSubmit);