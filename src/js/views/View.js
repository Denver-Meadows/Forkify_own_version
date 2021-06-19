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
   * Controller takes the data from the state and sets it to this._data to be used in the View. Data -> State -> Controller -> Render in RecipeView
   * @param {Object} data 
   * @summary Renders the data to the UI.  If there is no data, render the error.
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

    // 1) Converting the string returned by newMarkup to a new DOM object that lives in the memory, not on the page.
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // 2) Selecting all elements from the newDOM which returns a nodeList, put them in an array so they can be compared to the current DOM elements.
    // const newElements = newDOM.querySelectorAll('*');
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    // 3) Put the current DOM elements in array for comparison.
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // 4) Check for changed Text and updates.  If there isn't a text value, the nodeValue method will return null and the replacement will not take place.
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent
      };

      // 5) Check if any attributes have changed and update. 
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
      };
    });
  };

  // Render Spinner in between loading images
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