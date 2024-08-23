"use strict";

const redirectionDetailProduct = (id) => {
  window.location.href = `/pages/detalle.html?id=${id}`;
};

const imgCardCreate = (urlImage, textAlt) => {
  const elementImg = document.createElement("img");
  elementImg.className = "img-fluid img-card-product";
  elementImg.src = urlImage;
  elementImg.onerror = () => {
    elementImg.src =
      "https://libreriayachaywasi.com/wp-content/uploads/2024/02/YACH-PAL99ADER630189786123250300.jpg";
  };
  elementImg.alt = textAlt;
  return elementImg;
};

const createNodeBtn = () => {
  const btnNode = document.createElement("button");
  btnNode.className = "btn btn-buy-card";
  const createSpan = document.createElement("span");
  const createTextNode = document.createTextNode("COMPRAR");
  createSpan.appendChild(createTextNode);
  const iconBasket = document.createElement("i");
  iconBasket.className = "ms-2 bi bi-basket3-fill";
  btnNode.appendChild(createSpan);
  btnNode.appendChild(iconBasket);

  return btnNode;
};

// fn --> crea un mensaje cuando no hay productos
export const createTextNotProducts = (textNode) => {
  const divContainer = document.createElement("div");
  divContainer.className = "text-center mt-5";
  divContainer.setAttribute("data-aos", "fade-up");
  const nodeTitle = document.createElement("h3");
  nodeTitle.className = "text-secondary";
  const nodeText = document.createTextNode(textNode);
  nodeTitle.appendChild(nodeText);
  const iconNode = document.createElement("i");
  iconNode.className = "fs-2 text-secondary bi bi-journal-x";
  divContainer.appendChild(nodeTitle);
  divContainer.appendChild(iconNode);
  return divContainer;
};
// fn --> crea una card de producto
export const createCardProduct = (
  { fromBookUrl, title, price, id },
  isAnimate = false
) => {
  const divCardContainer = document.createElement("div");
  if (isAnimate) {
    divCardContainer.setAttribute("data-aos", "fade-up");
  }
  divCardContainer.className =
    "col-6 col-lg-4 mt-2 m-auto m-lg-0 mt-md-0 p-0 card card-product";

  const divImgCardContainer = document.createElement("div");
  divImgCardContainer.className = "img-card-container";
  divImgCardContainer.appendChild(imgCardCreate(fromBookUrl, title));

  const cardBodyContainer = document.createElement("div");
  cardBodyContainer.className = "card-body";
  const titleBookCardBody = document.createElement("h5");
  titleBookCardBody.className = "card-title";
  const createNodeTextTitle = document.createTextNode(title);
  titleBookCardBody.appendChild(createNodeTextTitle);
  cardBodyContainer.appendChild(titleBookCardBody);

  const priceBookCardBody = document.createElement("p");
  priceBookCardBody.className = "card-text";
  const createNodeTextPrice = document.createTextNode(price);
  priceBookCardBody.appendChild(createNodeTextPrice);
  cardBodyContainer.appendChild(priceBookCardBody);

  cardBodyContainer.appendChild(createNodeBtn());

  divCardContainer.appendChild(divImgCardContainer);
  divCardContainer.appendChild(cardBodyContainer);

  divCardContainer.addEventListener("click", () => {
    redirectionDetailProduct(id);
  });
  return divCardContainer;
};
