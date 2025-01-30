"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

const toDoData = [];

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
      // если комплит true
      todoCompleted.append(li); // добавляем в выполненные
    } else {
      // В противном случае
      todoList.append(li); // добавляем в не выполненные
    }

    li.querySelector(".todo-complete").addEventListener("click", () => {
      item.completed = !item.completed;
      render();
    });
    li.querySelector(".todo-remove").addEventListener("click", () => {
      toDoData.splice(index, 1);
      render();
    });
  });
};

todoControl.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = headerInput.value; // Название тудушки сохраняем в переменную

  if (inputValue.trim() === "") {
    // если поле пустое
    alert("Поле не может быть пустым!"); // выводим алерт
    headerInput.value = ""; // очищаем поле ввода что бы не сохранялись пробелы
  } else {
    // В противном случе
    const newToDo = {
      // Создаем переменную с новой задачей
      text: headerInput.value,
      completed: false,
    };
    toDoData.push(newToDo); // Пушим новую задачу в тудулист

    headerInput.value = ""; // Очищаем инпут
    render(); // Выводим на экран
  }
});

render();

// let arr = [1, 2, 3, 4];
// localStorage.setItem(1, JSON.stringify(arr));
// arr = JSON.parse(localStorage.getItem(1));
// console.log(arr);
