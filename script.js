document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const languageSelect = document.getElementById('languageSelect');
    const title = document.getElementById('title');

    const translations = {
        en: {
            title: 'To-Do List',
            addTaskPlaceholder: 'Add a new task...',
            addTaskButton: 'Add Task',
            priorities: {
                low: 'Low',
                medium: 'Medium',
                high: 'High',
                critical: 'Critical'
            }
        },
        ru: {
            title: 'Список задач',
            addTaskPlaceholder: 'Добавить новую задачу...',
            addTaskButton: 'Добавить задачу',
            priorities: {
                low: 'Низкий',
                medium: 'Средний',
                high: 'Высокий',
                critical: 'Критический'
            }
        }
    };

    function setLanguage(language) {
        title.textContent = translations[language].title;
        taskInput.placeholder = translations[language].addTaskPlaceholder;
        addTaskBtn.textContent = translations[language].addTaskButton;
        prioritySelect.options[0].text = translations[language].priorities.low;
        prioritySelect.options[1].text = translations[language].priorities.medium;
        prioritySelect.options[2].text = translations[language].priorities.high;
        prioritySelect.options[3].text = translations[language].priorities.critical;
    }

    languageSelect.addEventListener('change', function() {
        setLanguage(languageSelect.value);
    });

    // Load tasks from local storage
    loadTasks();

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value;

        if (taskText !== '') {
            const newTask = document.createElement('li');
            newTask.textContent = taskText;
            newTask.classList.add(priority);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', function() {
                taskList.removeChild(newTask);
                saveTasks();
            });

            newTask.appendChild(deleteBtn);
            taskList.appendChild(newTask);

            taskInput.value = '';
            saveTasks();
        }
    });

    taskList.addEventListener('click', function(e) {
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed');
            saveTasks();
        }
    });

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push({
                text: task.textContent.replace('Delete', '').trim(),
                priority: task.classList[0],
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const newTask = document.createElement('li');
            newTask.textContent = task.text;
            newTask.classList.add(task.priority);

            if (task.completed) {
                newTask.classList.add('completed');
            }

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', function() {
                taskList.removeChild(newTask);
                saveTasks();
            });

            newTask.appendChild(deleteBtn);
            taskList.appendChild(newTask);
        });
    }

    // Set initial language
    setLanguage(languageSelect.value);
});
