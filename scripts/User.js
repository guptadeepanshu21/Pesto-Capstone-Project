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

function validateUser(username, password) {
  const userList = getUserList();
  const user = userList.find(
    (user) => user.username === username && user.password === password
  );
  return user;
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
    setError("Enter Username or Password");
    throw new Error("authentication error");
  }
}

function loginUser() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let user = validateUser(username, password);
  if (user) {
    localStorage.setItem("currentUser", user.username);
  } else {
    addUser(username, password);
    localStorage.setItem("currentUser", username);
  }
}

function logoutUser() {
  localStorage.removeItem("currentUser");
}

function setError(message = "Please try again!") {
  alert(message);
}
