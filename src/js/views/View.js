import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import icons from 'url:../../img/icons.svg'

export default class View {
  _parentElement;
  _data;
  _successMessage;
  _failureMessage

  /**
   * Data -> State -> Controller -> Render in RecipeView
   * @param {Object} data 
   */
  render = function(data) {
    if (!data || data.length === 0) return this.renderError()

    this._data = data
    const markup = this._generateMarkup();

    this.clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  };

  /**
   * Will compare changes to the DOM and update only those elements that were changed.
   * @param {object} data 
   * @summary Takes in the updated data from the state, generates a newMarkup to compare to the current markup and changes as needed.  Not the best algorithm but works for this small app.
   */
  update = function(data) {
    if (!data || data.length === 0) return this.renderError();

    this._data = data
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent
      };

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
      };
    });
  };

  renderSpinner = function() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `
    this.clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> 
      `
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  };

  renderMessage(message = this._successMessage) {
    const markup = `
      <div class="recipe">
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `
    this.clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  clear = function() {
    this._parentElement.innerHTML = '';
  };

};