export default class Card {
  constructor(data, templateSelector, openImagePopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
    this._popupImage = document.querySelector(".popup_image");
    this._popupImagePicture = this._popupImage.querySelector(".popup__picture");
    this._popupImagePictureTitle = this._popupImage.querySelector(".popup__picture-title");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card");
    return cardElement;
  }

  _handleTrashImageClick() {
    this._element.remove();
  }

  _handleLikeImageClick() {
    this._elementLikeImage.classList.toggle("card__button-like_active");
  }

  _handleImageClick() {
    this._openImagePopup({name: this._name, link: this._link});
  }

  _setEventListeners() {

    this._elementLikeImage
      .addEventListener("click", () => {
        this._handleLikeImageClick();
      });

    this._elementTrashImage
      .addEventListener("click", () => {
        this._handleTrashImageClick();
      });

    this._elementImage
      .addEventListener("click", () => {
        this._handleImageClick();
      });
  }

  generateCard() {
    this._element = this._getTemplate().cloneNode(true);
    this._elementTitle = this._element.querySelector(".card__title");
    this._elementImage = this._element.querySelector(".card__image");
    this._elementTrashImage =  this._element.querySelector(".card__delete");
    this._elementLikeImage = this._element.querySelector(".card__button-like");
    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}
