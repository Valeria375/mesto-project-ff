const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "740407e5-70ef-4fe0-948f-c17906163d1e",
    "Content-Type": "application/json",
  },
};
function check(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
}
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(check);
};
export const getUserMe = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(check);
};
export const postNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(name, link),
  }).then(checkResponse);
};
export const getData = () => {
  return Promise.all([getUserMe(), getInitialCards()]);
};
export const newProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(check);
};
export const newCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(check);
};
export const deleteCardsId = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(check);
};
// export const addLikeId = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: "PUT",
//     headers: config.headers,
//   }).then(check);
// };
export const addLikeId = (id, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: config.headers,
  }).then(check);
};
// export const deleteLikeId = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: "DELETE",
//     headers: config.headers,
//   }).then(check);
// };
export const updateAvatarId = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(avatar),
  }).then(check);
};