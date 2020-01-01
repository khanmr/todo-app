//Get saved todos

const getSavedTodos = function() {
  const todosJSON = localStorage.getItem("todos");

  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

//Save todos
const saveTodos = function(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
};

//Remove todos
const removeTodo = function(id) {
  const todoIndex = todos.findIndex(function(todo) {
    return todo.id === id;
  });

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

//Toggle todos
const toggleTodo = function(id) {
  const todo = todos.find(function(todo) {
    return todo.id === id;
  });

  if (todo) {
    todo.completed = !todo.completed;
  }
};

//Render todos
const renderTodos = function(todos, filters) {
  const todoElement = document.querySelector("#todos");
  const filteredTodos = todos.filter(function(todo) {
    const searchTextMatch = todo.title
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(function(todo) {
    return !todo.completed;
  });

  todoElement.innerHTML = "";
  todoElement.appendChild(generateSummaryDOM(incompleteTodos));

  //   filteredTodos.forEach(function(todo) {
  //     const p = document.createElement("p");
  //     p.textContent = todo.text;
  //     document.querySelector("#todos").appendChild(p);
  //   });

  if (filteredTodos.length > 0) {
    filteredTodos.forEach(function(todo) {
      todoElement.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageElement = document.createElement("p");
    messageElement.classList.add("empty-message");
    messageElement.textContent = "No todos";
    todoElement.appendChild(messageElement);
  }
};

//Get the Note DOM
const generateTodoDOM = function(todo) {
  const todoElement = document.createElement("label");
  const containerElement = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  //Todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  containerElement.appendChild(checkbox);
  checkbox.addEventListener("change", function() {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  //Todo text
  todoText.textContent = todo.title;
  if (todo.completed) {
    todoText.classList.add("completed");
  }
  containerElement.appendChild(todoText);

  //setup container
  todoElement.classList.add("list-item");
  containerElement.classList.add("list-item__container");
  todoElement.appendChild(containerElement);

  //Remove button
  removeButton.textContent = "delete";
  removeButton.classList.add("button", "button--text");
  todoElement.appendChild(removeButton);
  removeButton.addEventListener("click", function() {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoElement;
};

//Get the Summary DOM
const generateSummaryDOM = function(incompleteTodos) {
  const summary = document.createElement("h2");
  const plural = incompleteTodos.length === 1 ? "" : "s";
  summary.classList.add("list-title");
  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`;
  return summary;
};
