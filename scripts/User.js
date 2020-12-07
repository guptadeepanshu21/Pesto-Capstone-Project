function getCurrentUser() {
  let currentUser = localStorage.getItem("currentUser") || "";
  const userList = getUserList();
  let userDetails = userList.find((user) => user.username === currentUser);
  return userDetails;
}

function getUserList() {
  const userList = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];
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
    if (userList.length < 3) {
      userList.push(newUser);
    } else {
      userList = [userList[1], userList[2], newUser];
    }
    localStorage.setItem("users", JSON.stringify(userList));
  } else {
    setError("Enter valid Username or Password");
  }
}

function loginUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const isExistingUser = checkIfUserExists(username);
  let isAuthenticated = validateUser(username, password);
  if (isExistingUser && isAuthenticated) {
    localStorage.setItem("currentUser", username);
  } else if (!isExistingUser) {
    addUser(username, password);
    localStorage.setItem("currentUser", username);
  } else {
    setError("Enter correct Username or Password");
  }
}

function logoutUser() {
  localStorage.removeItem("currentUser");
}

function setError(message = "Please try again!") {
  alert(message);
  throw new Error(message);
}
