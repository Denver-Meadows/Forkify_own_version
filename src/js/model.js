import {API_URL, RES_PER_PAGE} from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import {getJSON} from './helpers.js';


export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

/**
 * Gets JSON from query input.  Converts the results to proper format and stores results and query in the state.
 * @param {string} query 
 */
export const getSearchResults = async function(query) {
  try {

    const { data } = await getJSON(`${API_URL}?search=${query}`)

    state.search.query = query;
    state.search.results = data.recipes.map(rec => {
      return {
        id: rec.id,
        imageUrl: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
      };
    });

    state.search.page = 1;

  } catch(err) {
    // Throw error to controller
    throw error
  }
};

export const loadRecipe = async function(id) {
  try {
    // Getting the recipe via the ID
    const { data } = await getJSON(`${API_URL}${id}`);

    // Reconfiguring and sending the recipe to the state of the app
    state.recipe = {
      title: data.recipe.title,
      cookingTime: data.recipe.cooking_time,
      id: data.recipe.id,
      imageUrl: data.recipe.image_url,
      ingredients: data.recipe.ingredients,
      publisher: data.recipe.publisher,
      servings: data.recipe.servings,
      sourceUrl: data.recipe.source_url,
    };

  } catch(err) {
    // Throw error to controller
    throw err
  };
};

/**
 * Receives a page number and returns results we want to render per that page.
 * @param {number} page 
 * @returns Sliced amount of results from the state that correlates to the page number entered.
 * @summary Set the page default to what's in the state.  Then whatever page is entered, that page # is set in the state.
 */
export const getSearchResultsPage = function(page = state.search.page) {
  state.search.page = page
  
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function(newServings) {
  // newQt = oldQt * newServings / oldServings
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * newServings / state.recipe.servings
  });

  state.recipe.servings = newServings;
};

export const addBookmark = function(recipe) {
  state.bookmarks.push(recipe);
  
  if (recipe.id === state.recipe.id) recipe.bookmarked = true;
};
