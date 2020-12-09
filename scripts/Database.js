function saveKeyInStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
}

function getKeyFromStore(key) {
  try {
    let value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return "";
  } catch (error) {
    console.error(error);
  }
}

function deleteKeyFromStore(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
}
