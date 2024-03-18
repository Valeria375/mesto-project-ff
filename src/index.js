import "./pages/index.css";
import {
  openModal,
  closeModal,
  openImageModal,
  handleAddCard,
  handleEditAvatar,
} from "./scripts/modals";
import { initialCards } from "./scripts/cards";
import { createCard, likeCard, removeCard, handleLike } from "./scripts/card";
import {
  getInitialCards,
  getUserMe,
  updateAvatarId,
  newCard,
  newProfile,
  getData,
} from "./scripts/api";
import {
  validationSt,
  enableValidation,
  clearValidation,
} from "./scripts/validation";
// @todo: Темплейт карточки
// @todo: DOM узлы
export const cardsContainer = document.querySelector(".places__list");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeImageClose = popupTypeImage.querySelector(".popup__close");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
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
avatarButton.addEventListener("click", () => {
  clearValidation(formEditAvatar, validationSt);
  openModal(formEditAvatar);
  // avatar.src = "";
});
closeEditAvatar.addEventListener("click", function () {
  closeModal(formEditAvatar);
})
handleEditAvatar();

function openImage(imageSrc, descriptionText) {
  popupImage.src = imageSrc;
  popupImage.alt = descriptionText;
  popupCaption.textContent = descriptionText;
  openModal(popupTypeImage);
}
popupTypeImageClose.addEventListener("click", () => closeModal(popupTypeImage));
function placeCard(card, container) {
  // const cardItem = createCard(card, likeCard, openImage);
  //  container.append(cardItem);
}
initialCards.forEach((card) => {
  placeCard(card, cardsContainer);
});
editProfileButton.addEventListener("click", () => {
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
  let name = nameInput.value;
  let job = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = name;
  profileDesc.textContent = job;
  newProfile(name, job);
  closeModal(formEditProfile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener("submit", handleProfileFormSubmit);
// formCard.addEventListener("submit", handleCardFormSubmit);
enableValidation(validationSt);
export let userId = "";
let userAvatar = "";
Promise.all([getInitialCards(), getUserMe()])
  .then(([initialCards, userData]) => {
    userAvatar = userData.avatar;
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDesc.textContent = userData.about;
    // profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    initialCards.forEach((item) => {
      const cardItem = createCard(item, likeCard, openImage);
      cardsContainer.append(cardItem);
    });
  })
  .catch((err) => {
    console.log(err);
  });
handleAddCard(createCard, removeCard, cardsContainer);
