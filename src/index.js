import "./pages/index.css";
import { openModal, closeModal, openImage } from "./scripts/modals";
// import { initialCards } from "./scripts/cards";
import { createCard, likeCard, removeCard, handleLike } from "./scripts/card";
import {
  getInitialCards,
  getUserMe,
  updateAvatarId,
  newCard,
  newProfile,
  getData,
} from "./scripts/api";
import { enableValidation, clearValidation } from "./scripts/validation";
const validationSt = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
// @todo: Темплейт карточки
// @todo: DOM узлы
export const cardsContainer = document.querySelector(".places__list");
export const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeImageClose = popupTypeImage.querySelector(".popup__close");
export const popupImage = popupTypeImage.querySelector(".popup__image");
export const popupCaption = popupTypeImage.querySelector(".popup__caption");
const editProfileButton = document.querySelector(".profile__edit-button");
const formEditProfile = document.querySelector(".popup_type_edit");
const createNewCard = document.querySelector(".profile__add-button");
const formAddCard = document.querySelector(".popup_type_new-card");
const formProfile = formEditProfile.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
const formCard = formAddCard.querySelector(".popup__form");
// Находим поля формы в DOM
const nameInput = formProfile.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formProfile.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()
const nameCardInput = formCard.querySelector(".popup__input_type_card-name"); // Воспользуйтесь инструментом .querySelector()
const linkInput = formCard.querySelector(".popup__input_type_url"); // Воспользуйтесь инструментом .querySelector()
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const closeEditProfileButton = formEditProfile.querySelector(".popup__close");
const closeAddNewCard = formAddCard.querySelector(".popup__close");
//аватар
export const avatarButton = document.querySelector(".profile__image");
export const formEditAvatar = document.querySelector(".popup_type-avatar");
export const formAvatar = formEditAvatar.querySelector(".popup__form");
const closeEditAvatar = formEditAvatar.querySelector(".popup__close");
const linkAvatar = formEditAvatar.querySelector(".popup__input_type_url");
avatarButton.addEventListener("click", () => {
  linkAvatar.value = "";
  clearValidation(formEditAvatar, validationSt);
  openModal(formEditAvatar);
  // avatar.src = "";
});
closeEditAvatar.addEventListener("click", function () {
  closeModal(formEditAvatar);
});
handleEditAvatar();

popupTypeImageClose.addEventListener("click", () => closeModal(popupTypeImage));
// function placeCard(card, container) {
//   // const cardItem = createCard(card, likeCard, openImage);
//   //  container.append(cardItem);
// }
// initialCards.forEach((card) => {
//   placeCard(card, cardsContainer);
// });
editProfileButton.addEventListener("click", () => {
  // nameInput.value = "";
  // jobInput.value = "";
  clearValidation(formEditProfile, validationSt);
  openModal(formEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
});
closeEditProfileButton.addEventListener("click", function () {
  closeModal(formEditProfile);
});
closeAddNewCard.addEventListener("click", function () {
  closeModal(formAddCard);
});
createNewCard.addEventListener("click", () => {
  linkInput.value = "";
  nameCardInput.value = "";
  formCard.reset();
  clearValidation(formAddCard, validationSt);
  openModal(formAddCard);
});
popupTypeImageClose.addEventListener("click", function () {
  closeModal(formAddCard);
});

//изменение форм в модальных окнах
// Находим форму в DOM

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value
  const name = nameInput.value;
  const job = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  newProfile(name, job)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDesc.textContent = result.about;
      // console.log(name);
      // console.log();
    })
    .catch((err) => console.log(err));
  closeModal(formEditProfile);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener("submit", handleProfileFormSubmit);
// formCard.addEventListener("submit", handleCardFormSubmit);

enableValidation(validationSt);
let userId = "";
Promise.all([getInitialCards(), getUserMe()])
  .then(([initialCards, userData]) => {
    let userAvatar = "";
    userAvatar = userData.avatar;
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDesc.textContent = userData.about;
    avatarButton.style.backgroundImage = `url(${userData.avatar})`;
    initialCards.forEach((item) => {
      const cardItem = createCard(item, openImage, userId);
      cardsContainer.append(cardItem);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const popupNewCard = document.querySelector(".popup_type_new-card");
function renderLoading(saveButton, status) {
  saveButton.textContent = status;
}
function handleAddCard() {
  const newCardElement = popupNewCard.querySelector(".popup__form");
  const cardNameInput = newCardElement.querySelector(
    ".popup__input_type_card-name"
  );
  const cardUrlInput = newCardElement.querySelector(".popup__input_type_url");
  function handleNewCardSubmit(evt) {
    renderLoading(evt.submitter, "Сохранение...");
    evt.preventDefault();
    const card = {
      name: cardNameInput.value,
      link: cardUrlInput.value,
    };
    newCard(card)
      .then((card) => {
        const cardItem = createCard(card, openImage, userId);
        cardsContainer.prepend(cardItem);
        closeModal(popupNewCard);
        cardNameInput.value = "";
        cardUrlInput.value = "";
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => renderLoading(evt.submitter, "Сохранить"));
  }
  newCardElement.addEventListener("submit", handleNewCardSubmit);
}
function handleEditAvatar() {
  const avatarInput = formAvatar.querySelector(".popup__input_type_url");
  let userAvatar = "";
  function handleFormSubmitAvatar(evt) {
    renderLoading(evt.submitter, "Сохранение...");
    evt.preventDefault();
    updateAvatarId({ avatar: avatarInput.value })
      .then((data) => {
        avatarButton.style = `background-image: url(${data.avatar})`;
        userAvatar = data.avatar;
        closeModal(formEditAvatar);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(evt.submitter, "Сохранить");
      });
  }
  formAvatar.addEventListener("submit", handleFormSubmitAvatar);
}
handleAddCard(createCard, removeCard, cardsContainer);
