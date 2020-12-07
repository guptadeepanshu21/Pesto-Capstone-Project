const addedItem = addedListItem("sugar");

// expect(addedItem).toHave("edit-button");
// expect(addedItem).toHave("delete-button");
// expect(addedItem).text().toBe("sugar");

const editingItem = editModeListItem("sugar", "salt");

// expect(editingItem).toHave("save-button");
// expect(editingItem).toHave("delete-button");
// expect(editingItem).oldText.toBe("sugar");
// expect(editingItem).newText.toBe("salt");
