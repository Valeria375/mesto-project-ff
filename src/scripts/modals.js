import { handleLike, removeCard, createCard } from "./card";
import {
  userId,
  cardsContainer,
  avatarButton,
  formAvatar,
  formEditAvatar,
} from "../index";
import { newCard, updateAvatarId } from "./api";

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
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", closeOverlay);
  document.addEventListener("keydown", closeEsc);
}
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closeOverlay);
  document.removeEventListener("keydown", closeEsc);
}
const infoImage = document.querySelector(".popup__image");
export const openImageModal = (item) => {
  infoImage.textContent = item.name;
  infoImage.src = item.link;
  infoImage.alt = item.description;
};
const popupNewCard = document.querySelector(".popup_type_new-card");
function renderLoading(saveButton, status) {
  saveButton.textContent = status;
}
export function handleAddCard() {
  const newCardElement = popupNewCard.querySelector(".popup__form");
  const cardNameInput = newCardElement.querySelector(
    ".popup__input_type_card-name"
  );
  const cardUrlInput = newCardElement.querySelector(".popup__input_type_url");
  function formNewCardSubmit(evt) {
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
  newCardElement.addEventListener("submit", formNewCardSubmit);
}
export function handleEditAvatar() {
  const avatarInput = formAvatar.querySelector(".popup__input_type_url");
  let userAvatar = "";
  function formSubmitAvatar(evt) {
    renderLoading(evt.submitter, "Сохранение...");
    evt.preventDefault();
    updateAvatarId({ avatar: avatarInput.value })
      .then((data) => {
        avatarButton.style = `background-image: url(${data.avatar})`;
        userAvatar = data.avatar;
        closeModal(formEditAvatar);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => renderLoading(evt.submitter, "Сохранить"));
  }
  formAvatar.addEventListener("submit", formSubmitAvatar);
}
