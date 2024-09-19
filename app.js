document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    loadTasks();

    // Function to add a new task
    function addTask(taskText = taskInput.value, isCompleted = false) {
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        if (isCompleted) {
            taskItem.classList.add('completed');
        }

        // Mark task as complete when clicked
        taskItem.addEventListener('click', function() {
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        // Add a delete button to each task
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        // Clear input field
        taskInput.value = '';

        // Save tasks to localStorage
        saveTasks();
    }

    // Add task when clicking the "Add Task" button
    addTaskButton.addEventListener('click', () => addTask());

    // Add task when pressing Enter
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(taskItem => {
            tasks.push({
                text: taskItem.textContent.replace('Delete', '').trim(),
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTask(task.text, task.completed);
        });
    }
});