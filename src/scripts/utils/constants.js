export {
  config,
  formCard,
  formProfile,
  formAvatar,
  profileEditButton,
  profileAddButton,
  profileOverlay,
};

const formCard = document.querySelector(".form_card");
const formProfile = document.querySelector(".form_profile");
const formAvatar = document.querySelector(".form_avatar");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileOverlay = document.querySelector(".profile__overlay");

const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorInput: "form__input-error_active",
};