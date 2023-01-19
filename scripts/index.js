let popupElement = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popupElement.querySelector('.popup__close-button');
let formElement = popupElement.querySelector('.popup__field');
let popupSaveButton = formElement.querySelector('.popup__save-button');
let nameInput = formElement.querySelector('.popup__person_about_name');
let JobInput = formElement.querySelector('.popup__person_about_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let popupOpen = function(){
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    JobInput.value = profileJob.textContent;
}
popupOpenButton.addEventListener('click', popupOpen);

let popupClose = function(){
    popupElement.classList.remove('popup_opened');
}
popupCloseButton.addEventListener('click', popupClose);

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = JobInput.value;
    popupClose();
}

formElement.addEventListener('submit', handleFormSubmit);