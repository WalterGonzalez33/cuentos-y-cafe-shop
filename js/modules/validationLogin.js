"use strict";

import { msjInvalidInput, validateLength } from "./validationAdmin.js";

const formLogin = document.querySelector("#form-login");
const inputUserName = document.querySelector("#userNameLogin");
const inputUserPassword = document.querySelector("#userPasswordLogin");
const textHelpPassword = document.querySelector("#password-help");

const validatePassword = (inputPassword, minLength, maxLength) => {
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (inputPassword.value.length > 0) {
    if (
      inputPassword.value.length >= minLength &&
      inputPassword.value.length <= maxLength
    ) {
      if (regexPassword.test(inputPassword.value)) {
        inputPassword.className = "form-control";
        textHelpPassword.style.color = "#b6bcc5";
        return true;
      } else {
        msjInvalidInput("N/D", inputPassword, false);
        inputPassword.className = "form-control";
        inputPassword.classList.add("is-invalid");
        inputPassword.focus();
        textHelpPassword.style.color = "#ea868f";
        return false;
      }
    } else {
      msjInvalidInput("N/D", inputPassword, false);
      inputPassword.className = "form-control";
      inputPassword.classList.add("is-invalid");
      inputPassword.focus();
      textHelpPassword.style.color = "#ea868f";
      return false;
    }
  }

  inputPassword.className = "form-control";
  return true;
};
const handlerValidationLogin = () => {
  const validateUserName = validateLength(
    "nombre de usuario",
    inputUserName,
    3,
    30,
    true
  );
  const validateUserPassword = validatePassword(inputUserPassword, 8, 20);

  if (validateUserName && validateUserPassword) {
    return true;
  }
};

const handlerSubmitLogin = (form) => {
  form.preventDefault();

  if (handlerValidationLogin()) {
    console.log("funciona");
  }
};

inputUserName.addEventListener("change", handlerValidationLogin);
inputUserPassword.addEventListener("change", handlerValidationLogin);
formLogin.addEventListener("submit", handlerSubmitLogin);
