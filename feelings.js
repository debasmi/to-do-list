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

    // Emoji selection
    const emojis = document.querySelectorAll('.emoji');
    const selectedEmojiSection = document.getElementById('selected-emoji-section');
    const selectedEmoji = document.getElementById('selected-emoji');
    const feelingDescription = document.getElementById('feeling-description');
    const saveFeelingBtn = document.getElementById('save-feeling');
    const deleteFeelingBtn = document.getElementById('delete-feeling');
    const feelingsList = document.getElementById('feelings-list');

    emojis.forEach(emoji => {
        emoji.addEventListener('click', () => {
            selectedEmojiSection.classList.add('active');
            selectedEmoji.textContent = emoji.dataset.emoji;
        });
    });

    // Save feeling
    saveFeelingBtn.addEventListener('click', () => {
        const feelingText = feelingDescription.value.trim();
        if (feelingText === '') return;

        const listItem = document.createElement('li');
        listItem.classList.add('feeling-item');
        listItem.innerHTML = `
            <span>${selectedEmoji.textContent} ${feelingText}</span>
            <span class="feeling-datetime">${new Date().toLocaleString()}</span>
            <button class="delete-feeling-item"><i class="fa fa-trash"></i></button>
        `;

        feelingsList.appendChild(listItem);
        feelingDescription.value = '';
        selectedEmojiSection.classList.remove('active');

        // Add delete functionality for new item
        listItem.querySelector('.delete-feeling-item').addEventListener('click', () => {
            listItem.remove();
        });
    });

    // Delete all input and hide section
    deleteFeelingBtn.addEventListener('click', () => {
        feelingDescription.value = '';
        selectedEmojiSection.classList.remove('active');
    });
});
