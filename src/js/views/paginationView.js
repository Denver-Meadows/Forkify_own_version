import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import icons from 'url:../../img/icons.svg'
import View from './View.js'


class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  /**
   * @summary In order for pagination to fully work, we need to have the current page number in the state.  We can then access it for the below calculations.
   */
  _generateMarkup = function() {
    console.log(this._data)
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    console.log(numPages)
    // Page 1 with other pages
    if (this._data.page === 1 && numPages > 1) return 'Page 1 with other pages';

    // Page 1 with no other pages
    if (this._data.page === 1 && numPages === 1) return 'Page 1 only';

    // Last page
    if (this._data.page === numPages && numPages > 1) return 'Last Page';

    // Page with pages before and after
    if (this._data.page < numPages) return 'Page with other pages'

  };

};

export default new PaginationView();