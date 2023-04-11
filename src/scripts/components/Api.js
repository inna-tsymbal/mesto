export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  // Проверка ответа
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}users/me/`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}cards/`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Редактирование профиля
  patchUserInfo(data) {
    return fetch(`${this._url}users/me/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      }),
    }).then(this._checkResponse);
  }

  // Добавление новой карточки
  postNewCard(data) {
    return fetch(`${this._url}cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  // Удаление карточки
  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Постановка лайка
  putLikeCard(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Снятие лайка
  deleteLikeCard(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Обновление аватара пользователя
  patchUserAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }
}
