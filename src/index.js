import "./pages/index.css";
import { openModal, closeModal } from "./scripts/modals";
import { initialCards } from "./scripts/cards";
import { createCard, removeCard, handleLike } from "./scripts/card";
// import {
//   getInitialCards,
//   getUserMe,
//   updateAvatarId,
//   newCard,
//   newProfile,
//   getData,
// } from "./scripts/api";
// import {
//   enableValidation,
//   clearValidation,
//   enableSt,
// } from "./scripts/validation";
// @todo: Темплейт карточки
// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
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
const profileImg = document.querySelector(".profile__image");
const closeEditProfileButton = formEditProfile.querySelector(".popup__close");
const editAvatar = document.querySelector(".popup__edit-avatar");
const formAvatar = editAvatar.querySelector(".popup__form");
// getData()
//   .then((res) => {
//     const [userData, cardsData] = res;
//     const userName = userData.name;
//     const userAbout = userData.about;
//     const userAvatar = userData.avatar;
//     const userId = userData._id;
//     const profileImage = document.querySelector(".profile__image");
//     profileImage.style.backgroundImage = `url(${userAvatar})`;
//     const profileTitle = document.querySelector(".profile__title");
//     profileTitle.textContent = userName;
//     const profileDescription = document.querySelector(".profile__description");
//     profileDescription.textContent = userAbout;
//     cardsData.forEach((card) => {
//       const cardElement = createCard(
//         userId,
//         card,
//         removeCard,
//         handleLike,
//         openImage
//       );
//       cardsContainer.append(cardElement);
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });

function openImage(imageSrc, descriptionText) {
  popupImage.src = imageSrc;
  popupImage.alt = descriptionText;
  popupCaption.textContent = descriptionText;
  openModal(popupTypeImage);
}
popupTypeImageClose.addEventListener("click", () => closeModal(popupTypeImage));
function placeCard(card, container) {
  const cardItem = createCard(card, removeCard, handleLike, openImage);
  container.append(cardItem);
}
initialCards.forEach((card) => {
  placeCard(card, cardsContainer);
});
editProfileButton.addEventListener("click", function () {
  // clearValidation(enableSt, formProfile);
  openModal(formEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
});
closeEditProfileButton.addEventListener("click", function () {
  closeModal(formEditProfile);
});
createNewCard.addEventListener("click", function () {
  // clearValidation(enableSt, formCard);
  openModal(formAddCard);
});
popupTypeImageClose.addEventListener("click", function () {
  closeModal(formAddCard);
});
avatarPopupOpenButton.addEventListener("click", () => {
  // clearValidation(formAvatar, enableSt);
  openModal(editAvatar);
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
  closeModal(formEditProfile);
}
function renderCards(element) {
  const newCard = createCard(element, removeCard, openImage);
  cardsContainer.prepend(newCard);
}
// форма для сохраниения карточек
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  let nameCard = nameCardInput.value;
  let cardLink = linkInput.value;
  let cardItem = {
    name: nameCard,
    link: cardLink,
  };
  // Выберите элементы, куда должны быть вставлены значения полей
  renderCards(cardItem);
  closeModal(formAddCard);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener("submit", handleProfileFormSubmit);
formCard.addEventListener("submit", handleCardFormSubmit);

// getInitialCards()
//   .then((result) => {
//     const userInfo = result[0];
//     const initialCardsArr = result[1];
//     fillProfileInfo(userInfo);
//     renderCards(initialCardsArr);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
const fillProfileInfo = (userInfo) => {
  profileTitle.textContent = userInfo.name;
  profileDesc.textContent = userInfo.about;
  profileImg.style.backgroundImage = `url(${userInfo.avatar})`;
};
// enableValidation(enableSt);
