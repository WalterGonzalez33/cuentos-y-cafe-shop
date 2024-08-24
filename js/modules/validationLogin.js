"use strict";

import { users } from "../main.js";
import { msjInvalidInput, validateLength } from "./validationAdmin.js";

const formLogin = document.querySelector("#form-login");
const inputUserName = document.querySelector("#userNameLogin");
const inputUserPassword = document.querySelector("#userPasswordLogin");
const textHelpPassword = document.querySelector("#password-help");
const notUserContainer = document.querySelector(".not-user-container");

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

const createNodeTextNotUserFind = () => {
  notUserContainer.innerHTML = `<span class='text-userNotFind'>** El usuario no esta registrado **</span>`;
};

const validateExitUser = (nameUser, passwordUser) => {
  const findUser = users.find((user) => {
    if (user.userName === nameUser && user.userPassword === passwordUser) {
      return true;
    }
  });

  if (findUser) {
    return true;
  } else {
    createNodeTextNotUserFind();
    inputUserName.focus();
    return false;
  }
};

const handlerSubmitLogin = (form) => {
  form.preventDefault();

  if (
    handlerValidationLogin() &&
    validateExitUser(inputUserName.value, inputUserPassword.value)
  ) {
    const userCurrent = {
      userName: inputUserName.value,
      userPassword: inputUserPassword.value,
    };
    localStorage.setItem("currentUser", JSON.stringify(userCurrent));
    window.location.reload();
  }
};

inputUserName.addEventListener("change", handlerValidationLogin);
inputUserPassword.addEventListener("change", handlerValidationLogin);
formLogin.addEventListener("submit", handlerSubmitLogin);
