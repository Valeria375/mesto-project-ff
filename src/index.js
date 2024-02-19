 import './pages/index.css';
import { openModal, closeModal } from "./scripts/modals";

import { initialCards } from "./scripts/cards";

// @todo: Темплейт карточки
const cardTemplete = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(cardElement, deleteCard) {
  const card = cardTemplete.querySelector(".card").cloneNode(true);
  const imageCont = card.querySelector(".card__image");
  const titleCont = card.querySelector(".card__title");
  const deleteButton = card.querySelector(".card__delete-button");

  titleCont.textContent = cardElement.name;
  imageCont.src = cardElement.link;
  imageCont.alt = cardElement.description;

  deleteButton.addEventListener("click", () => deleteCard(card));

  return card;
}
function placeCard(card, container) {
  const cardItem = createCard(card, removeCard);
  container.append(cardItem);
}
// @todo: Функция удаления карточки
function removeCard(cardElement) {
  cardElement.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  placeCard(card, cardsContainer);
});

const editProfile = document.querySelector('.profile__edit-button');
const popForm = document.querySelector('.popup_type_edit');
editProfile.addEventListener('click', function(){
 openModal(popForm);
 const popClose = popForm.querySelector('.popup__close');
 popClose.addEventListener('click', function(){
  closeModal(popForm);
 })
});

const createNewCard = document.querySelector('.profile__add-button');
const popupForm = document.querySelector('.popup_type_new-card');
createNewCard.addEventListener('click', function(){
  openModal(popupForm);
  const popupClose = popupForm.querySelector('.popup__close');
  popupClose.addEventListener('click', function(){
    closeModal(popupForm);
  })
});
//изменение форм в модальных окнах
// Находим форму в DOM
const formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()
const nameCardInput = formElement.querySelector('.popup__input_type_card-name');// Воспользуйтесь инструментом .querySelector()
const linkInput = formElement.querySelector('.popup__input_type_url');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
   // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
     let name = nameInput.value;
     let job =jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector('.profile__title');
    const profileDesc = document.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = name;
    profileDesc.textContent = job;
    closeModal(popForm);
}
// форма для сохраниения карточек
function handFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  
   let nameCard = nameCardInput.value;
   let cardLink = linkInput.value;
   let cardItem = {
    name: nameCard,
    link: cardLink,
  };
  // Выберите элементы, куда должны быть вставлены значения полей
  placeCard(cardItem, cardsContainer);
  closeModal(popupForm);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
formElement.addEventListener('submit', handFormSubmit);