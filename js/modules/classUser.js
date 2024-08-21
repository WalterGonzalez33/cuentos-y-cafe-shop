"use strict";

class User {
  #userName;
  #userPassword;
  #isAdmin;

  constructor(userName, userPassword, isAdmin = false) {
    this.#userName = userName;
    this.#userPassword = userPassword;
    this.#isAdmin = isAdmin;
  }

  get userName() {
    return this.#userName;
  }
  get userPassword() {
    return this.#userPassword;
  }
  get isAdmin() {
    return this.#isAdmin;
  }

  set userName(newUserName) {
    this.#userName = newUserName;
  }
  set userPassword(newPassword) {
    this.#userPassword = newPassword;
  }
  set isAdmin(newValue) {
    this.#isAdmin = newValue;
  }

  toJSON() {
    return {
      userName: this.userName,
      userPassword: this.userPassword,
      isAdmin: this.isAdmin,
    };
  }
}

export default User;
