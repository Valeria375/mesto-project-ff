import { handleLike, removeCard, createCard } from "./card";
import { userId, cardsContainer } from "../index";
import { newCard } from "./api";

function closeOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}
function closeEsc(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    closeModal(openPopup);
  }
}
export function openModal(popup) {
  // popup.classList.add('popup_is-animated');
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", closeOverlay);
  document.addEventListener("keydown", closeEsc);
}
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closeOverlay);
  document.removeEventListener("keydown", closeEsc);
}
export const openImageModal = (item) => {
  imageModal.src = item.link;
  imageModal.alt = item.name;
  imageModalCaption.textContent = item.name;
};
const popupNewCard = document.querySelector(".popup_type_new-card");
// export function handleAddCard(createCard, deleteCard, placesList) {
//   const newCardFormElement = popupNewCard.querySelector(".popup__form");
//   const cardNameInput = newCardFormElement.querySelector(
//     ".popup__input_type_card-name"
//   );
//   const cardUrlInput = newCardFormElement.querySelector(
//     ".popup__input_type_url"
//   );
// const cardNameInput = newCardFormElement.querySelector(
//   ".popup__input_type_card-name"
// );
// const cardUrlInput = newCardFormElement.querySelector(".popup__input_type_url");
// function renderLoading(saveButton, status) {
//   saveButton.textContent = status;
// }
function renderLoading(saveButton, status) {
  saveButton.textContent = status;
}
export function handleAddCard() {
  const newCardFormElement = popupNewCard.querySelector(".popup__form");
  const cardNameInput = newCardFormElement.querySelector(
    ".popup__input_type_card-name"
  );
  const cardUrlInput = newCardFormElement.querySelector(
    ".popup__input_type_url"
  );
  function handleFormNewCardSubmit(evt) {
    renderLoading(evt.submitter, "Сохранение...");
    evt.preventDefault();
    const card = {
      name: cardNameInput.value,
      link: cardUrlInput.value,
    };
    newCard(card)
      .then((card) => {
        const cardItem = createCard(card, {
          removeCard,
          handleLike,
          openImageModal,
          userId,
        });
        cardsContainer.prepend(cardItem);

        closeModal(popupNewCard);
        cardNameInput.value = "";
        cardUrlInput.value = "";
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => renderLoading(evt.submitter, "Сохранить"));
  }
  newCardFormElement.addEventListener("submit", handleFormNewCardSubmit);
}
