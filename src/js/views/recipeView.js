import icons from 'url:../../img/icons.svg';
import View from './View.js';
import {Fraction} from 'fractional';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _data;
  _errorMessage = 'Sorry please try searching for another recipe.';
  _successMessage = '';

  /**
   * Publisher/Subscriber function which will render the recipes (see summary).
   * @param {function} handler 
   * @summary Looping over the hashchange and load events.  This will load the recipe based on a hash-change or when loading.
   */
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  };

  /**
   * Listens for the updateServings buttons to be clicked.  Once clicked, it gets the new servings number and passes that to the controller so the new servings can be rendered.
   * @param {function} handler 
   */
  addHandlerRecipeServings(handler) {
    this._parentElement.addEventListener('click', function(e){
      const btn = e.target.closest('.btn-servings');
      if (!btn) return;

      const updateServings = +btn.dataset.updateTo
      if (updateServings > 0) handler(updateServings)
    });
  };

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--bookmark')
      if (!btn) return;

      handler();
    })
  };

  _generateMarkup = function(){
    return`
      <figure class="recipe__fig">
        <img src="${this._data.imageUrl}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn-servings btn--decrease-servings" data-update-to="${this._data.servings - 1}">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn-servings btn--increase-servings" data-update-to="${this._data.servings + 1}">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(ing => this._generateIngMarkup(ing)).join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `
  };

  _generateIngMarkup = function(ing) {
      return`
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity).toString() : ''}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
          </div>
        </li>
      `
  };

};

// Export RecipeView Object
export default new RecipeView();