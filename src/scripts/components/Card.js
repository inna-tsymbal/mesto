export default class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleDeleteIconClick },
    templateSelector,
    api,
    id
  ) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._templateSelector = templateSelector;
    this._api = api;
    this._myId = id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._elementTitle = this._element.querySelector(".card__title");
    this._elementImage = this._element.querySelector(".card__image");
    this._elementButtonLike = this._element.querySelector(".card__button-like");
    this._elementNumberLike = this._element.querySelector(".card__number-like");
    this._elementTitle.textContent = this._data.name;
    this._elementImage.src = this._data.link;
    this._elementImage.alt = this._data.name;
    return this._element;
  }

  _setEventListeners() {
    this._showLikes();
    this._showButtonCard();
    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector(".card__button-like")
      .addEventListener("click", () => {
        this._likeCard();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._handleCardClick);
  }

  _showLikes() {
    const numberLike = this._element.querySelector(".card__number-like");
    numberLike.textContent = this._data.likes.length;
    const likeCard = this._element.querySelector(".card__button-like");
    const arrayLikes = this._data.likes;
    arrayLikes.forEach((item) => {
      if (item._id === this._myId) {
        likeCard.classList.add("card__button-like_active");
      } else {
        likeCard.classList.remove("card__button-like_active");
      }
    });
  }

  _showButtonCard() {
    const buttonCard = this._element.querySelector(".card__delete");
    if (this._data.owner !== this._myId) {
      buttonCard.classList.add("card__delete_inactive");
    }
  }

  _handleDeleteCard = () => {
    this._handleDeleteIconClick(this._element);
  };

  deleteCard() {
    this._element.remove();
  }

  _likeCard = () => {
    this._handleLikeClick(this._element);
    this._dataLikes();
  };

  _dataLikes() {
    if (
      !this._elementButtonLike.classList.contains("card__button-like_active")
    ) {
      this._api
        .putLikeCard(this._data.id)
        .then((item) => {
          this._elementButtonLike.classList.add("card__button-like_active");
          this._elementNumberLike.textContent = item.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .deleteLikeCard(this._data.id)
        .then((item) => {
          this._elementButtonLike.classList.remove("card__button-like_active");
          this._elementNumberLike.textContent = item.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}