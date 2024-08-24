"use strict";

import { showModalLogin } from "./modalLogin.js";

const cartUserMobile = document.querySelector(".card-user-mobile");
const cartUserDesktop = document.querySelector(".cart-user-lg");
const ulNavbar = document.querySelector(".nav-ul");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const users = JSON.parse(localStorage.getItem("users"));

const redirectAdmin = () => {
  window.location.href = "/pages/admin.html";
};
const redirectFavorite = () => {
  window.location.href = "/pages/product.html?filter=favorites-books";
};

const exitLogin = () => {
  localStorage.removeItem("currentUser");
  window.location.reload();
};
const createIconLogout = () => {
  const nodeA = document.createElement("span");
  nodeA.className = "fs-3 mx-2 iconNav-navbar";
  const nodeI = document.createElement("i");
  nodeI.className = "bi bi-person-x-fill";
  nodeA.appendChild(nodeI);

  nodeA.addEventListener("click", () => {
    Swal.fire({
      title: "Quieres cerrar la sesion?",
      showCancelButton: true,
      confirmButtonText: "Cerrar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "custom-alert",
        confirmButton: "btn-confirm",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        exitLogin();
      }
    });
  });

  return nodeA;
};
const createIconLogin = () => {
  const nodeA = document.createElement("span");
  nodeA.id = "buttonLoginMobile";
  nodeA.className = "fs-3 mx-2 iconNav-navbar";
  const nodeI = document.createElement("i");
  nodeI.className = "bi bi-person-plus-fill";
  nodeA.appendChild(nodeI);

  nodeA.addEventListener("click", () => {
    showModalLogin();
  });

  return nodeA;
};

const createLiIsAdmin = () => {
  const nodeLi = document.createElement("li");
  nodeLi.classList = "nav-item";
  const nodeA = document.createElement("a");
  nodeA.className = "nav-link text-center nav-custom";
  const textNode = document.createTextNode("Administrador");
  nodeA.appendChild(textNode);

  nodeA.addEventListener("click", () => {
    redirectAdmin();
  });
  nodeLi.appendChild(nodeA);
  return nodeLi;
};

const createLiIsFavorite = () => {
  const nodeLi = document.createElement("li");
  nodeLi.classList = "nav-item";
  const nodeA = document.createElement("a");
  nodeA.className = "nav-link text-center nav-custom";
  const textNode = document.createTextNode("Favoritos");
  nodeA.appendChild(textNode);

  nodeA.addEventListener("click", () => {
    redirectFavorite();
  });
  nodeLi.appendChild(nodeA);
  return nodeLi;
};

const createLiIsLogin = () => {
  const nodeLi = document.createElement("li");
  nodeLi.classList = "nav-item";
  const nodeA = document.createElement("a");
  nodeA.className = "nav-link text-center nav-custom";
  const textNode = document.createTextNode("Acceder");
  nodeA.appendChild(textNode);

  nodeA.addEventListener("click", () => {
    showModalLogin()
  });
  nodeLi.appendChild(nodeA);
  return nodeLi;
};

const currentUserIsAdmin = () => {
  const isAdmin = users.find((user) => {
    if (
      user.userName === currentUser.userName &&
      user.userPassword === currentUser.userPassword
    ) {
      return user;
    }
  });

  if (isAdmin.isAdmin) {
    return true;
  }

  return false;
};

if (currentUser) {
  cartUserDesktop.prepend(createIconLogout());
  cartUserMobile.prepend(createIconLogout());

  if (currentUserIsAdmin()) {
    ulNavbar.appendChild(createLiIsAdmin());
  } else {
    ulNavbar.appendChild(createLiIsFavorite());
  }
} else {
  ulNavbar.appendChild(createLiIsLogin())
  cartUserMobile.prepend(createIconLogin());
  cartUserDesktop.prepend(createIconLogin());
}
