"use strict";

import { books } from "./main.js";
import { createCardProduct } from "./modules/createCardProduct.js";

const firstSection = document.querySelector(".first-section-main");
const secondSection = document.querySelector(".second-section-main");

for (let i = 1; i < 5; i++) {
  firstSection.appendChild(createCardProduct(books[i], true));
}
for (let i = 5; i < 11; i++) {
  secondSection.appendChild(createCardProduct(books[i], true));
}

AOS.init({
  duration: 700,
});
