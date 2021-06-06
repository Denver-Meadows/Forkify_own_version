import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';

export const state = {
  recipe: {
  },
  
};

export const getSearchResults = async function() {
  try {
    const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza')
    const data = await res.json();
    console.log(data)
    const recipes = data.data.recipes;

  } catch(err) {
    console.error(`My Err - ${err}`)
  }
};

export const loadRecipe = async function(id) {
  try {

    // Getting the recipe via the ID
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
    const { data } = await res.json();
    // console.log(data.data.recipe)

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



