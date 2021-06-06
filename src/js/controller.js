
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import icons from 'url:../img/icons.svg'
import * as model from '../js/model.js';
import recipeView from '../js/views/recipeView.js';

// API for this app
// https://forkify-api.herokuapp.com/v2

const controlSearchResults = function() {
  model.getSearchResults()
};

// Render Spinner in between loading images
const renderSpinner = function(parentEl) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

// Selecting the element to add the markedup HTML below
const recipeContainer = document.querySelector('.recipe');

// Controller for loading the recipe
const controlLoadRecipe = async function() {
  try {

    // Get the id of the recipe from the href url
    const id = window.location.hash.slice(1)
    if (!id) return;
    
    // Clear HTML and then Render Spinner


    renderSpinner(recipeContainer)


    // Awaiting the AJAX call
    await model.loadRecipe(id);

    // Logging data from the state
    console.log(model.state.recipe)

    // Generate recipe markup
    const generateMarkup = `
    <figure class="recipe__fig">
        <img src="${model.state.recipe.imageUrl}" alt="${model.state.recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${model.state.recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${model.state.recipe.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${model.state.recipe.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${model.state.recipe.ingredients.map(ing => {
            return`
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ing.quantity}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                </div>
              </li>
            `
          }).join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${model.state.recipe.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${model.state.recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;

    // Inserting the HTML markup
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', generateMarkup);

  } catch(err) {
    console.error(`My Err ${err}`)
  }

};

// Looping over the hashchange and load events.  This will load the recipe based on a change or just loading.
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlLoadRecipe))


// create init function
//controlSearchResults();
//controlLoadRecipe();