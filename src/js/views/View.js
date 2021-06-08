import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import icons from 'url:../../img/icons.svg'

export default class View {
  _parentElement;
  _data;
  _successMessage;
  _failureMessage


  // Data -> State -> Controller -> Render in RecipeView
  render = function(data) {
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

  clear = function() {
    this._parentElement.innerHTML = '';
  };

};