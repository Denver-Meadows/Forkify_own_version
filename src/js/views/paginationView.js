import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');


  /**
   * @summary In order for pagination to fully work, we need to have the current page number in the state.  We can then access it for the below calculations.  Then render the proper buttons.  Added data-goto attribute to get the page number dynamically.
   */
  _generateMarkup = function() {
    // Get number of pages & set current page
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    const curPage = this._data.page;

    // Page 1 with other pages
    if (curPage === 1 && numPages > 1) return `
      <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button> 
    `;

    // Page 1 with no other pages
    if (curPage === 1 && numPages === 1) return '';

    // Last page
    if (curPage === numPages && numPages > 1) return `
      <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
    `;

    // Page with pages before and after
    if (curPage < numPages) return `
      <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button> 
    `;
  };

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      // Get page number from the dataset attribute
      const goToPage = +btn.dataset.goto 

      handler(goToPage)

    });
  };

};

export default new PaginationView();