document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const editModal = document.getElementById('edit-modal');
    const editInput = document.getElementById('edit-input');
    const saveEditBtn = document.getElementById('save-edit');
    const closeModalBtn = document.querySelector('.close');
    let currentEditTask = null;

    // Charger les tâches depuis le localStorage
    loadTasks();

    // Ajouter une nouvelle tâche
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    // Ajouter une tâche à la liste
    function addTask(task) {
        if (task === '') return;

        const li = document.createElement('li');
        li.appendChild(document.createTextNode(task));

        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'button-group';

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Compléter';
        completeBtn.className = 'complete-btn';
        buttonGroup.appendChild(completeBtn);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Éditer';
        editBtn.className = 'edit-btn';
        buttonGroup.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.className = 'delete-btn';
        buttonGroup.appendChild(deleteBtn);

        li.appendChild(buttonGroup);
        taskList.appendChild(li);

        saveTasks();
    }

    // Gestion des actions sur les tâches
    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            // Supprimer la tâche
            e.target.parentElement.parentElement.remove();
            saveTasks();
        } else if (e.target.classList.contains('complete-btn')) {
            // Marquer comme complété/non complété
            const li = e.target.parentElement.parentElement;
            li.classList.toggle('completed');
            saveTasks();
        } else if (e.target.classList.contains('edit-btn')) {
            // Éditer la tâche
            currentEditTask = e.target.parentElement.parentElement;
            editInput.value = currentEditTask.firstChild.textContent;
            editModal.style.display = 'block'; // Afficher la modal
        }
    });

    // Sauvegarder les tâches dans le localStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push({
                text: task.firstChild.textContent.trim(),
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Charger les tâches depuis le localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(task.text));

                const buttonGroup = document.createElement('div');
                buttonGroup.className = 'button-group';

                const completeBtn = document.createElement('button');
                completeBtn.textContent = 'Compléter';
                completeBtn.className = 'complete-btn';
                buttonGroup.appendChild(completeBtn);

                const editBtn = document.createElement('button');
                editBtn.textContent = 'Éditer';
                editBtn.className = 'edit-btn';
                buttonGroup.appendChild(editBtn);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Supprimer';
                deleteBtn.className = 'delete-btn';
                buttonGroup.appendChild(deleteBtn);

                li.appendChild(buttonGroup);

                if (task.completed) {
                    li.classList.add('completed');
                }

                taskList.appendChild(li);
            });
        }
    }

    // Enregistrer les modifications et fermer la modal
    saveEditBtn.addEventListener('click', function () {
        if (currentEditTask && editInput.value.trim() !== '') {
            currentEditTask.firstChild.textContent = editInput.value.trim();
            saveTasks();
            editModal.style.display = 'none'; // Masquer la modal
        }
    });

    // Fermer la modal lorsqu'on clique sur la croix
    closeModalBtn.addEventListener('click', function () {
        editModal.style.display = 'none'; // Masquer la modal
    });

    // Fermer la modal lorsqu'on clique en dehors de celle-ci
    window.addEventListener('click', function (event) {
        if (event.target === editModal) {
            editModal.style.display = 'none'; // Masquer la modal
        }
    });
});
