import {API_URL, RES_PER_PAGE, KEY} from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import {getJSON, sendJSON} from './helpers.js';

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

    const { data } = await getJSON(`${API_URL}?search=${query}&key=${KEY}`)

    state.search.query = query;
    state.search.results = data.recipes.map(rec => {
      return {
        id: rec.id,
        imageUrl: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
        ...(rec.key && {key: rec.key}),
      };
    });

    state.search.page = 1;

  } catch(err) {
    // Throw error to controller
    throw error
  }
};

const createRecipeObject = function(data) {
  // Reconfiguring and sending the recipe to the state of the app
  return {
    title: data.recipe.title,
    cookingTime: data.recipe.cooking_time,
    id: data.recipe.id,
    imageUrl: data.recipe.image_url,
    ingredients: data.recipe.ingredients,
    publisher: data.recipe.publisher,
    servings: data.recipe.servings,
    sourceUrl: data.recipe.source_url,
    ...(data.recipe.key && {key: data.recipe.key}),
  };
};

export const loadRecipe = async function(id) {
  try {
    const { data } = await getJSON(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
      else state.recipe.bookmarked = false;

  } catch(err) {
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

  persistBookmarks();
};

export const deleteBookmark = function(id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

export const persistBookmarks = function() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const init = function() {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function() {
  localStorage.clear('bookmarks');
};

export const uploadRecipe = async function(newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
    .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    .map(ing => {
      const ingArr = ing[1]
        .split(',')
        .map(el => el.trim());
      if (ingArr.length !== 3) throw new Error('Wrong ingredient format.  Please use the correct format.')
      const [quantity, unit, description] = ingArr;
      return { quantity: quantity ? +quantity : null, unit, description }
    });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const { data } = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);

  } catch(err) {
      throw err;
  };

};