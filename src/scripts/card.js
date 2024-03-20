import { deleteCardsId, addLikeId } from "./api";
export function createCard(cardElement, openImage, userId) {
  const cardTemplete = document.querySelector("#card-template").content;
  const card = cardTemplete.querySelector(".card").cloneNode(true);
  const imageCont = card.querySelector(".card__image");
  const titleCont = card.querySelector(".card__title");
  const deleteButton = card.querySelector(".card__delete-button");
  titleCont.textContent = cardElement.name;
  imageCont.src = cardElement.link;
  titleCont.alt = cardElement.name;
  if (cardElement.owner._id !== userId) {
    deleteButton.classList.add("card__delete-button-hidden");
  }
  deleteButton.addEventListener("click", removeCard);
  imageCont.addEventListener("click", function () {
    openImage(imageCont.src, titleCont.textContent);
  });
  card.id = cardElement._id;
  // deleteCardsId(card.id);
  const countLikes = cardElement.likes.length || 0;
  const countLikesN = card.querySelector(".count__likes");
  countLikesN.textContent = countLikes;

  const likeButtonNode = card.querySelector(".card__like-button");
  likeButtonNode.addEventListener("click", () =>
    handleLike(likeButtonNode, card)
  );

  const isLiked = cardElement.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButtonNode.classList.add("card__like-button_is-active");
  }
  return card;
}

// export function likeCard(button) {
//   button.classList.toggle("card__like-button_is-active");
// }

export function removeCard(event,deletedCardid) {
  // const deletedCard = event.target.closest(".card");
  // console.log(deletedCard.id);
  deleteCardsId(deletedCardid)
    .then(event.target.closest(".card").remove())
    .catch((err) => console.error(`Ошибка удаления карточки: ${err}`));
}
export function handleLike(likeButton, cardElem) {
  const myLikeCard = likeButton.classList.contains(
    "card__like-button_is-active"
  );
  const cardId = cardElem.id;
  const countLikesN = cardElem.querySelector(".count__likes");
  //countLikesN.textContent = countLikes;
  if (!myLikeCard) {
    addLikeId(cardId, false)
      .then((result) => {
        likeButton.classList.add("card__like-button_is-active");
        const countLikes = result.likes.length || 0;
        countLikesN.textContent = countLikes;
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  } else if (myLikeCard) {
    addLikeId(cardId, true)
      .then((result) => {
        likeButton.classList.remove("card__like-button_is-active");
        const countLikes = result.likes.length || 0;
        countLikesN.textContent = countLikes;
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }
}
