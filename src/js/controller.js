import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import icons from 'url:../img/icons.svg'
import * as model from '../js/model.js';
import recipeView from '../js/views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';


// API for this app
// https://forkify-api.herokuapp.com/v2

// TODO
// view "LEFT OFF HERE"

// Controller for loading the recipe
const controlLoadRecipe = async function() {
  try {

    // Get the id of the recipe from the href url
    const id = window.location.hash.slice(1)
    if (!id) return;
    
    // Render Spinner
    recipeView.renderSpinner();

    // Awaiting the AJAX call
    await model.loadRecipe(id);

    // Passing the data and rendering
    recipeView.render(model.state.recipe);

  } catch(err) {
    recipeView.renderError();
  }

};


const controlSearchResults = async function() {
  try {

    // Get user's search result
    const query = searchView.getQuery();
    if (!query) return;

    await model.getSearchResults(query);

    // Render search results
    resultsView.render(model.getSearchResultsPage(1))
    //resultsView.render(model.state.search.results);

  }catch(err) {
    resultsView.renderError();
  }
};


const init = function() {
  recipeView.addHandlerRender(controlLoadRecipe);
  searchView.addHandlerSearch(controlSearchResults);
}
init();