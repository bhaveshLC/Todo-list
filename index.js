const textInput = document.getElementById("text-input");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const itemList = document.getElementById("items");
let listItem = [];
let storedTask = localStorage.getItem("list");
if (storedTask) {
  listItem = JSON.parse(storedTask);
}
displayList();

addBtn.addEventListener("click", () => {
  let text = textInput.value;
  if (text.trim() !== "") {
    listItem.push({ task: text, completed: false });
    localStorage.setItem("list", JSON.stringify(listItem));
    displayList();
  } else {
    alert("Enter Task Please");
  }
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  listItem = [];
  displayList();
});

function displayList() {
  let text = "";
  for (let i = 0; i < listItem.length; i++) {
    text += `<div>
                    <div class="item">
                        <li onclick="completedTask(${i})" style="text-decoration: ${
                            listItem[i].completed ? "line-through" : "none"}; cursor:pointer;">
                                ${listItem[i].task}
                        </li>
                    </div>
                    <div class="btns">
                        <button class="editBtn" onclick="editItem(${i})">Edit</button>
                        <button class="deleteBtn" onclick="deleteItem(${i})">Delete</button>
                    </div>
                </div>`;
  }
  itemList.innerHTML = text;
  textInput.value = "";
}

function editItem(index) {
  const itemContainer = document.querySelectorAll(".item")[index];
  const buttons = document.querySelectorAll(".btns")[index];
  itemContainer.innerHTML = `<input class="item-input" type="text" value="${listItem[index].task}" style="font-size:20px;border:none; outline: none;">`;
  buttons.innerHTML = `<button style="background-color:skyblue" onclick="saveItem(${index})">Save</button>`;
}

function saveItem(index) {
  const inputField = document.querySelector(".item-input");
  const newTask = inputField?.value;
  console.log(index)
  if (newTask.trim() !== "") {
    listItem[index].task = newTask;
    localStorage.setItem("list", JSON.stringify(listItem)); 
    displayList();
  } else {
    alert("Task cannot be empty");
  }
}

function deleteItem(index) {
  listItem.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(listItem)); 
  displayList();
}

function completedTask(index) {
  listItem[index].completed = !listItem[index].completed;
  localStorage.setItem("list", JSON.stringify(listItem));
  displayList();
}
