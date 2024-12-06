const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.className = task.completed ? 'completed' : '';
    taskItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}" class="toggle-task">
      <span>${task.text}</span>
      <button data-index="${index}" class="delete-task">Delete</button>
    `;
    taskList.appendChild(taskItem);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-task')) {
    const index = e.target.dataset.index;
    deleteTask(index);
  } else if (e.target.classList.contains('toggle-task')) {
    const index = e.target.dataset.index;
    toggleTask(index);
  }
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

renderTasks();
