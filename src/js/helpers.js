import {TIMEOUT_SEC} from './config.js'

/**
 * Timeout function that will return a new promise that will reject after a set number of sections.
 * @param {number} s 
 * @returns promise
 */
const timeout = function(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
 };

 /**
  * Fetch from API and convert to JSON
  * @param {*} url 
  * @returns Resolved value from the promise getJSON returns.
  */
export const getJSON = async function(url) {
  try {

    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); 
    const data = await res.json();

    // Checking for correct URL
    if (!res.ok) throw new Error(`${res.statusText} ${res.status}`);

    return data;

  } catch(err) {
    throw error
  }
};