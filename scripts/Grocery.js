function getGroceryList() {
  const currentUser = getCurrentUser();
  let groceryList = currentUser ? currentUser.groceryList : [];
  return groceryList;
}

function saveGroceryListInStore(groceryList) {
  const currentUser = getCurrentUser();
  let users = getUserList();
  let updatedUserList = users.map((user) => {
    if (user.username === currentUser.username) {
      user.groceryList = groceryList;
    }
    return user;
  });
  localStorage.setItem("users", JSON.stringify(updatedUserList));
  getItemList();
}

function addItemToList() {
  let newItem = document.getElementById("new-item").value;
  let savedList = getGroceryList();

  if (newItem && !savedList.includes(newItem)) {
    if (savedList && savedList.length < 5) {
      savedList = [...savedList, newItem];
      saveGroceryListInStore(savedList);
    } else {
      savedList = [newItem];
      saveGroceryListInStore(savedList);
    }
  } else {
    getItemList();
  }
}

function addEditedItemToList(editingItem) {
  let savedList = getGroceryList();
  const editedItemName = document.getElementById("edit-item").value;
  let editedItemIndex =
    savedList && savedList.findIndex((item) => item === editingItem);

  if (editedItemIndex >= 0) savedList[editedItemIndex] = editedItemName;
  saveGroceryListInStore(savedList);
}

function deleteItemFromList(deletedItem) {
  let savedList = getGroceryList();
  let deletedItemIndex =
    savedList && savedList.findIndex((item) => item === deletedItem);

  if (deletedItemIndex >= 0) savedList.splice(deletedItemIndex, 1);
  saveGroceryListInStore(savedList);
}

function handleFetchOldList() {
  loginUser();
  getItemList();
}

function handleFetchNewList() {
  loginUser();
  saveGroceryListInStore([]);
  getItemList();
}

function handleSave() {
  logoutUser();
  location.href = "index.html";
}

function getItemList(editingItem) {
  let savedList = getGroceryList();

  let savedItemsHtml = "";
  const newItemHtml = `<li class="grocery-list-item">
      <span class="field item">
        <input type='textarea' id='new-item' placeholder='Item Name'/>
      </span>
      <span onclick='addItemToList()' class="plus-icon">
        <i class="fa fa-plus icon"></i>
      </span>
    </li>`;

  savedList &&
    savedList.map((item) => {
      let itemHtml = `<li class="grocery-list-item"><span class="item">
        ${item}
      </span>
      <span onclick="getItemList('${item}')">
        <i class="fa fa-pencil icon"></i>
      </span>
      <span onclick="deleteItemFromList('${item}')">
        <i class="fa fa-remove icon"></i>
      </span>
      </li>`;
      if (editingItem && item === editingItem) {
        itemHtml = `<li class="grocery-list-item"><span class="field item"><input type='textarea' placeholder='Item Name' id='edit-item' value='${item}' /></span><span onclick="addEditedItemToList('${editingItem}')">
          <i class="fa fa-check icon"></i>
        </span>
        <span>
        <i class="fa fa-remove icon"></i>
        </span>
      </li>`;
      }
      savedItemsHtml += itemHtml;
    });
  if (savedList && savedList.length < 5) {
    savedItemsHtml += newItemHtml;
  }

  const listHtml = `<ul class="grocery-list">${savedItemsHtml}</ul>`;

  document.getElementById("main-content").innerHTML = listHtml;
  if (savedList && savedList.length)
    document.getElementById(
      "main-content"
    ).innerHTML += `<div class="save-button"><input type="button" onclick="handleSave()" class="fetch-button" value="Save & Exit"  /></div>`;
}
