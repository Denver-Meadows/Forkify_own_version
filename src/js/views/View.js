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
  };

  clear = function() {
    this._parentElement.innerHTML = '';
  };

};