
  function closeOverlay(evt) { 
    if (evt.target === evt.currentTarget) {
      closeModal(evt.target);
    }
  };
  function closeEsc(evt) {
    if (evt.key === 'Escape') {
      const openPopup = document.querySelector('.popup_is-opened')
      closeModal(openPopup);
    }
  };
  export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closeOverlay);
    document.addEventListener('keydown', closeEsc);
  };
  export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closeOverlay);
    document.removeEventListener('keydown', closeEsc);
  };

