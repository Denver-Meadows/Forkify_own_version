import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import icons from 'url:../../img/icons.svg'
import View from './View.js'


class ResultsView extends View {
  _parentElement = document.querySelector('search-results');
  _data;
  _errorMessage = '';
  _successMessage = '';

  _generateMarkup = function(){
    return`
      <li class="preview">
        <a class="preview__link preview__link--active" href="#23456">
          <figure class="preview__fig">
            <img src="src/img/test-1.jpg" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">Pasta with Tomato Cream ...</h4>
            <p class="preview__publisher">The Pioneer Woman</p>
            <div class="preview__user-generated">
              <svg>
                <use href="src/img/icons.svg#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `
  };

};

export default new ResultsView();