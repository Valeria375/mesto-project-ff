const cardTemplete = document.querySelector("#card-template").content;

export function createCard(item, cardElement, deleteCard, handleLike, openImage, userId) {
  const card = cardTemplete.querySelector(".card").cloneNode(true);
  const imageCont = card.querySelector(".card__image");
  const titleCont = card.querySelector(".card__title");
  const deleteButton = card.querySelector(".card__delete-button");
  cardElement.id = item._id;
  const cardId = item._id;
  const countLikes = cardElement.querySelector(".count__likes");

  titleCont.textContent = cardElement.name;
  imageCont.src = cardElement.link;
  imageCont.alt = cardElement.description;

  deleteButton.addEventListener("click", function () {
    deleteCard(cardId, cardElement);
  });

  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    handleLike(cardId, likeButton, likeCounter);
  });
  countLikes.textContent = cardElement.likes.length;
  const isLiked = data.likes.some((like) => like._id === userId);
  if (userId !== cardElement.owner._id) {
    deleteButton.style.visibility = "hidden";
  }
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
    likeStates[cardId] = true;
  }

  imageCont.addEventListener("click", function () {
    openImage(cardElement.link, cardElement.name);
  });
  return card;
}
export function handleLike(cardId, likeButton, countLikes) {
  if (likeStates[cardId]) {
    // Убираем лайк
    deleteLike(cardId)
      .then((data) => {
        likeButton.classList.remove("card__like-button_is-active");
        countLikes.textContent = data.likes.length;
        likeStates[cardId] = false;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // Устанавливаем лайк
    addLike(cardId)
      .then((data) => {
        likeButton.classList.add("card__like-button_is-active");
        countLikes.textContent = data.likes.length;
        likeStates[cardId] = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
export function removeCard(cardElement, cardId) {
  cardElement.remove();
}
// export function likeCard(button) {
//   button.classList.toggle("card__like-button_is-active");
// }
