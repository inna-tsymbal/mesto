export default class Popup {
    constructor (popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._popupButtonClose = this._popup.querySelector(".popup__close-button");
    };

    open() {
        this._popup.classList.add("popup_opened");
        this.setEventListeners();
        this._handleEscClose();
    }

    close() {
        this._popup.classList.remove("popup_opened");
    }

    _handleEscClose() {
      document.addEventListener('keydown', (evt) => {
        if (evt.key === "Escape") {
          this.close();
            }
      })
    }
  
    setEventListeners() {
      this._popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
          this.close()
        } 
        if (evt.target === this._popupButtonClose) {
          this.close()
        }
    })
  }
}

