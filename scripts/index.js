import { config, initialCards,  formProfile, formCard, profileEditButton, profileAddButton } from './constants.js';

import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";

const formProfileValidation = new FormValidator(formProfile, config);
const formCardValidation = new FormValidator(formCard, config);

formProfileValidation.enableValidation();
formCardValidation.enableValidation();

const userInfo = new UserInfo ({
  nameSelector: '.profile__name', 
  aboutSelector: '.profile__job'
});

const popupWithImage = new PopupWithImage(".popup_image");

popupWithImage.setEventListeners();

const openImagePopup = (data) => {
  popupWithImage.open(data);
}

const handleFormSubmitCard = ({title, link}) => {
  cardList.addItem(createCard({name: title, link: link}));
}

const handleFormSubmitProfile = ({name, job}) => {
  userInfo.setUserInfo({name, job})
}

const popupWithCard = new PopupWithForm('.popup_card', handleFormSubmitCard);
popupWithCard.setEventListeners();

const popupWithProfile = new PopupWithForm('.popup_profile', handleFormSubmitProfile);
popupWithProfile.setEventListeners();

const createCard = (item) => {
  return new Card(item, "#card-template", openImagePopup).generateCard();
}

const cardList = new Section ({
  items: initialCards,
  renderer: createCard,
}, '.cards');
cardList.renderItems();

function handleAddButtonClick() {
  formCardValidation.resetError();
  popupWithCard.open();
};

profileAddButton.addEventListener("click", handleAddButtonClick);

function handleEditButtonClick() {
  popupWithProfile.setInputValues(userInfo.getUserInfo());
  console.log(userInfo.getUserInfo());
  formProfileValidation.resetError();
  popupWithProfile.open();
}

profileEditButton.addEventListener("click", handleEditButtonClick);


