"use strict";

const inputSearchNavbar = document.querySelector(".input-search-navbar");
const formSearchNavbar = document.querySelector('.form-search-navbar');
const booksSearch = JSON.parse(localStorage.getItem("books"));
const searchBookContainer = document.querySelector(".search-product-container");

const redirectionDetailProduct = (id) => {
  window.location.href = "/pages/detalle.html?id=" + id;
};

const createNodeImg = (url, title) => {
  const imgNode = document.createElement("img");
  imgNode.src = url;
  imgNode.alt = title;

  return imgNode;
};

const notSearchProductLst = () => {
  const searchInputPosition = inputSearchNavbar.getBoundingClientRect();

  const container = document.createElement("div");
  container.className = "container-search-product-navbar";
  const positionDiv = `calc(${searchInputPosition.bottom}px + 8px)`
  container.style.top = positionDiv
  container.style.left = searchInputPosition.left
  const divContainer = document.createElement('div')
  divContainer.className = 'not-search-products-navbar'
  const spanElement = document.createElement('span')
  const spanInput = document.createElement('span')
  spanInput.className = 'search-input-txt'
  const createNodeInput = document.createTextNode(`" ${inputSearchNavbar.value} "`)
  spanInput.appendChild(createNodeInput)
  const nodeText = document.createTextNode(`El libro `)
  const nodeTextTwo = document.createTextNode(' no existe')
  spanElement.appendChild(nodeText)
  spanElement.appendChild(spanInput)
  spanElement.appendChild(nodeTextTwo)
  divContainer.appendChild(spanElement)
  container.appendChild(divContainer)

  return container
}

const createRowSearchProductNavbar = ({ id, fromBookUrl, title, price }) => {
  const divContainer = document.createElement("div");
  divContainer.className = "row-search-product-navbar";
  const divContainerDescription = document.createElement("div");
  divContainerDescription.className = "description-container-search-product";

  const imgContainer = document.createElement("div");
  imgContainer.className = "img-container-search-product";
  imgContainer.appendChild(createNodeImg(fromBookUrl, title));

  const titleAndPriceContainer = document.createElement("div");
  titleAndPriceContainer.className = "titleAndPrice-search-product";
  const titleNodeContainer = document.createElement('div')
  titleNodeContainer.className = 'title-search-container'
  const titleNode = document.createElement("h5");
  const priceNode = document.createElement("span");
  const titleTextNode = document.createTextNode(title);
  const priceTextNode = document.createTextNode(price);
  titleNode.appendChild(titleTextNode);
  priceNode.appendChild(priceTextNode);
  titleNodeContainer.appendChild(titleNode)
  titleAndPriceContainer.appendChild(titleNodeContainer);
  titleAndPriceContainer.appendChild(priceNode);

  const iconContainer = document.createElement("div");
  iconContainer.className = "icon-search-product-navbar";
  const icon = document.createElement("i");
  icon.className = "bi bi-bag-fill";
  iconContainer.appendChild(icon);

  divContainerDescription.appendChild(imgContainer);
  divContainerDescription.appendChild(titleAndPriceContainer);
  divContainer.appendChild(divContainerDescription);
  divContainer.appendChild(iconContainer);

  divContainer.addEventListener("click", () => {
    redirectionDetailProduct(id);
  });

  return divContainer;
};

const resetSearchInput = () => {
    searchBookContainer.innerHTML = ''
  inputSearchNavbar.value = ''
}

const createContainerResultSearch = (booksList) => {
  const searchInputPosition = inputSearchNavbar.getBoundingClientRect();
  const divContainer = document.createElement("div");
  divContainer.className = "container-search-product-navbar";
  const positionDivTop = `calc(${searchInputPosition.bottom}px + 8px)`
  divContainer.style.top = positionDivTop
  divContainer.style.left = searchInputPosition.left

  if (booksList) {
    for (let i = 0; i < 3; i++) {
      if (booksList[i]) {
        divContainer.appendChild(createRowSearchProductNavbar(booksList[i]));
      }
    }
  }


  divContainer.addEventListener('mouseenter', () => {
    inputSearchNavbar.removeEventListener("blur", resetSearchInput );
    window.removeEventListener('scroll', resetSearchInput);
  })
  divContainer.addEventListener('mouseleave', () => {
    inputSearchNavbar.addEventListener("blur", resetSearchInput );
    window.addEventListener('scroll', resetSearchInput);
  })



  return divContainer;
};

// fn --> filtra los productos en un nuevo array
const handlerEventSearchProduct = () => {
  searchBookContainer.innerHTML = ''

  const filterSearchProducts = booksSearch.filter((book) => {
    if (book.title.toLowerCase().includes(inputSearchNavbar.value.toLowerCase())) {
      return book;
    }
  });

  if (inputSearchNavbar.value.length === 0) {
    searchBookContainer.innerHTML = "";
    return true;
  }
  if(filterSearchProducts.length <= 0){
    searchBookContainer.appendChild(notSearchProductLst())
    return true;
  }
  if (filterSearchProducts.length > 0) {
    searchBookContainer.appendChild(
      createContainerResultSearch(filterSearchProducts)
    );
  }
};

const handleMaxCharacter = () => {
  if(inputSearchNavbar.value.length > 25){
    inputSearchNavbar.value = inputSearchNavbar.value.replace(/^(.{25}).*$/, '$1');
  }
}
inputSearchNavbar.addEventListener("input", () => {
  handleMaxCharacter()
  handlerEventSearchProduct();
});
formSearchNavbar.addEventListener("submit", (event) => {
  event.preventDefault();
});
inputSearchNavbar.addEventListener("blur", resetSearchInput);
window.addEventListener('scroll', resetSearchInput);