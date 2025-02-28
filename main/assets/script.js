const addButton = document.getElementById("add");
const inputBox = document.getElementById("input-box");

// Methods

function addItem() {
    const toDoString = document.getElementById("input-box").value;
    if (toDoString.trim() === "") return;

    const parent = document.getElementById('todo-item-container');

    const newItem = document.createElement('div');
    newItem.classList.add('item-container', 'flex', 'max-w-full', 'overflow-hidden', 'bg-amber-200');
    newItem.id = 'todo-item';
    newItem.innerHTML = `
        <div class="flex items-center w-10/12">
              <input
                type="checkbox"
                name="task-complete"
                class="complete-btn appearance-none w-4 h-4 bg-white checked:bg-green-400 text rounded-2xl flex-shrink-0"
              />
              <h2 class="ml-2 todo-label">${toDoString}</h2>
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

    parent.insertBefore(newItem, parent.firstChild);
    document.getElementById("input-box").value = "";

    newItem.querySelector(".del-btn").addEventListener("click", removeItem);
    newItem.querySelector(".edit-btn").addEventListener("click", editItem);
}

function editItem() {
    const item = this.closest('.item-container');
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
        }
    });
}

function removeItem() {
    const item = this.closest('.item-container');
    item.remove();
}

// Event Listeners

addButton.addEventListener("click", addItem);

inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addItem();
    }
});