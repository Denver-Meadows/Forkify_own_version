import {API_URL} from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import {getJSON} from './helpers.js';


export const state = {
  recipe: {
  },
  
};

export const getSearchResults = async function(query) {
  try {

    const data = await getJSON(`${API_URL}${query}`)

    // showing the data from the pizza search result
    console.log(data)
    // const recipes = data.data.recipes;

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



