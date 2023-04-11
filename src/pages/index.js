import "./index.css";

import {
  config,
  formCard,
  formProfile,
  formAvatar,
  profileEditButton,
  profileAddButton,
  profileOverlay,
} from "../scripts/utils/constants.js";

import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithDelete from "../scripts/components/PopupWithDelete.js";
import Api from "../scripts/components/Api.js";

let userId;
let cardsList;

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__job",
  avatarSelector: ".profile__avatar-img",
});

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-63/",
  headers: {
    authorization: "86cb0e0c-371a-42a2-8a62-1fa7a868a09c",
    "content-Type": "application/json",
  },
});

const popupWithDelete = new PopupWithDelete(".popup_delete", api);
popupWithDelete.setEventListeners();

// initialize Сlass Card
function createCard(
  { data, handleCardClick, handleLikeClick, handleDeleteIconClick },
  templateCard,
  api,
  id
) {
  const card = new Card(
    { data, handleCardClick, handleLikeClick, handleDeleteIconClick },
    templateCard,
    api,
    id
  );

  return card;
}

function initialSection({ items, renderer }, containerSelector) {
  const arrayObjectsDataCards = new Section(
    { items, renderer },
    containerSelector
  );

  return arrayObjectsDataCards;
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
    cardsList = initialSection(
      {
        items: cards,
        renderer: (item) => {
          const card = createCard(
            {
              data: {
                link: item.link,
                name: item.name,
                likes: item.likes,
                owner: item.owner._id,
                id: item._id,
              },
              handleCardClick: (evt) => {
                popupWithImage.open(evt.target.src, evt.target.alt);
              },
              handleLikeClick: () => {},
              handleDeleteIconClick: (card) => {
                const idCard = item._id;
                popupWithDelete.open(idCard, card);
                popupWithDelete.setEventListeners();
              },
            },
            "#card-template",
            api,
            userId
          );
          const cardElement = card.generateCard();
          cardsList.addItem(cardElement);
        },
      },
      ".cards"
    );
    cardsList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

// ОТПРАВКА ФОРМЫ КАРТОЧКИ
const handleFormSubmitCard = (data) => {
  api
    .postNewCard(data)
    .then((item) => {
      const newCard = createCard(
        {
          data: {
            link: item.link,
            name: item.name,
            likes: item.likes,
            owner: item.owner._id,
            id: item._id,
          },
          handleCardClick: (evt) => {
            popupWithImage.open(evt.target.src, evt.target.alt);
          },
          handleLikeClick: () => {},
          handleDeleteIconClick: (card) => {
            popupWithDelete.open(item._id, card);
            popupWithDelete.setEventListeners();
          },
        },
        "#card-template",
        api,
        userId
      );
      const cardElement = newCard.generateCard();
      cardsList.addItem(cardElement);
      openPopupCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      openPopupCard.isLoad(false);
    });
};

// ОТПРАВКА ФОРМЫ ПРОФИЛЯ
const handleFormSubmitProfile = (data) => {
  api
    .patchUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        job: res.about,
        avatar: res.avatar,
      });
      openPopupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      openPopupProfile.isLoad(false);
    });
};

// ОТПРАВКА ФОРМЫ АВАТАРА
const handleFormSubmitAvatar = (data) => {
  api
    .patchUserAvatar(data)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        job: res.about,
        avatar: res.avatar,
      });
      openPopupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      openPopupAvatar.isLoad(false);
    });
};

// ПОПАП ПРОФИЛЯ
const openPopupProfile = new PopupWithForm(
  ".popup_profile",
  handleFormSubmitProfile
);
openPopupProfile.setEventListeners();

// ПОПАП КАРТОЧКИ
const openPopupCard = new PopupWithForm(".popup_card", handleFormSubmitCard);
openPopupCard.setEventListeners();

// ПОПАП АВАТАРА
const openPopupAvatar = new PopupWithForm(
  ".popup_avatar",
  handleFormSubmitAvatar
);
openPopupAvatar.setEventListeners();

// ПОПАП БОЛЬШОЙ КАРТИНКИ
const popupWithImage = new PopupWithImage(".popup_image");
popupWithImage.setEventListeners();

function handleAddButtonClick() {
  formCardValidation.resetError();
  openPopupCard.open();
}
profileAddButton.addEventListener("click", handleAddButtonClick);

function handleEditButtonClick() {
  openPopupProfile.setInputValues(userInfo.getUserInfo());
  formProfileValidation.resetError();
  openPopupProfile.open();
}
profileEditButton.addEventListener("click", handleEditButtonClick);

function handleProfileOverlayClick() {
  formAvatarValidation.resetError();
  openPopupAvatar.open();
}
profileOverlay.addEventListener("click", handleProfileOverlayClick);

// валидация всех форм
const formProfileValidation = new FormValidator(config, formProfile);
const formCardValidation = new FormValidator(config, formCard);
const formAvatarValidation = new FormValidator(config, formAvatar);
formProfileValidation.enableValidation();
formCardValidation.enableValidation();
formAvatarValidation.enableValidation();
