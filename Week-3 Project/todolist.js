const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const tasksRemaining = document.getElementById('tasks-remaining');
const tasksCompleted = document.getElementById('tasks-completed');


let tasks = [];

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    if (task) {
        tasks.push({ text: task, completed: false, delete: false });
        taskInput.value = '';
        renderTasks();
    }
});

taskList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const taskIndex = tasks.findIndex((task) => task.text === e.target.textContent);
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        renderTasks();
    } else if (e.target.tagName === 'BUTTON') {
        const taskIndex = tasks.findIndex((task) => task.text === e.target.parentNode.textContent);
        tasks.splice(taskIndex, 1);
        renderTasks();
    }
});

clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter((task) => task.completed);
    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const taskElement = document.createElement('LI');
        taskElement.textContent = task.text;
        if (task.completed) {
            taskElement.classList.add('completed');
        }
        if (task.delete) {
            taskElement.classList.add('delete');
        }
        const deleteButton = document.createElement('BUTTON');
        deleteButton.textContent = 'Delete';
        taskElement.appendChild(deleteButton);
        taskList.appendChild(taskElement);
    });
    updateTaskCounts();
}

function updateTaskCounts() {
    const remainingTasks = tasks.filter((task) => !task.completed).length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    tasksRemaining.textContent = `Tasks remaining: ${remainingTasks}`;
    tasksCompleted.textContent = `Tasks completed: ${completedTasks}`;
}

renderTasks();