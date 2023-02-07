// общие переменные для попапа
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSaveButton = popup.querySelector('.popup__save-button');

// переменные попапа профиля 
const popupProfile = document.querySelector('.popup_profile');
const popupCloseButtonProfile = popupProfile.querySelector('.popup__close-button_profile');
const popupFieldProfile = popupProfile.querySelector('.popup__field_profile');
const popupSaveButtonProfile = popupFieldProfile.querySelector('.popup__save-button_profile');
const popupProfileName = popupFieldProfile.querySelector('.popup__about_profile_name');
const popupProfileJob = popupFieldProfile.querySelector('.popup__about_profile_job');

// переменные попапа карточки
const popupCard = document.querySelector('.popup_card');
const popupCloseButtonCard = popupCard.querySelector('.popup__close-button_card');
const popupFieldCard = popupCard.querySelector('.popup__field_card');
const popupSaveButtonCard = popupFieldCard.querySelector('.popup__save-button_card');
const popupCardName = popupFieldCard.querySelector('.popup__about_card_name');
const popupCardLink = popupFieldCard.querySelector('.popup__about_card_link');

// переменные попапа картинки
const popupImage = document.querySelector('.popup_image');
const popupCloseButtonImage = popupImage.querySelector('.popup__close-button_image');
const popupImagePicture = popupImage.querySelector('.popup__picture');
const popupImagePictureTitle = popupImage.querySelector('.popup__picture-title');

// переменные профиля
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// переменные карточки 
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
const cardTemplate = document.querySelector('#card').content;

// функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// открытие попапа профиля
function openProfilePopup() {
  openPopup(popupProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileJob.value = profileJob.textContent;
};
profileEditButton.addEventListener('click', openProfilePopup);

// закрытие попапа профиля 
function closeProfilePopup() {
  closePopup(popupProfile);
  profileName.textContent = popupProfileName.value;
  profileJob.textContent = popupProfileJob.value;
};
popupCloseButtonProfile.addEventListener('click',closeProfilePopup);

// открытие попапа карточки
function openCardPopup() {
  openPopup(popupCard);
};
profileAddButton.addEventListener('click', openCardPopup);

// закрытие попапа карточки
function closeCardPopup() {
  closePopup(popupCard);
};
popupCloseButtonCard.addEventListener('click',closeCardPopup);

// открытие попапа картинки 
function openImagePopup(linkValue, titleValue)  {
  popupImagePicture.src = linkValue;
  popupImagePicture.alt = titleValue;
  popupImagePictureTitle.textContent = titleValue;
  openPopup (popupImage);
};

// закрытие попапа картинки
function closeImagePopup() {
  closePopup(popupImage);
};

// функция лайка
function likeCard(evt) {
  evt.target.classList.toggle('card__button-like_active');
};

// функция удаления карточки
function deleteCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
};

// функция создания карточки
function createCard(titleValue, linkValue) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage =  card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  cardImage.src = linkValue;
  cardImage.alt = titleValue;
  cardTitle.textContent = titleValue;
  card.querySelector('.card__button-like').addEventListener('click', likeCard);
  card.querySelector('.card__trash').addEventListener('click', deleteCard);
  card.querySelector('.card__image').addEventListener('click', () => openImagePopup(linkValue, titleValue));
  popupCloseButtonImage.addEventListener('click', closeImagePopup);
  return card;
};

// функция добавления карточки
function addCard(titleValue, linkValue) {
  const cards = document.querySelector('.cards');
  const elementCard = createCard(titleValue, linkValue);
  cards.prepend(elementCard);
};

// заполнение карточек из цикла
initialCards.forEach(function(item) {
  const title = item.name;
  const link = item.link;
  addCard(title, link);
});

// отправка формы профиля
function handleFormSubmitProfile (evt) {
  evt.preventDefault();
  closeProfilePopup();
};
popupFieldProfile.addEventListener('submit', handleFormSubmitProfile);

// отправка формы карточки 
function handleFormSubmitCard (evt) {
  evt.preventDefault();
  addCard();
  closeCardPopup();
};
popupFieldCard.addEventListener('submit',handleFormSubmitCard);

