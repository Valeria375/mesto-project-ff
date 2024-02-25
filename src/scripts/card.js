export function createCard(cardElement, deleteCard, likeCard, openImage) {
  const cardTemplete = document.querySelector("#card-template").content;
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
  imageCont.addEventListener("click", function () {
    openImage(cardElement.link, cardElement.name);
  });
  return card;
}
export function removeCard(cardElement) {
  cardElement.remove();
}
export function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}
