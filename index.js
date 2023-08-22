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

  const todoObject = createTodoObject(todoText);
  const todoDiv = createTodoElement(todoObject);
  todoList.appendChild(todoDiv);
  saveTodoToLocal(todoObject);
  todoInput.value = "";
}

function createTodoObject(todoText) {
  const uniqueId = new Date().getTime();
  return {
    id: uniqueId,
    text: todoText,
    completed: false,
  };
}

function createTodoElement(todoObject) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.innerHTML = `
    <li data-id=${todoObject.id}>${todoObject.text}</li>
    <span><i class="bi bi-trash3"></i></span>
    <span><i class="bi bi-check2"></i></span>
  `;
  if (todoObject.completed) {
    todoDiv.classList.add("completed");
  }
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
  const todoId = todo.querySelector("li").dataset.id;
  todo.classList.toggle("completed");

  const todoObject = findUniqueTodo(Number(todoId));
  todoObject.completed = !todoObject.completed;
  saveTodoToLocal(todoObject);
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

function saveTodoToLocal(todoObject) {
  const savedTodos = getSavedTodos();
  const todo = findUniqueTodo(todoObject.id);

  if (!todo) {
    savedTodos.push(todoObject);
  } else {
    const index = savedTodos.findIndex((todo) => todo.id === todoObject.id);
    savedTodos[index] = todoObject;
  }

  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function getSavedTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function loadTodos() {
  const savedTodos = getSavedTodos();
  savedTodos.forEach((todoObject) => {
    const todoDiv = createTodoElement(todoObject);
    todoList.appendChild(todoDiv);
  });
}

function removeTodoFromLocal(todoText) {
  const savedTodos = getSavedTodos();
  const updatedTodos = savedTodos.filter((todo) => todo.text !== todoText);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

function findUniqueTodo(todoId) {
  const savedTodos = getSavedTodos();
  const todo = savedTodos.find((todo) => todo.id === todoId);
  return todo;
}
