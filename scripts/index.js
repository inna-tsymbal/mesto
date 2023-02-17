//ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
// переменные попапа профиля
const popupProfile = document.querySelector(".popup_profile");
const popupCloseButtonProfile = popupProfile.querySelector(
  ".popup__close-button_profile"
);
const formProfile = popupProfile.querySelector(".form_profile");
const formInputProfileName = formProfile.querySelector(
  ".form__input_profile_name"
);
const formIntupProfileJob = formProfile.querySelector(
  ".form__input_profile_job"
);

// переменные попапа карточки
const popupCard = document.querySelector(".popup_card");
const popupCloseButtonCard = popupCard.querySelector(
  ".popup__close-button_card"
);
const formCard = popupCard.querySelector(".form_card");
const formInputCardName = formCard.querySelector(".form__input_card_name");
const formInputCardLink = formCard.querySelector(".form__input_card_link");

// переменные попапа картинки
const popupImage = document.querySelector(".popup_image");
const popupCloseButtonImage = popupImage.querySelector(
  ".popup__close-button_image"
);
const popupImagePicture = popupImage.querySelector(".popup__picture");
const popupImagePictureTitle = popupImage.querySelector(
  ".popup__picture-title"
);

// переменные профиля
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// переменные карточки
const cardTemplate = document.querySelector("#card").content;
const cardsContainer = document.querySelector(".cards");
const card = cardTemplate.querySelector(".card");

// ОБЪЯВЛЕНИЕ ФУНКЦИЙ

// функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", closePopupMouse);
  document.addEventListener("keydown", closePopupEsc);
}

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

// функция закрытия попапа по esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

// функция закрытия попапа мышкой по оверлею и кнопке
function closePopupMouse(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(document.querySelector(".popup_opened"));
  }
  if (evt.target === document.querySelector(".popup__close-button")) {
    closePopup(document.querySelector(".popup_opened"));
  }
}

// функция открытия попапа профиля
function openProfilePopup() {
  openPopup(popupProfile);
  formInputProfileName.value = profileName.textContent;
  formIntupProfileJob.value = profileJob.textContent;
}

// функция закрытия попапа профиля
function closeProfilePopup() {
  closePopup(popupProfile);
}

// функция открытия попапа карточки
function openCardPopup() {
  openPopup(popupCard);
}

//функция закрытия попапа карточки
function closeCardPopup() {
  closePopup(popupCard);
}

// функция открытия попапа картинки
function openImagePopup(linkValue, titleValue) {
  popupImagePicture.src = linkValue;
  popupImagePicture.alt = titleValue;
  popupImagePictureTitle.textContent = titleValue;
  openPopup(popupImage);
}

// функция закрытия попапа картинки
function closeImagePopup() {
  closePopup(popupImage);
}

// функция лайка на карточку
function handleLikeClick(evt) {
  evt.target.classList.toggle("card__button-like_active");
}

// функция удаления карточки
function handleDeleteClick(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

// функция создания карточки
function createCard(titleValue, linkValue) {
  const cardAll = card.cloneNode(true);
  const cardImage = cardAll.querySelector(".card__image");
  const cardTitle = cardAll.querySelector(".card__title");
  cardImage.src = linkValue;
  cardImage.alt = titleValue;
  cardTitle.textContent = titleValue;
  cardAll
    .querySelector(".card__button-like")
    .addEventListener("click", handleLikeClick);
  cardAll
    .querySelector(".card__delete")
    .addEventListener("click", handleDeleteClick);
  cardImage.addEventListener("click", () =>
    openImagePopup(linkValue, titleValue)
  );
  return cardAll;
}

// функция добавления карточки
function addCard(titleValue, linkValue) {
  const elementCard = createCard(titleValue, linkValue);
  cardsContainer.prepend(elementCard);
}

// заполнение карточек из цикла
initialCards.forEach(function (item) {
  const title = item.name;
  const link = item.link;
  addCard(title, link);
});

// функция отправки формы профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = formInputProfileName.value;
  profileJob.textContent = formIntupProfileJob.value;
  closeProfilePopup();
}

// функция отправки формы карточки
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  addCard(formInputCardName.value, formInputCardLink.value);
  closeCardPopup();
  evt.target.reset();
}

// ОБРАБОТЧИКИ
profileEditButton.addEventListener("click", openProfilePopup);
popupCloseButtonProfile.addEventListener("click", closeProfilePopup);
profileAddButton.addEventListener("click", openCardPopup);
popupCloseButtonCard.addEventListener("click", closeCardPopup);
popupCloseButtonImage.addEventListener("click", closeImagePopup);
formProfile.addEventListener("submit", handleFormSubmitProfile);
formCard.addEventListener("submit", handleFormSubmitCard);
