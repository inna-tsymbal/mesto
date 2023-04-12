import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this._inputs = this._popup.querySelectorAll(".form__input");
    this._formButton = this._popup.querySelector(".form__button");
    this._formButtonText = this._formButton.textContent;
  }

  _getInputValues() { 
    const inputsValues = {}; 
    this._inputs.forEach((input) => { 
      inputsValues[input.name] = input.value; 
    }); 
    return inputsValues;
  }

  setInputValues(data) { 
    this._inputs.forEach((input) => { 
      input.value = data[input.name]; 
    }); 
  }

  close() {
    this._form.reset();
    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._formButton.textContent = "Сохранение...";
    } else {
      this._formButton.textContent = this._formButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
