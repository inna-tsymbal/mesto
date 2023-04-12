export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._about.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo({ name, job, avatar }) {
    this._name.textContent = name;
    this._about.textContent = job;
    this._avatar.src = avatar;
  }
}