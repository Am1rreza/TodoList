// selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-container");

// event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", ckeckRemove);

// functions
function addTodo(e) {
  e.preventDefault();
  if (todoInput.value === "") {
    alert("Please enter todo!");
  } else {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = `
  <li>${todoInput.value}</li>
  <span><i class="bi bi-trash3"></i></span>
  <span><i class="bi bi-check2"></i></span>
  `;
    todoDiv.innerHTML = newTodo;
    // append to todo container
    todoList.appendChild(todoDiv);
    todoInput.value = "";
  }
}

function ckeckRemove(e) {
  const classList = [...e.target.classList];
  const item = e.target;

  if (classList[1] === "bi-check2") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("completed");
  } else if (classList[1] === "bi-trash3") {
    const todo = item.parentElement.parentElement;
    todo.remove();
  }
}
