document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const darkModeCircle = document.getElementById('dark-mode-circle');
    const lightModeCircle = document.getElementById('light-mode-circle');
    const body = document.body;

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }

    // Toggle theme on circle click
    darkModeCircle.addEventListener('click', () => {
        body.classList.add('dark-mode');
        themeSwitch.checked = true;
        localStorage.setItem('theme', 'dark');
    });

    lightModeCircle.addEventListener('click', () => {
        body.classList.remove('dark-mode');
        themeSwitch.checked = false;
        localStorage.setItem('theme', 'light');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    addTaskBtn.addEventListener('click', () => {
        addTask();
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() 
    {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        const taskTextElement = document.createElement('span');
        taskTextElement.classList.add('task-text');
        taskTextElement.textContent =  taskText;
        

        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');

        const saveBtn = document.createElement('button');
        saveBtn.innerHTML = '<i class="fas fa-check"></i>'; // Check icon
        saveBtn.addEventListener('click', () => {
            taskTextElement.style.textDecoration = 'line-through';
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'; // Trash icon
        deleteBtn.addEventListener('click', () => {
            // Add 'removing' class to trigger the drop-off animation
            taskItem.classList.add('removing');

            // Wait for the animation to finish before removing the task from the DOM
            setTimeout(() => {
                taskList.removeChild(taskItem);
            }, 500); // 500ms matches the duration of the animation
        });

        taskActions.appendChild(saveBtn);
        taskActions.appendChild(deleteBtn);

        taskItem.appendChild(taskTextElement);
        taskItem.appendChild(taskActions);
        taskList.appendChild(taskItem);


        taskInput.value = '';
    }
});
