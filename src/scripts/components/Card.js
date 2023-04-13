export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteIconClick, handleLikeClick, userId) {
    this._data = data;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
  }

  _getTemplate() {
    this._element = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  updateData(newData) {
    this._likes = newData.likes;
    this.updateLikesView();
  }

  updateLikesView() {
    this._elementNumberLike.textContent = this._likes.length;
    if (this.isLiked()) {
      this._elementButtonLike.classList.add('card__button-like_active');
    } else {
      this._elementButtonLike.classList.remove('card__button-like_active');
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }
  
  
  _setEventListeners() {
    this._elementDelete
      .addEventListener("click", () => {
        this._handleDeleteIconClick();
      });

      this._elementButtonLike
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

      this._elementImage
      .addEventListener("click", () => {
        this._handleCardClick(this._data);
      });
  }


  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }


  generateCard() {
    this._getTemplate();
    this._elementTitle = this._element.querySelector(".card__title");
    this._elementImage = this._element.querySelector(".card__image");
    this._elementButtonLike = this._element.querySelector(".card__button-like");
    this._elementNumberLike = this._element.querySelector(".card__number-like");
    this._elementDelete = this._element.querySelector(".card__delete");
    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    if (this._ownerId !== this._userId) {
      this._elementDelete.classList.add('card__delete_inactive');
    }
    this.updateLikesView();
    this._setEventListeners();
    return this._element;
  }
}