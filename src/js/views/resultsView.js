import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import icons from 'url:../../img/icons.svg'
import View from './View.js'


class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _data;
  _errorMessage = 'Sorry, please try searching for another recipe.';
  _successMessage = '';

  _generateMarkup = function(){
    // Loop over the returned data and generate the markup.
    return this._data.map(rec => this._generatePreviewMarkup(rec)).join('')
  };

  /**
   * Receive object of recipe results and generate markup to be rendered
   * @param {object} rec 
   */
  _generatePreviewMarkup(rec){
    return `
      <li class="preview">
        <a class="preview__link" href="#${rec.id}">
          <figure class="preview__fig">
            <img src="${rec.imageUrl}" alt="${rec.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${rec.title}</h4>
            <p class="preview__publisher">${rec.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `
  };

};

export default new ResultsView();