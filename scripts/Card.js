export default class Card {
  constructor(item, templateSelector, openImagePopup) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
  }
  // клонирование разметки карточки
  _getTemplate() {
    const cardAll = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardAll;
  }
  // наполнение разметки карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    return this._element;
  }

  // обработчики
  _setEventListeners() {
    this._element
      .querySelector(".card__button-like")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("card__button-like_active");
      });

    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._element.remove();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._openImagePopup(this._link, this._name);
      });
  }
}