'use strict'

const buttonLoginDesktop = document.querySelector('#buttonLoginDesktop')
const buttonLoginMobile = document.querySelector('#buttonLoginMobile')
const modalLogin = new bootstrap.Modal('#modalLogin')

const handlerModalLogin = () => {
    modalLogin.show()
}
buttonLoginDesktop.addEventListener('click', handlerModalLogin)
buttonLoginMobile.addEventListener('click', handlerModalLogin)