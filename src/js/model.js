import {API_URL} from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import {getJSON} from './helpers.js';


export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
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

    console.log(state.search.results);
    console.log(state.search.query)

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
  }
};



