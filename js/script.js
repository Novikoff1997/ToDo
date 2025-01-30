"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

let toDoData;

const render = () => {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";

  toDoData.forEach((item, index) => {
    const li = document.createElement("li");

    li.classList.add("todo-item");

    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector(".todo-complete").addEventListener("click", () => {
      item.completed = !item.completed;
      setDataLocalStorage(toDoData);
      render();
    });
    li.querySelector(".todo-remove").addEventListener("click", () => {
      toDoData.splice(index, 1);
      setDataLocalStorage(toDoData);
      render();
    });
  });
};

todoControl.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = headerInput.value;

  if (inputValue.trim() === "") {
    alert("Поле не может быть пустым!");
    headerInput.value = "";
  } else {
    const newToDo = {
      text: headerInput.value,
      completed: false,
    };
    toDoData.push(newToDo);
    setDataLocalStorage(toDoData);
    headerInput.value = "";
    render();
  }
});

const setDataLocalStorage = (arr) => {
  localStorage.setItem("toDoData", JSON.stringify(arr));
};

if (!localStorage.length) {
  localStorage.setItem("toDoData", JSON.stringify([]));
}

toDoData = JSON.parse(localStorage.getItem("toDoData"));

render();
