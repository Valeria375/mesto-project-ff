// @todo: Темплейт карточки
const cardTemplete = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard (card, deleteCard) {
    const content = cardTemplete.querySelector('.card').cloneNode(true);
    const imageCont = content.querySelector('.card__image');
    const titleCont = content.querySelector('.card__title');
    const deleteButton = content.querySelector('.card__delete-button');

    titleCont.textContent = card.name;
    imageCont.src = card.link;
    imageCont.alt = card.description;
    
    deleteButton.addEventListener("click", (event) => deleteCard(event.target.closest(".card")));
    return content;
}   
function placeCard(card, container) {
    const content = createCard(card, removeCard);
    container.append(content);
  }
// @todo: Функция удаления карточки
function removeCard(cardElement) {
    cardElement.remove();
}
// @todo: Вывести карточки на страницу
// for (var i=0; i<initialCards.length; i++){
// cardList.append(creatCard(initialCards[i], removeCard));
// }
initialCards.forEach((card) => {
    placeCard(card, cardList);
  });