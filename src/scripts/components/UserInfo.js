export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._about.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._about.textContent = job;
  }
}
