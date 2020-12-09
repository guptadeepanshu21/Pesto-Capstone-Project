const USER_DATA_LIMIT = 3;
const INCORRECT_CREDENTIALS_ERROR_MESSAGE =
  "Please Enter Correct Username or Password";
const INVALID_CREDENTIALS_ERROR_MESSAGE =
  "Please Enter Valid Username or Password";
const DEFAULT_ERROR_MESSAGE = "Something Went Wrong!";
const ALL_USERS_DATA_KEY = "users";
const ACTIVE_USER_DATA_KEY = "currentUser";

function getCurrentUser() {
  let currentUser = getKeyFromStore(ACTIVE_USER_DATA_KEY) || "";
  const userList = getUserList();
  let userDetails = userList.find((user) => user.username === currentUser);
  return userDetails;
}

function getUserList() {
  const userList = getKeyFromStore(ALL_USERS_DATA_KEY) || [];
  return userList;
}

function checkIfUserExists(username) {
  const userList = getUserList();
  const user = userList.find((user) => user.username === username);
  return user ? true : false;
}

function validateUser(username, password) {
  const userList = getUserList();
  const user = userList.find(
    (user) => user.username === username && user.password === password
  );
  return user ? true : false;
}

function addUser(username, password) {
  if (username && password) {
    let userList = getUserList();
    let newUser = { username, password, groceryList: [] };
    if (userList.length < USER_DATA_LIMIT) {
      userList.push(newUser);
    } else {
      userList.splice(0, 1);
      userList.push(newUser);
    }
    saveKeyInStore(ALL_USERS_DATA_KEY, userList);
  } else {
    setError(INVALID_CREDENTIALS_ERROR_MESSAGE);
  }
}

function loginUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const isExistingUser = checkIfUserExists(username);
  let isAuthenticated = validateUser(username, password);
  if (isExistingUser && isAuthenticated) {
    saveKeyInStore(ACTIVE_USER_DATA_KEY, username);
  } else if (!isExistingUser) {
    addUser(username, password);
    saveKeyInStore(ACTIVE_USER_DATA_KEY, username);
  } else {
    setError(INCORRECT_CREDENTIALS_ERROR_MESSAGE);
  }
}

function logoutUser() {
  deleteKeyFromStore(ACTIVE_USER_DATA_KEY);
}

function setError(message = DEFAULT_ERROR_MESSAGE) {
  alert(message);
  throw new Error(message);
}
