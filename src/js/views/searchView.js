import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import icons from 'url:../../img/icons.svg'
import View from './View.js'


class SearchView extends View {
  _parentElement = document.querySelector('.search');

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  };

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  };

  addHandlerSearch(handler) {
    // Listen for submit on the search form element
    this._parentElement.addEventListener('submit', function(e){
      e.preventDefault(); // stop page from reloading
      handler();
    });
  };

};

// Export instance of SearchView class
export default new SearchView();