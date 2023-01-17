let popupElement = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popupElement.querySelector('.popup__close-button');
let formElement = popupElement.querySelector('.popup__field');
let popupSaveButton = formElement.querySelector('.popup__save-button');
let nameInput = formElement.querySelector('.popup__person_name');
let professionInput = formElement.querySelector('.popup__person_profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

let popupOpen = function(){
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    professionInput.value = profileProfession.textContent;
}
popupOpenButton.addEventListener('click', popupOpen);

let popupClose = function(){
    popupElement.classList.remove('popup_opened');
}
popupCloseButton.addEventListener('click', popupClose);

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;
    popupClose();
}

formElement.addEventListener('submit', handleFormSubmit);