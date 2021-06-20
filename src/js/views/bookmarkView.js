import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import icons from 'url:../../img/icons.svg'
import View from './View.js'


class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _data;
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _successMessage = '';

  _generateMarkup = function() {
    console.log(this._data)
    return this._data.map(rec => this._generateMarkupPreview(rec)).join('')
  };

  _generateMarkupPreview(rec){
    return `
      <li class="preview">
        <a class="preview__link" href="#${rec.id}">
          <figure class="preview__fig">
          <img src="${rec.imageUrl}" alt="${rec.title}" />
        </figure>
          <div class="preview__data">
            <h4 class="preview__title">${rec.title}</h4>
            <p class="preview__publisher">${rec.publisher}</p>
             <div class="preview__user-generated ${this._data.key ? '' : 'hidden'}">
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

export default new BookmarkView();