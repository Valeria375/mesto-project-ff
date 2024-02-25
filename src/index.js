import "./pages/index.css";
import { openModal, closeModal } from "./scripts/modals";

import { initialCards } from "./scripts/cards";

// @todo: Темплейт карточки
const cardTemplete = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
// @todo: Функция создания карточки

const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeImageClose = popupTypeImage.querySelector('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

function openImage(imageSrc, descriptionText) {
  popupImage.src = imageSrc;
  popupImage.alt = descriptionText;
  popupCaption.textContent = descriptionText;
  openModal(popupTypeImage);
};
popupTypeImageClose.addEventListener('click', () => closeModal(popupTypeImage));
function createCard(cardElement, deleteCard , likeCard, openImage) {
  const card = cardTemplete.querySelector(".card").cloneNode(true);
  const imageCont = card.querySelector(".card__image");
  const titleCont = card.querySelector(".card__title");
  const deleteButton = card.querySelector(".card__delete-button");

  titleCont.textContent = cardElement.name;
  imageCont.src = cardElement.link;
  imageCont.alt = cardElement.description;

  deleteButton.addEventListener("click", () => deleteCard(card));
 
  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeCard(likeButton);
  });
  imageCont.addEventListener('click', function() {
    openImage(cardElement.link, cardElement.name);
  });
  return card;
}
function placeCard(card, container) {
  const cardItem = createCard(card, removeCard, likeCard, openImage);
  container.append(cardItem);
}
// @todo: Функция удаления карточки
function removeCard(cardElement) {
  cardElement.remove();
}
 function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}
// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  placeCard(card, cardsContainer);
});

const editProfileButton = document.querySelector(".profile__edit-button");
const formEditProfile = document.querySelector(".popup_type_edit");
editProfileButton.addEventListener("click", function () {
  nameInput.value ='';
  jobInput.value ='';
  openModal(formEditProfile);
  const popClose = formEditProfile.querySelector(".popup__close");
  popClose.addEventListener("click", function () {
    closeModal(formEditProfile);
  });
});

const createNewCard = document.querySelector(".profile__add-button");
const formAddCard = document.querySelector(".popup_type_new-card");
createNewCard.addEventListener("click", function () {
  nameCardInput.value ='';
  linkInput.value ='';
  openModal(formAddCard);
  const popupClose = formAddCard.querySelector(".popup__close");
  popupClose.addEventListener("click", function () {
    closeModal(formAddCard);
  });
});
//изменение форм в модальных окнах
// Находим форму в DOM
const formElement = formEditProfile.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
const formEl = formAddCard.querySelector(".popup__form");
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()
const nameCardInput = formEl.querySelector(".popup__input_type_card-name"); // Воспользуйтесь инструментом .querySelector()
const linkInput = formEl.querySelector(".popup__input_type_url"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  let name = nameInput.value;
  let job = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  const profileTitle = document.querySelector(".profile__title");
  const profileDesc = document.querySelector(".profile__description");
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = name;
  profileDesc.textContent = job;
  closeModal(formEditProfile);
}
function renderCards(element) {
  const newCard = createCard(element, removeCard, likeCard, openImage);
  cardsContainer.prepend(newCard);
}
// форма для сохраниения карточек
function handFormSubmit(evt) {
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
formElement.addEventListener("submit", handleFormSubmit);
formEl.addEventListener("submit", handFormSubmit);
