"use strict";

import { setBooksInLocalStorage } from "../data/initialData.js";

const books = JSON.parse(localStorage.getItem('books')) || setBooksInLocalStorage();
