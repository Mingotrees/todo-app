const addButton = document.getElementById("add");
const inputBox = document.getElementById("input-box");

function addItem() {
    const toDoString = document.getElementById("input-box").value;
    if (toDoString.trim() === "") return;

    const parent = document.getElementById('todo-item-container');

    const newItem = document.createElement('div');
    newItem.classList.add('item-container', 'bg-amber-200');
    newItem.id = 'todo-item';
    newItem.innerHTML = `
        <div class="flex justify-center items-center">
            <input type="checkbox" name="task-complete" id="complete-btn" class="appearance-none w-4 h-4 bg-white checked:bg-green-400 text rounded-2xl">
            <h2 class="ml-2">${toDoString}</h2>
        </div>
        <button id="del-btn" class="appearance-none w-9 h-8 cursor-pointer p-1 hover:bg-red-300 transition ease-in duration-300 rounded-2xl">
            <img src="./assets/imgs/delete.svg">
        </button>
    `;

    parent.appendChild(newItem);
    document.getElementById("input-box").value = "";
}

function deleteItem(){
    const parentRem = document.
}

addButton.addEventListener("click", addItem);

inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addItem();
    }
});