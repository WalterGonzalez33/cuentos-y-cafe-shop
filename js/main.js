"use strict";

import { setBooksInLocalStorage } from "../data/initialData.js";
import User from "./modules/classUser.js";

export const books = JSON.parse(localStorage.getItem('books')) || setBooksInLocalStorage();

const adminUser = new User("admin", "adminPassword", true);

localStorage.setItem('currentUser', JSON.stringify(adminUser))