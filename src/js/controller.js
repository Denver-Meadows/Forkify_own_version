import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import * as model from '../js/model.js';

// API for this app
// https://forkify-api.herokuapp.com/v2

const controlSearchResults = function() {
  model.getSearchResults()
};

const controlRecipe = function() {
  model.getRecipe();
};


// create init function
//controlSearchResults();
controlRecipe();