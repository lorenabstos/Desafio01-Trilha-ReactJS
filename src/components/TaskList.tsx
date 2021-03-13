import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) { return; } //tratamento new task vazia
    
    const newTask = { //estado temporário para nova tarefa
      id: Math.random(), //id aleatório
      title: newTaskTitle, //título da tarefa (input controlado)
      isComplete: false //estado inicial da tarefa (não completa)
    }

    setTasks(oldState => [...oldState, newTask]); //"antigas" tarefas + tarefas novas no mesmo array
    setNewTaskTitle(''); //reset do input
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const completeTask = tasks.map(task => task.id === id ? {
      ...task, 
      isComplete: !task.isComplete
    } : task)
    setTasks(completeTask);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const filteredTasks = tasks.filter(task => task.id !== id); //retorna tasks cujo os id's são diferentes do id passado   
    setTasks(filteredTasks); 
  }

  return (
    <section className="task-list container">
      <header>
        <div>
          <h2>📝 Tasks</h2>
          <small>track tasks with a to-do list</small>
        </div>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}