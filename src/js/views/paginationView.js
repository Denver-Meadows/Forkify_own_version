import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import icons from 'url:../../img/icons.svg'
import View from './View.js'


class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  /**
   * @summary In order for pagination to fully work, we need to have the current page number in the state.  We can then access it for the below calculations.  The render the buttons.
   */
  _generateMarkup = function() {
    // Get number of pages
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    // Page 1 with other pages
    if (this._data.page === 1 && numPages > 1) return `
      <button class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button> 
    `;

    // Page 1 with no other pages
    if (this._data.page === 1 && numPages === 1) return '';

    // Last page
    if (this._data.page === numPages && numPages > 1) return `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>
    `;

    // Page with pages before and after
    if (this._data.page < numPages) return `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>
      <button class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button> 
    `;

  };

};

export default new PaginationView();