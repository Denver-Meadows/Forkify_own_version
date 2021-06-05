import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';

export const getSearchResults = async function() {
  try {
    const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza')
    const data = await res.json();
    console.log(data)
    const recipes = data.data.recipes

    
    //id = '5ed6604591c37cdc054bcd09'
  } catch(err) {
    console.error(`My Err - ${err}`)
  }
};

export const getRecipe = async function() {
  try {
    const id = '5ed6604591c37cdc054bcd09'
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
    //console.log(res)
    const { data } = await res.json();
    console.log(data)
    // console.log(data.data.recipe)

    const recipe = {
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
    console.error(`My Err - ${err}`)
  }
};

