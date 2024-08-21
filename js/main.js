"use strict";

import { setBooksInLocalStorage } from "../data/initialData.js";

export const books = JSON.parse(localStorage.getItem('books')) || setBooksInLocalStorage();
