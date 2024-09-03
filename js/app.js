"use strict";

import './modules/searchProducts.js'
import "./modules/renderUIuserLogin.js";
import "./modules/validationLogin.js";
import "./modules/filtersNav.js";
import "./modules/modalLogin.js";
const navbar = document.querySelector(".navbar-container");
const btnCategoryCollapse = document.querySelector(".btn-category-collapse");
const categoryCollapse = document.querySelector(".category-collapse");
const btnNavbarToggler = document.querySelector(".navbar-toggler");
const iconArrowUp = document.querySelector(".fa-chevron-up");
const iconArrowDown = document.querySelector(".fa-chevron-down");

let heightOfNavbar = btnCategoryCollapse.offsetHeight * 2 + navbar.offsetHeight;
categoryCollapse.style.top = `-${heightOfNavbar}px`;
iconArrowUp.style.display = "none";
let activeCategory = false;

window.onload = function () {
  window.scrollTo(0, 0);
};

const handlerCategoryCollapse = () => {
  categoryCollapse.style.display = `block`;
  let newHeightOfNavbar =
    btnCategoryCollapse.offsetHeight + navbar.offsetHeight;
  if (!activeCategory) {
    categoryCollapse.style.top = `${newHeightOfNavbar}px`;
    iconArrowUp.style.display = "inline";
    iconArrowDown.style.display = "none";
    activeCategory = true;
  } else {
    categoryCollapse.style.top = `-${
      newHeightOfNavbar + btnCategoryCollapse.offsetHeight
    }px`;
    iconArrowUp.style.display = "none";
    iconArrowDown.style.display = "inline";
    activeCategory = false;
  }
};

btnCategoryCollapse.addEventListener("click", handlerCategoryCollapse);
btnNavbarToggler.addEventListener("click", () => {
  let newHeightOfNavbar =
    btnCategoryCollapse.offsetHeight + navbar.offsetHeight;
  categoryCollapse.style.top = `-${
    newHeightOfNavbar + btnCategoryCollapse.offsetHeight
  }px`;
  activeCategory = false;
  iconArrowUp.style.display = "none";
  iconArrowDown.style.display = "inline";
});
