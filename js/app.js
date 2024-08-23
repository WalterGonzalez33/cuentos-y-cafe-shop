"use strict";

import './modules/filtersNav.js'
const navbar = document.querySelector(".navbar-container");
const btnCategoryCollapse = document.querySelector(".btn-category-collapse");
const categoryCollapse = document.querySelector(".category-collapse");
const btnNavbarToggler = document.querySelector(".navbar-toggler");

let heightOfNavbar = btnCategoryCollapse.offsetHeight * 2 + navbar.offsetHeight;
categoryCollapse.style.top = `-${heightOfNavbar}px`;
let activeCategory = false;

const handlerCategoryCollapse = () => {
  categoryCollapse.style.display = `block`;
  let newHeightOfNavbar =
    btnCategoryCollapse.offsetHeight + navbar.offsetHeight;
  if (!activeCategory) {
    categoryCollapse.style.top = `${newHeightOfNavbar}px`;
    activeCategory = true;
  } else {
    categoryCollapse.style.top = `-${
      newHeightOfNavbar + btnCategoryCollapse.offsetHeight
    }px`;
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
});
