import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import icons from 'url:../img/icons.svg'
import * as model from '../js/model.js';
import recipeView from '../js/views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';


// API for this app
// https://forkify-api.herokuapp.com/v2

// TODO
// view "LEFT OFF HERE"

// Controller for loading the recipe
const controlLoadRecipe = async function() {
  try {

    // 1) Get the id of the recipe from the href url
    const id = window.location.hash.slice(1)
    if (!id) return;
    
    // 2) Render Spinner
    recipeView.renderSpinner();

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
    resultsView.render(model.getSearchResultsPage(1))
  
    // 4) Render pagination buttons.  Calling render to send the search data to the paginationView.
    paginationView.render(model.state.search)
    

  }catch(err) {
    resultsView.renderError();
  }
};


const init = function() {
  recipeView.addHandlerRender(controlLoadRecipe);
  searchView.addHandlerSearch(controlSearchResults);
}
init();