// selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-container");
const filterOption = document.querySelector(".filter-todos");

// event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", ckeckRemove);
filterOption.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);

// utility functions
function createElement(tagName, className, body) {
  const element = document.createElement(tagName);
  if (className) {
    element.classList.add(className);
  }
  element.innerHTML = body;

  return element;
}

// functions
function addTodo(e) {
  e.preventDefault();

  const todoBody = `<li>${todoInput.value}</li>
<span><i class="bi bi-trash3"></i></span>
<span><i class="bi bi-check2"></i></span>`;

  if (todoInput.value === "") {
    alert("Please enter todo!");
  } else {
    const todoDiv = createElement("div", "todo", todoBody);
    // append to todo container
    todoList.appendChild(todoDiv);
    saveLocalTodos(todoInput.value);
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
    removeLocalTodo(todo);
    todo.remove();
  }
}

function filterTodos(e) {
  const todos = [...todoList.childNodes];
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      default:
        break;
    }
  });
}

// Local Storage
function saveLocalTodos(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function getLocalTodos() {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = `
  <li>${todo}</li>
  <span><i class="bi bi-trash3"></i></span>
  <span><i class="bi bi-check2"></i></span>
  `;
    todoDiv.innerHTML = newTodo;
    // append to todo container
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodo(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filteredTodos = savedTodos.filter(
    (t) => t !== todo.children[0].innerText
  );
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
}
