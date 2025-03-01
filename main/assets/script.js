const addButton = document.getElementById("add");
const inputBox = document.getElementById("input-box");

// Methods

let todoList = [];

function addItem() {
    const toDoString = document.getElementById("input-box").value;
    if (toDoString.trim() === "") return;
    const newItem = {
        id: Date.now(),
        label: toDoString,
        completed: false
    };

    todoList.unshift(newItem);
    saveToLocalStorage();
    renderItems();
    document.getElementById("input-box").value = "";
}

function renderItems() {
    const parent = document.getElementById('todo-item-container');
    parent.innerHTML = "";

    todoList.forEach(item => {
        const newItem = document.createElement('div');
        newItem.classList.add('item-container', 'flex', 'max-w-full', 'overflow-hidden', 'bg-amber-200');
        newItem.id = 'todo-item';
        newItem.dataset.id = item.id;
        newItem.innerHTML = `
            <div class="flex items-center w-10/12">
                <input
                    type="checkbox"
                    name="task-complete"
                    class="complete-btn appearance-none w-4 h-4 bg-white checked:bg-green-400 text rounded-2xl flex-shrink-0"
                    ${item.completed ? 'checked' : ''}
                />
                <h2 class="ml-2 todo-label">${item.label}</h2>
            </div>
            <div class="flex justify-center items-center">
                <button
                    class="edit-btn appearance-none cursor-pointer w-7 p-1 hover:bg-blue-300 transition ease-in duration-300 rounded-2xl"
                >
                    <img src="./assets/imgs/edit.svg" />
                </button>
                <button
                    class="del-btn appearance-none cursor-pointer w-6 hover:bg-red-300 transition ease-in duration-300 rounded-2xl"
                >
                    <img src="./assets/imgs/delete.svg" />
                </button>
            </div>
        `;

        newItem.querySelector(".del-btn").addEventListener("click", removeItem);
        newItem.querySelector(".edit-btn").addEventListener("click", editItem);
        newItem.querySelector(".complete-btn").addEventListener("click", completedItem);

        parent.insertBefore(newItem, parent.firstChild);
    });
}

function saveToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function loadFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem('todoList')) || [];
    todoList = items;
    renderItems();
}

function editItem() {
    const item = this.closest('.item-container');
    const itemId = item.dataset.id;
    const temp = item.querySelector('.todo-label').textContent;
    const label = item.querySelector('.todo-label');
    const input = document.createElement('input');
    input.classList.add('todo-new-input', 'ml-2', 'w-96', 'overflow-hidden');
    input.value = temp;
    label.replaceWith(input);
    input.focus();

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const newLabel = document.createElement('h2');
            newLabel.classList.add('ml-2', 'todo-label', 'flex-wrap', 'overflow-hidden');
            newLabel.textContent = input.value;
            input.replaceWith(newLabel);

            const itemIndex = todoList.findIndex(item => item.id == itemId);
            todoList[itemIndex].label = input.value;
            saveToLocalStorage();
            renderItems();
        }
    });
}

function removeItem() {
    const item = this.closest('.item-container');
    const itemId = item.dataset.id;
    todoList = todoList.filter(item => item.id != itemId);
    saveToLocalStorage();
    renderItems();
}

function completedItem(){
  const item = this.closest('.item-container');
  const itemId = item.dataset.id;
  const itemIndex = todoList.findIndex(item => item.id == itemId);
  todoList[itemIndex].completed = !todoList[itemIndex].completed;
  saveToLocalStorage();
  renderItems();
}

addButton.addEventListener("click", addItem);

inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addItem();
    }
});


document.addEventListener('DOMContentLoaded', loadFromLocalStorage);