const CART_LIMIT = 5;

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
  localStorage.setItem(ALL_USERS_DATA_KEY, JSON.stringify(updatedUserList));
  getItemList();
}

function addItemToList() {
  let newItem = document.getElementById("new-item").value;
  let savedList = getGroceryList();

  if (newItem && !savedList.includes(newItem)) {
    if (savedList && savedList.length < CART_LIMIT) {
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

function renderListItem(item) {
  return `<li class="grocery-list-item">
      <span class="item">
        ${item}
      </span>
      <span onclick="getItemList('${item}')" title="Edit">
        <i class="fa fa-pencil icon"></i>
      </span>
      <span onclick="deleteItemFromList('${item}')" title="Delete">
        <i class="fa fa-remove icon"></i>
      </span>
    </li>`;
}

function renderListItemEdit(item, editingItem) {
  return `<li class="grocery-list-item">
    <span class="field item">
      <input type='textarea' placeholder='Item Name' 
        id='edit-item' autofocus='true' value='${item}' />
    </span>
    <span onclick="addEditedItemToList('${editingItem}')" title="Save">
      <i class="fa fa-check icon"></i>
    </span>
    <span onclick="deleteItemFromList('${item}')" title="Delete">
      <i class="fa fa-remove icon"></i>
    </span>
  </li>`;
}

function renderNewItem() {
  return `<li class="grocery-list-item">
  <span class="field item">
    <input type='textarea' id='new-item' autofocus='true' placeholder='Item Name'/>
  </span>
  <span onclick='addItemToList()' class="plus-icon" title="Add">
    <i class="fa fa-plus icon"></i>
  </span>
</li>`;
}

function getItemList(editingItem) {
  let savedList = getGroceryList();

  let savedItemsHtml = "";
  const newItemHtml = renderNewItem();

  savedList &&
    savedList.map((item) => {
      let itemHtml = renderListItem(item);
      if (editingItem && item === editingItem) {
        itemHtml = renderListItemEdit(item, editingItem);
      }
      savedItemsHtml += itemHtml;
    });

  // limit user adding new items upto Cart Limit
  if (savedList && savedList.length < CART_LIMIT) {
    savedItemsHtml += newItemHtml;
  }

  const listHtml = `<ul class="grocery-list">${savedItemsHtml}</ul>`;

  const itemsCountHtml = `<div class="items-count">
      <div>
        Cart Limit : ${CART_LIMIT}
      </div>
      <div>
        Items Left : ${CART_LIMIT - savedList.length}
      </div>
    </div>`;

  const saveButtonHtml = `<div class="save-button">
    <input type="button" onclick="handleSave()" class="fetch-button" value="Save & Exit"  />
  </div>`;

  document.getElementById("main-content").innerHTML = itemsCountHtml + listHtml + saveButtonHtml;
}
