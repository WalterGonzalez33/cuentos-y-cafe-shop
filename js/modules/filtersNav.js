"use strict";

const btnFilterCienciasTecnologia = document.querySelector(
  ".ciencias-tecnologia"
);
const btnFilterFantasia = document.querySelector(".fantasia");
const btnFilterCienciaFiccion = document.querySelector(".ciencia-ficcion");
const btnFilterTerror = document.querySelector(".terror");
const btnFilterMisterio = document.querySelector(".misterio");
const btnFilterEspiritualidad = document.querySelector(".espiritualidad");

const redirectionFilter = (param) => {
  window.location.href = "/pages/product.html?filter=" + param;
};

btnFilterCienciasTecnologia.addEventListener("click", () => {
  redirectionFilter("ciencias-y-tecnologia");
});
btnFilterFantasia.addEventListener("click", () => {
  redirectionFilter("fantasia");
});
btnFilterCienciaFiccion.addEventListener("click", () => {
  redirectionFilter("ciencia-ficcion");
});
btnFilterTerror.addEventListener("click", () => {
  redirectionFilter("terror");
});
btnFilterMisterio.addEventListener("click", () => {
  redirectionFilter("misterio");
});
btnFilterEspiritualidad.addEventListener("click", () => {
  redirectionFilter("espiritualidad");
});
