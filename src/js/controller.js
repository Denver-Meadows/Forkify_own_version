import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import icons from 'url:../img/icons.svg'
import * as model from '../js/model.js';
import recipeView from '../js/views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import {MODAL_CLOSE_SEC} from './config.js';

// API for this app
// https://forkify-api.herokuapp.com/v2

// Controller for loading the recipe
const controlLoadRecipe = async function() {
  try {
    
    // 0) Get the id of the recipe from the href url
    const id = window.location.hash.slice(1)
    if (!id) return;
    
    // 1) Render Spinner
    recipeView.renderSpinner();

    // 2) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    
    // 3) Await the data
    await model.loadRecipe(id);

    // 4) Pass the data to the view and render
    recipeView.render(model.state.recipe);

  } catch(err) {
    recipeView.renderError();
  }

};


const controlSearchResults = async function() {
  try {

    // 1) Get user's search result
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Await data
    await model.getSearchResults(query);

    // 3) Render search results
    resultsView.render(model.getSearchResultsPage())
  
    // 4) Render pagination buttons.  Calling render to send the search data to the paginationView.
    paginationView.render(model.state.search)
    
  }catch(err) {
    resultsView.renderError();
  }
};

/**
 *  Recieves page number from paginationView when next or prev button is clicked.  Renders the results and buttons based on the page number.
 * @param {number} goToPage 
 */
const controlPagination = function(goToPage) {
  // 1) Render results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render the pagination buttons based on current page number
  paginationView.render(model.state.search);
};

/**
 * Receives the new number of servings.  Updates the state and renders the new information.
 * @param {number} newServings 
 */
const controlServings = function(newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe)
};

const controlAddBookmark = function() {
  if (!model.state.recipe.bookmarked)
    model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
  
  model.persistBookmarks();
};

const controlAddRecipe = async function(newRecipe) {
  try {
    addRecipeView.renderSpinner();
    // Upload new recipe data
    await model.uploadRecipe(newRecipe)

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    setTimeout(function() {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC*1000);

  } catch(err) {
    console.error(`Hello ${err.message}`);
    addRecipeView.renderError(err.message)
  }
};

const init = function() {
  recipeView.addHandlerRender(controlLoadRecipe);
  recipeView.addHandlerRecipeServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();