 import './pages/index.css';



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
