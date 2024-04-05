// Load tasks from local storage
document.addEventListener('DOMContentLoaded', function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task));
});

// Add task function
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = { text: taskText, completed: false };
        addTaskToList(task);
        saveTasksToLocalStorage();
        taskInput.value = '';
    }
}

// Add task to the list
function addTaskToList(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(this)">${task.text}</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(li);
}

// Toggle task completion
function toggleTask(span) {
    span.classList.toggle('completed');
    saveTasksToLocalStorage();
}

// Edit task
function editTask(button) {
    const newText = prompt('Enter new task text:');
    if (newText !== null && newText.trim() !== '') {
        button.parentNode.firstChild.textContent = newText.trim();
        saveTasksToLocalStorage();
    }
}

// Delete task
function deleteTask(button) {
    if (confirm('Are you sure you want to delete this task?')) {
        button.parentNode.remove();
        saveTasksToLocalStorage();
    }
}

// Save tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('span').classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
