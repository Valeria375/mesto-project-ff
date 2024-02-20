import "./pages/index.css";
import { openModal, closeModal } from "./scripts/modals";
import { initialCards } from "./scripts/cards";
import { createCardAdd, deleteCard, likeCard } from "./scripts/card";

// @todo: Темплейт карточки
//  const cardTemplete = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
function placeCard(card, container) {
  const cardItems = createCardAdd(card, deleteCard);
  container.append(cardItems);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  placeCard(card, cardsContainer);
});

const editProfile = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_edit");
editProfile.addEventListener("click", function () {
  openModal(popupProfile);
  const popClose = popupProfile.querySelector(".popup__close");
  popClose.addEventListener("click", function () {
    closeModal(popupProfile);
  });
});

const createNewCard = document.querySelector(".profile__add-button");
const popupForm = document.querySelector(".popup_type_new-card");
createNewCard.addEventListener("click", function () {
  openModal(popupForm);
  const popupClose = popupForm.querySelector(".popup__close");
  popupClose.addEventListener("click", function () {
    closeModal(popupForm);
  });
});
//изменение форм в модальных окнах
// Находим форму в DOM
const formElement = popupProfile.querySelector(".popup__form");
const formEl = popupForm.querySelector(".popup__form");
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
function handleFormSubmit(evt) {
  evt.preventDefault();
  let name = nameInput.value;
  let job = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  const profileTitle = document.querySelector(".profile__title");
  const profileDesc = document.querySelector(".profile__description");
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = name;
  profileDesc.textContent = job;
  closeModal(popupProfile);
}
function openImage(imageSrc, captionText) {
  popupImage.src = imageSrc;
  popupImage.alt = captionText;
  popupCaption.textContent = captionText;
  openModal(popupTypeImage);
}
function renderCards(element) {
  const newCard = createCardAdd(element, deleteCard, likeCard, openImage);
  placesList.prepend(newCard);
}
initialCards.forEach((element) => {
  renderCards(element);
});
// форма для сохраниения карточек
// const nameCardInput = formEl.querySelector(".popup__input_type_card-name");
// const linkInput = formEl.querySelector(".popup__input_type_url");

function handFormSubmit(evt) {
  evt.preventDefault();
//   let cardItem = {
//    name: nameCardInput.value,
//     link: linkInput.value,
//  };
//  alert (cardItem);
//   createCard (cardItem);
//   renderCards(cardItem);
alert('fff');
  closeModal(popupForm);
}

formElement.addEventListener("submit", handleFormSubmit);
formEl.addEventListener("submit", handFormSubmit);
