"use strict";

import "./app.js";
import { setBooksInLocalStorage } from "../data/initialData.js";
import User from "./modules/classUser.js";

localStorage.setItem(
  "users",
  JSON.stringify([
    new User("@admin", "Adm1n$tr0ngPassw0rd!", true),
    new User("@guest", "Guest123!", false),
  ])
);

export const books =
  JSON.parse(localStorage.getItem("books")) || setBooksInLocalStorage();
export const users = JSON.parse(localStorage.getItem("users"));