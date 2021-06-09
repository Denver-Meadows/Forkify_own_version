export const getJSON = async function(url) {
  try {
    const res = await fetch(url)
    const data = await res.json();

    // Checking for correct URL
    if (!res.ok) throw new Error(`${res.statusText} ${res.status}`);

    // Must return the data since we have async function calling an async function.  This will be the resolved value returned from the promise.
    return data;

  } catch(err) {
    throw error
  }
};