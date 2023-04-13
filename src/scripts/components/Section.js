export default class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.reverse().forEach(item => {
      this._renderer(item);
    });
  }

  prependItem(item) { 
    this._container.prepend(item); 
  }

  appendItem(item) { 
    this._container.append(item); 
  }
}