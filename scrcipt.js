// Seleção de elementos
const taskText = document.getElementById('taskText');
const taskPriority = document.getElementById('taskPriority');
const taskDate = document.getElementById('taskDate');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterStatus = document.getElementById('filterStatus');
const filterPriority = document.getElementById('filterPriority');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Função para renderizar as tarefas
function renderTasks() {
    taskList.innerHTML = '';
    
    const filteredTasks = tasks.filter(task => {
        const statusMatch = filterStatus.value === 'all' || 
            (filterStatus.value === 'completed' ? task.completed : !task.completed);
        const priorityMatch = filterPriority.value === 'all' || task.priority === filterPriority.value;
        return statusMatch && priorityMatch;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <div>
                <strong>${task.text}</strong> - 
                <span class="priority-${task.priority}">${task.priority}</span> 
                <br><small>Vence em: ${task.date || 'Sem data'}</small>
            </div>
            <div class="actions">
                <button onclick="toggleTask(${index})">${task.completed ? 'Desfazer' : 'Concluir'}</button>
                <button class="edit-btn" onclick="editTask(${index})">Editar</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Excluir</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Adicionar tarefa
addTaskBtn.addEventListener('click', () => {
    if (taskText.value.trim() === '') return alert("Digite uma tarefa!");
    
    tasks.push({
        text: taskText.value,
        priority: taskPriority.value,
        date: taskDate.value,
        completed: false
    });
    
    saveAndRender();
    taskText.value = '';
});

// Salvar no localStorage
function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Funções de ação
window.toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
};

window.deleteTask = (index) => {
    tasks.splice(index, 1);
    saveAndRender();
};

window.editTask = (index) => {
    const newText = prompt("Editar tarefa:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText;
        saveAndRender();
    }
};

// Eventos de filtro
filterStatus.addEventListener('change', renderTasks);
filterPriority.addEventListener('change', renderTasks);

// Inicialização
renderTasks();