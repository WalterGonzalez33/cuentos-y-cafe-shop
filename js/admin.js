import "./modules/modalAdmin.js";
import { validateFormAdmin } from "./modules/validationAdmin.js";

const formAdmin = document.querySelector("#formAdmin");

const handlerSubmit = (form) => {
  form.preventDefault();
  if (validateFormAdmin()) {
    console.log(`datos enviados`);
  }
};
formAdmin.addEventListener("submit", handlerSubmit);
