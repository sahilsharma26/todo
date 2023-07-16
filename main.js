const container = document.querySelector('.container');
const inputValue = document.querySelector('.input');
const add = document.querySelector('.add');

if (!window.localStorage.getItem("todos")) {
  const todos = [];
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

const todosEX = window.localStorage.getItem("todos");
const todos = JSON.parse(todosEX);

class Item {
  constructor(name) {
    this.createItem(name);
  }

  createItem(name) {
    const itemBox = document.createElement('div');
    itemBox.classList.add('item');

    const input = document.createElement('input');
    input.type = "text";
    input.disabled = true;
    input.value = name;
    input.classList.add('item_input');

    const edit = document.createElement('button');
    edit.classList.add('edit');
    edit.innerHTML = "EDIT";
    edit.addEventListener('click', () => this.edit(input, name));

    const remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = "REMOVE";
    remove.addEventListener('click', () => this.remove(itemBox, name));

    container.appendChild(itemBox);
    itemBox.appendChild(input);
    itemBox.appendChild(edit);
    itemBox.appendChild(remove);
  }

  edit(input, name) {
    if (input.disabled === true) {
      input.disabled = !input.disabled;
    } else {
      input.disabled = !input.disabled;
      const indexof = todos.indexOf(name);
      todos[indexof] = input.value;
      window.localStorage.setItem("todos", JSON.stringify(todos));
    }
  }

  remove(itemBox, name) {
    itemBox.remove();
    const index = todos.indexOf(name);
    todos.splice(index, 1);
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }
}

add.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    check();
  }
});

function check() {
  if (inputValue.value !== "") {
    new Item(inputValue.value);
    todos.push(inputValue.value);
    window.localStorage.setItem("todos", JSON.stringify(todos));
    inputValue.value = "";
  }
}

todos.forEach((todo) => {
  new Item(todo);
});

// new Item("sport");
