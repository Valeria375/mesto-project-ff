//описаны функции для работы с карточками: функция создания карточки,
// функции-обработчики событий удаления и лайка карточки;
const cardTemplate = document.querySelector("#card-template").content;

export function createCardAdd(element, deleteCard, likeCard, openImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = element.link;
  cardImage.alt = element.name;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = element.name;

  likeButton.addEventListener("click", likeCard);
  deleteButton.addEventListener("click", deleteCard);
  cardImage.addEventListener("click", function () {
    openImage(element.link, element.name);
  });
  return cardElement;
}
export function deleteCard(evt) {
  const closeCard = evt.target.closest(".places__item");
  closeCard.remove();
}
export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
