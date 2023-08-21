const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-container");
const filterOption = document.querySelector(".filter-todos");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", handleTodoClick);
filterOption.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", loadTodos);

function addTodo(e) {
  e.preventDefault();
  const todoText = todoInput.value.trim();

  if (todoText === "") {
    alert("Please enter a todo!");
    return;
  }

  const todoDiv = createTodoElement(todoText);
  todoList.appendChild(todoDiv);
  saveTodoToLocal(todoText);
  todoInput.value = "";
}

function createTodoElement(todoText) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.innerHTML = `
    <li>${todoText}</li>
    <span><i class="bi bi-trash3"></i></span>
    <span><i class="bi bi-check2"></i></span>
  `;
  return todoDiv;
}

function handleTodoClick(e) {
  const item = e.target;

  if (item.classList.contains("bi-check2")) {
    toggleTodoCompletion(item);
  } else if (item.classList.contains("bi-trash3")) {
    removeTodoElement(item);
  }
}

function toggleTodoCompletion(item) {
  const todo = item.parentElement.parentElement;
  todo.classList.toggle("completed");
}

function removeTodoElement(item) {
  const todo = item.parentElement.parentElement;
  removeTodoFromLocal(todo.querySelector("li").innerText);
  todo.remove();
}

function filterTodos(e) {
  const todos = [...todoList.childNodes];
  const filterValue = e.target.value;

  todos.forEach((todo) => {
    const isCompleted = todo.classList.contains("completed");
    if (
      filterValue === "all" ||
      (filterValue === "completed" && isCompleted) ||
      (filterValue === "uncompleted" && !isCompleted)
    ) {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  });
}

function saveTodoToLocal(todoText) {
  const savedTodos = getSavedTodos();
  savedTodos.push(todoText);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function getSavedTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function loadTodos() {
  const savedTodos = getSavedTodos();
  savedTodos.forEach((todoText) => {
    const todoDiv = createTodoElement(todoText);
    todoList.appendChild(todoDiv);
  });
}

function removeTodoFromLocal(todoText) {
  const savedTodos = getSavedTodos();
  const updatedTodos = savedTodos.filter((text) => text !== todoText);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}
