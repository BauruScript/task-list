// Define UI vars
const form = document.querySelector('#task-form');
/*B1.1*/const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks)
  //Add task event
  form.addEventListener('submit', addTask);
  //Remove task event
  /*B1.2*/ taskList.addEventListener('click', removeTask)
  //Clear tasks event
  clearBtn.addEventListener('click', clearTasks)
  //Filter tasks events
  filter.addEventListener('keyup', filterTasks)
}

//Get tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){
  //Create li element
  const li = document.createElement('li');
  //Add a class
  li.className = 'collection-item';
  //Create text node and append to li
  li.appendChild(document.createTextNode(task));
  //Create new link element
  const link = document.createElement('a');
  //Add class
  link.className = 'delete-item secondary-content';
  //Add icon HTML
  link.innerHTML = '<i class ="fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);
  //Append li to ul
    taskList.appendChild(li)
  })
}

//Add task
function addTask(e){
  if(taskInput.value === '') {
    alert('Add a task')
  }

  //Create li element
  const li = document.createElement('li');
  //Add a class
  /*A2*/ li.className = 'collection-item';
  //Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create new link element
  const link = document.createElement('a');
  //Add class
  /*A3*/link.className = 'delete-item secondary-content';
  //Add icon HTML
  link.innerHTML = '<i class ="fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li)

  //Store in LS
  storeTaskInLocalStorage(taskInput.value)

  //Clear input
  taskInput.value = ''

  /*A1*/ e.preventDefault() 
}

//Store task
function storeTaskInLocalStorage(task) {
 /*C2.1*/ let tasks;
  if(localStorage.getItem('tasks') === null){
/*C2.2*/tasks = [];
  } else{
     tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task)
 /*C2.3*/ localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Remove task
/*B1.3*/function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove(); 

      //Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}  

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Clear tasks
function clearTasks() {
  //taskList.innerHTML = ''; //maneira 1 de se fazer isso

  //Faster
  while(taskList.firstChild) { //maneira 2 de se fazer
    taskList.removeChild(taskList.firstChild);
  }

  //Clear from LS
  clearTasksFromLocalStorage();
}

  //Clear from LS
  function clearTasksFromLocalStorage(){;
    localStorage.clear()
}

//Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  /*C1*/document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}