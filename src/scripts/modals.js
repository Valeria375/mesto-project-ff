import { popupTypeImage, popupImage, popupCaption } from "../index";

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
  // popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", closeOverlay);
  document.addEventListener("keydown", closeEsc);
}
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closeOverlay);
  document.removeEventListener("keydown", closeEsc);
}
export function openImage(imageSrc, descriptionText) {
  popupImage.src = imageSrc;
  popupImage.alt = descriptionText;
  popupCaption.textContent = descriptionText;
  openModal(popupTypeImage);
}
// function closeModalByEsc(evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_is-opened");
//     handleCloseModal(openedPopup);
//   }
// }
// export const handleCloseModal = (modalWindow) => {
//   modalWindow.classList.remove("popup_is-opened");
//   document.removeEventListener("keydown", closeModalByEsc);
// };
// export const handleOpenModal = (modalWindow) => {
//   modalWindow.classList.add("popup_is-opened");
//   document.addEventListener("keydown", closeModalByEsc);
// };
