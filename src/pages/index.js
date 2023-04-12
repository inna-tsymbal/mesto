import "./index.css";

import {
  validationConfig,
  formCard,
  formProfile,
  formAvatar,
  profileEditButton,
  profileAddButton,
  avatarEditButton,
} from "../scripts/utils/constants.js";

import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
import Api from "../scripts/components/Api.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-63/",
  headers: {
    authorization: "86cb0e0c-371a-42a2-8a62-1fa7a868a09c",
    "content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
    cardsSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

let userId;

const formProfileValidation = new FormValidator(validationConfig, formProfile);
const formCardValidation = new FormValidator(validationConfig, formCard);
const formAvatarValidation = new FormValidator(validationConfig, formAvatar);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__job",
  avatarSelector: ".profile__avatar-img",
});

const popupAvatar = new PopupWithForm(".popup_avatar", (formData) => {
  popupAvatar.renderLoading(true);
  api
    .patchUserAvatar(formData)
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
        avatar: data.avatar,
      });
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
});

const popupProfile = new PopupWithForm(".popup_profile", (formData) => {
  popupProfile.renderLoading(true);
  api
    .patchUserInfo(formData)
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
        avatar: data.avatar,
      });
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.renderLoading(false);
    });
});

const popupCard = new PopupWithForm(".popup_card", (formData) => {
  popupCard.renderLoading(true);
  api
    .postNewCard(formData)
    .then((data) => {
      cardsSection.addItem(data);
      popupCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCard.renderLoading(false);
    });
});

const popupConfirm = new PopupWithConfirmation(".popup_delete");
const popupWithImage = new PopupWithImage(".popup_image");

const createCard = (data) => {
  const card = new Card(
      data,
      "#card-template",
      () => popupWithImage.open(data),
      () => {
        popupConfirm.setConfirm(() => {
          popupConfirm.renderLoading(true);
          api
            .deleteCard(data._id)
            .then(() => {
              card.deleteCard();
              popupConfirm.close();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              popupConfirm.renderLoading(false);
            });
        });
        popupConfirm.open();
      },
      () => {
        if (!card.isLiked()) {
          api
            .putLikeCard(data._id)
            .then((data) => {
              card.updateData(data);
              card.updateLikesView();
            })
            .catch((err) => {
              console.log(err);
            })
        } else {
          api
            .deleteLikeCard(data._id)
            .then((data) => {
              card.updateData(data);
              card.updateLikesView();
            })
            .catch((err) => {
              console.log(err);
            })
        }
      },
      userId,
  )
  return card.generateCard();
}

const cardsSection = new Section((cardItem) => createCard(cardItem), ".cards");


formProfileValidation.enableValidation();
formCardValidation.enableValidation();
formAvatarValidation.enableValidation();

popupConfirm.setEventListeners();
popupWithImage.setEventListeners();
popupProfile.setEventListeners();
popupAvatar.setEventListeners();

profileAddButton.addEventListener("click", () => {
  formCardValidation.resetError();
  popupCard.open();
});
profileEditButton.addEventListener("click", () => {
  formProfileValidation.resetError();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
});
avatarEditButton.addEventListener("click", () => {
  formAvatarValidation.resetError();
  popupAvatar.open();
});

















