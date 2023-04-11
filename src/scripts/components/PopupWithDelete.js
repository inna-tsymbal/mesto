import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, api) {
    super(popupSelector);
    this._api = api;
  }

  open(idCard, card) {
    super.open();
    this._idCard = idCard;
    this._card = card;
  }

  _deleteCard = () => {
    this.close();
    this._api
      .deleteCard(this._idCard)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  setEventListeners = () => {
    const buttonDeleteCard = this._popup.querySelector(".popup__delete-button");
    buttonDeleteCard.addEventListener("click", () => {
      this._deleteCard(this._idCard);
      this._card.remove();
    });
    super.setEventListeners();
  };
}