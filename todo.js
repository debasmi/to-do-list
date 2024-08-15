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
    const taskTimeInput = document.getElementById('task-time');
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
        const taskTime = taskTimeInput.value.trim();
        const taskText = taskInput.value.trim();
        if (taskTime === '' || taskText === '') return;

        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        const taskTimeElement = document.createElement('span');
        const taskTextElement = document.createElement('span');
        taskTimeElement.classList.add('task-time');
        taskTextElement.classList.add('task-text');
        taskTimeElement.textContent =  taskTime;
        taskTextElement.textContent =  taskText;
        

        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');

        const saveBtn = document.createElement('button');
        saveBtn.innerHTML = '<i class="fas fa-check"></i>'; // Check icon
        saveBtn.addEventListener('click', () => {
            taskTextElement.style.textDecoration = 'line-through';
            taskTimeElement.style.textDecoration = 'line-thorugh';
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

        taskItem.appendChild(taskTimeElement);
        taskItem.appendChild(taskTextElement);
        taskItem.appendChild(taskActions);
        taskList.appendChild(taskItem);


        taskTimeInput.value = '';
        taskInput.value = '';
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const challengeText = document.getElementById('challenge-text');
    const newChallengeBtn = document.getElementById('new-challenge-btn');
    const userChallengeInput = document.getElementById('user-challenge-input');
    const addChallengeBtn = document.getElementById('add-challenge-btn');
    const userChallengesList = document.getElementById('user-challenges-list');
    const deleteChallengeBtn = document.getElementById('delete-challenge-btn');

    const challenges = [
        "Complete 10,000 steps today!",
        "Drink 8 glasses of water.",
        "Read a chapter of a book.",
        "Meditate for 15 minutes.",
        "Try a new recipe.",
        "Compliment someone.",
        "Do a random act of kindness.",
        "Stretch for 10 minutes.",
        "Unplug from social media for 1 hour.",
        "Write down 3 things you're grateful for."
    ];

    // Load a random challenge from the array or localStorage
    function loadChallenge() {
        const savedChallenge = localStorage.getItem('dailyChallenge');
        const challenge = savedChallenge ? savedChallenge : getRandomChallenge();
        challengeText.textContent = challenge;
        localStorage.setItem('dailyChallenge', challenge);
    }

    // Get a random challenge
    function getRandomChallenge() {
        return challenges[Math.floor(Math.random() * challenges.length)];
    }

    // Generate a new challenge when the button is clicked
    newChallengeBtn.addEventListener('click', () => {
        const newChallenge = getRandomChallenge();
        challengeText.textContent = newChallenge;
        localStorage.setItem('dailyChallenge', newChallenge);
    });

    // Add a user challenge
    addChallengeBtn.addEventListener('click', () => {
        const userChallenge = userChallengeInput.value.trim();
        if (userChallenge) {
            const listItem = document.createElement('li');
            listItem.textContent = userChallenge;
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
            deleteBtn.addEventListener('click', () => {
                listItem.style.transition = 'opacity 0.5s ease-out';
                listItem.style.opacity = '0';
                setTimeout(() => listItem.remove(), 500);
            });
            listItem.appendChild(deleteBtn);
            userChallengesList.appendChild(listItem);
            saveUserChallenge(userChallenge);
            userChallengeInput.value = '';
        }
    });

    // Save user challenge to localStorage
    function saveUserChallenge(challenge) {
        let userChallenges = JSON.parse(localStorage.getItem('userChallenges')) || [];
        userChallenges.push(challenge);
        localStorage.setItem('userChallenges', JSON.stringify(userChallenges));
    }

    // Load user challenges from localStorage
    function loadUserChallenges() {
        let userChallenges = JSON.parse(localStorage.getItem('userChallenges')) || [];
        userChallenges.forEach(challenge => {
            const listItem = document.createElement('li');
            listItem.textContent = challenge;
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
            deleteBtn.addEventListener('click', () => {
                listItem.style.transition = 'opacity 0.5s ease-out';
                listItem.style.opacity = '0';
                setTimeout(() => listItem.remove(), 500);
            });
            listItem.appendChild(deleteBtn);
            userChallengesList.appendChild(listItem);
        });
    }

    loadChallenge();
    loadUserChallenges();
});

